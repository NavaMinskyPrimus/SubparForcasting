"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDisplayInformation } from '@/lib/questionsActions';
import type { ResultsModuleProps } from './index';

interface Answer {
  userid: number;
  name: string;
  probability: number;
}

interface QuestionRow {
  questionid: number;
  text: string;
  result: boolean | null;
  isvalid: boolean;
  answers: Answer[];
}

type DotColor = 'me' | 'selected' | 'default';

function dotStyle(color: DotColor): React.CSSProperties {
  if (color === 'me') return { backgroundColor: '#16a34a', border: '2px solid #15803d', width: 12, height: 12, zIndex: 2 };
  if (color === 'selected') return { backgroundColor: '#dc2626', border: '2px solid #b91c1c', width: 12, height: 12, zIndex: 2 };
  return { backgroundColor: '#94a3b8', width: 8, height: 8, zIndex: 1 };
}

function AnswerDot({ answer, color }: { answer: Answer; color: DotColor }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full cursor-default"
      style={{ left: `${answer.probability}%`, ...dotStyle(color) }}
      title={`${answer.name}: ${answer.probability}%`}
    />
  );
}

function ScatterPlot({ answers, myUserid, selectedUserid }: { answers: Answer[]; myUserid: number | null; selectedUserid: number | null }) {
  if (answers.length === 0) return <p className="text-xs text-slate-400">No answers</p>;

  const avg = answers.reduce((s, a) => s + a.probability, 0) / answers.length;

  const getColor = (a: Answer): DotColor => {
    if (a.userid === myUserid) return 'me';
    if (a.userid === selectedUserid) return 'selected';
    return 'default';
  };

  // render highlighted dots on top
  const sorted = [...answers].sort((a, b) => {
    const priority = (a: Answer) => (a.userid === myUserid || a.userid === selectedUserid ? 1 : 0);
    return priority(a) - priority(b);
  });

  return (
    <div className="relative w-full" style={{ height: 28 }}>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-slate-200 rounded" />
      <span className="absolute left-0 top-full text-xs text-slate-400 translate-y-0.5">0</span>
      <span className="absolute right-0 top-full text-xs text-slate-400 translate-y-0.5">100</span>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-black"
        style={{ left: `${avg}%` }}
        title={`Avg: ${avg.toFixed(1)}%`}
      />
      {sorted.map((a) => (
        <AnswerDot key={a.userid} answer={a} color={getColor(a)} />
      ))}
    </div>
  );
}

export function QuestionsModule({ year }: ResultsModuleProps) {
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [players, setPlayers] = useState<Record<number, string>>({});
  const [myUserid, setMyUserid] = useState<number | null>(null);
  const [selectedUserid, setSelectedUserid] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedUserid(null);
    getDisplayInformation(Number(year)).then((res) => {
      if (!res.ok) {
        setError(res.error ?? 'Failed to load questions');
      } else {
        setQuestions(res.data.questions_with_answers.filter((q: QuestionRow) => q.isvalid));
        setMyUserid(res.data.me.userid);
        setPlayers(res.data.players);
      }
      setLoading(false);
    });
  }, [year]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{year} Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Highlight player:</label>
              <select
                className="text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedUserid ?? ''}
                onChange={(e) => setSelectedUserid(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">— none —</option>
                {Object.entries(players)
                  .sort(([, a], [, b]) => a.localeCompare(b))
                  .map(([uid, name]) => (
                    <option key={uid} value={uid}>{name}</option>
                  ))}
              </select>
            </div>

            {questions.map((q) => (
              <div key={q.questionid} className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-slate-800">{q.text}</p>
                  {q.result !== null && (
                    <Badge variant={q.result ? 'default' : 'secondary'} className="shrink-0">
                      {q.result ? 'True' : 'False'}
                    </Badge>
                  )}
                </div>
                <div className="pb-4">
                  <ScatterPlot answers={q.answers} myUserid={myUserid} selectedUserid={selectedUserid} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
