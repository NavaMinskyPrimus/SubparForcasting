// ============================================================
// RESULTS PAGE CONFIGURATION
// ============================================================
// Configure which modules appear for each year's results page.
//
// Available modules:
//   'leaderboard'  - Rankings table showing player scores
//   'confidence'   - Confidence calibration rankings
//   'questions'    - Question-by-question results breakdown
//
// To add a new year: add an entry to YEAR_MODULES below.
// To add a new module: create a component in components/results-modules/
//   and register it in components/results-modules/index.ts
// ============================================================

export type ResultsModuleName = 'leaderboard' | 'confidence' | 'questions';

export const YEAR_MODULES: Record<string, ResultsModuleName[]> = {
  '2025': ['leaderboard', 'confidence', 'questions'],
  '2024': ['leaderboard', 'confidence'],
  '2023': ['leaderboard'],
  '2022': ['leaderboard'],
  '2021': ['leaderboard'],
};

// Derived automatically — no need to edit this
export const PAST_YEARS = Object.keys(YEAR_MODULES).sort((a, b) => Number(b) - Number(a));
