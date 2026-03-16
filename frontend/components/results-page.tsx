"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/header';
import { YEAR_MODULES } from '@/lib/results-config';
import { MODULE_REGISTRY } from '@/components/results-modules';
import { FIRST_GAME } from '@/lib/constants';

export function ResultsPage({ releasedYear }: { releasedYear: number }) {
  const years = Array.from(
    { length: releasedYear - FIRST_GAME + 1 },
    (_, i) => String(releasedYear - i)
  );

  const [selectedYear, setSelectedYear] = useState(years[0]);

  const modules = YEAR_MODULES[selectedYear] ?? ['leaderboard'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header isAdmin={true} />
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
              const Module = MODULE_REGISTRY[moduleName];
              return <Module key={moduleName} year={selectedYear} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
