// Module registry — maps module names to their React components.
// When you add a new module, import it here and add it to MODULE_REGISTRY.

import type { ComponentType } from 'react';
import type { ResultsModuleName } from '@/lib/results-config';

import { LeaderboardModule } from './leaderboard';
import { ConfidenceModule } from './confidence';
import { QuestionsModule } from './questions';

export interface ResultsModuleProps {
  year: string;
  confidenceData?: { 'user name': string; confidence: number | null }[];
}

export const MODULE_REGISTRY: Record<ResultsModuleName, ComponentType<ResultsModuleProps>> = {
  leaderboard: LeaderboardModule,
  confidence: ConfidenceModule,
  questions: QuestionsModule,
};
