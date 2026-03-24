import type { Request, Response } from 'express';
import { getUserBySub, getUsers } from '../../../database/user-queries';
import { getQuestionsByYear } from '../../../database/question-queries';
import type { Question } from '../../../database/question-queries';
import { getAnswersByUID } from '../../../database/answer-queries';
import type { Answer } from '../../../database/answer-queries';
import { upsertResult, getResultsByYear } from '../../../database/results-queries';
import { getSettings, setReleasedYear } from '../../../database/settings-queries';

function dbProbToFloat(prob: number): number {
  return prob / 100;
}

function scoreOfNormalizedProb(p: number): number {
  return Math.log(p) - Math.log(0.5);
}

function pspaceToCspace(p: number): number {
  const half = (x: number) => (1 - 2 * x) / (x - 1);
  if (p === 0) return -Infinity;
  if (p === 1) return Infinity;
  if (p >= 0.5) return half(p);
  return -1 * half(1 - p);
}

function cspaceToPspace(n: number): number {
  const half = (x: number) => (1 + x) / (2 + x);
  if (!isFinite(n)) return n < 0 ? 0 : 1;
  if (n >= 0) return half(n);
  return 1 - half(-n);
}

function confAdjustedScore(
  answers: Array<{ p: number; outcome: boolean }>,
  confMult: number,
  totalQuestions: number
): number {
  const sum = answers.reduce((acc, { p, outcome }) => {
    const normalizedProb = outcome ? p : 1 - p;
    const adjustedP = cspaceToPspace(confMult * pspaceToCspace(normalizedProb));
    return acc + scoreOfNormalizedProb(adjustedP);
  }, 0);
  // Unanswered questions count as 50/50 (score = 0), so divide by total questions
  return sum / totalQuestions;
}

function bestScale(
  answers: Array<{ p: number; outcome: boolean }>,
  totalQuestions: number,
  min = -10,
  max = 10,
  granularity = 0.01
): number {
  const numSteps = Math.floor((max - min) / granularity);
  let bestMult = NaN;
  let bestScore = -Infinity;
  for (let i = 0; i < numSteps; i++) {
    const confMult = i * granularity + min;
    const score = confAdjustedScore(answers, confMult, totalQuestions);
    if (score > bestScore) {
      bestScore = score;
      bestMult = confMult;
    }
  }
  return bestMult;
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

// POST /api/results/compute   body: { year: number }   admin only
// Iterates over every user, scores their answers against resolved questions
// for the given year, and saves the results to the results table.
export async function handleComputeResults(req: Request, res: Response) {
  try {
    if (!req.auth?.sub) {
      return res.status(401).json({ err: 'Authentication required' });
    }
    const currentUser = await getUserBySub(req.auth.sub);
    if (!currentUser) {
      return res.status(404).json({ err: 'Current user not found' });
    }
    if (currentUser.permission !== 'admin') {
      return res.status(403).json({ err: 'Admin only' });
    }

    const year = req.body?.year;
    if (year == null || typeof year !== 'number' || !Number.isInteger(year) || year <= 0) {
      return res.status(400).json({ err: 'year must be a positive integer' });
    }

    const allQuestions = (await getQuestionsByYear(year)) as Question[];

    // Every active (valid) question must be resolved before scoring
    const hasUnresolved = allQuestions.some(
      (q) => q.isvalid === true && q.result === null
    );
    if (hasUnresolved) {
      return res.status(400).json({ err: 'All questions must be resolved or invalidated before computing results' });
    }

    // Score only valid + resolved questions (skip invalidated)
    const resolvedQuestions = allQuestions.filter(
      (q) => q.isvalid === true && q.result !== null
    );
    if (resolvedQuestions.length === 0) {
      return res.status(400).json({ err: 'No resolved valid questions for this year' });
    }
    const resolvedQMap = new Map(resolvedQuestions.map((q) => [q.questionid, q]));

    const users = await getUsers();
    const savedResults = [];

    for (const user of users) {
      const userAnswers = (await getAnswersByUID(user.userid)) as Answer[];

      // Pair each answer with the question outcome (skip unanswered/unresolved)
      const scoreable = userAnswers
        .filter((a) => resolvedQMap.has(a.questionid))
        .map((a) => ({
          p: dbProbToFloat(a.probability),
          outcome: resolvedQMap.get(a.questionid)!.result as boolean,
        }));

      if (scoreable.length === 0) continue;

      const totalQuestions = resolvedQuestions.length;
      const rawScore = confAdjustedScore(scoreable, 1, totalQuestions);
      const confidence = bestScale(scoreable, totalQuestions);

      const saved = await upsertResult(user.userid, user.name, year, confidence, rawScore);
      savedResults.push(saved);
    }

    const settings = await getSettings();
    if (year > settings.released_year) {
      await setReleasedYear(year);
    }

    res.status(200).json(savedResults);
  } catch (err) {
    console.error('handleComputeResults failed:', err);
    res.status(500).json({ err: 'Failed to compute results' });
  }
}

// GET /api/results?year=2025   authenticated
export async function handleGetResults(req: Request, res: Response) {
  try {
    if (!req.auth?.sub) {
      console.error("handleGetResults: Authentication required")
      return res.status(401).json({ err: 'Authentication required' });
    }

    const rawYear = req.query.year;
    if (rawYear === undefined) {
      console.error("handleGetResults: year query param is required")
      return res.status(400).json({ err: 'year query param is required' });
    }
    const year = Number(rawYear);
    if (!Number.isInteger(year) || year <= 0) {
      console.error("handleGetResults: year must be a positive integer")
      return res.status(400).json({ err: 'year must be a positive integer' });
    }
    const results = await getResultsByYear(year);
    res.status(200).json(results);
  } catch (err) {
    console.error('handleGetResults failed:', err);
    res.status(500).json({ err: 'Failed to get results' });
  }
}
