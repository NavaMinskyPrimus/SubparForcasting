"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from '@/components/header';
import { YEAR_MODULES } from '@/lib/results-config';
import { MODULE_REGISTRY } from '@/components/results-modules';
import type { ResultsModuleName } from '@/lib/results-config';
import { FIRST_GAME } from '@/lib/constants';

const MODULE_LABELS: Record<ResultsModuleName, string> = {
  leaderboard: 'Rankings',
  confidence: 'Confidence Rankings',
  questions: 'Questions',
};

export function ResultsPage({ releasedYear, isAdmin }: { releasedYear: number , isAdmin: boolean}) {
  const years = Array.from(
    { length: releasedYear - FIRST_GAME + 1 },
    (_, i) => String(releasedYear - i)
  );

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const modules = YEAR_MODULES[selectedYear] ?? ['leaderboard'];

  const toggleCollapsed = (key: string) =>
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header isAdmin={isAdmin} playing={false} />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Past Results & Analysis
            </h1>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-lg font-semibold">Year Selection</div>
                <div className="flex gap-2">
                  {years.map(year => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? 'default' : 'outline'}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            {modules.map(moduleName => {
              const key = `${selectedYear}-${moduleName}`;
              const isCollapsed = !!collapsed[key];
              const Module = MODULE_REGISTRY[moduleName];
              return (
                <div key={moduleName}>
                  {isCollapsed ? (
                    <Card>
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-700">{selectedYear} {MODULE_LABELS[moduleName]}</span>
                          <Button variant="ghost" size="sm" onClick={() => toggleCollapsed(key)}>
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ) : (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCollapsed(key)}
                        className="absolute top-3 right-3 z-10 text-slate-400 hover:text-slate-600"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Module year={selectedYear} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
