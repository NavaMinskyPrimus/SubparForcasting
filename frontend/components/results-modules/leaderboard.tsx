"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award } from 'lucide-react';
import { getResults } from '@/lib/resultsActions';

const DESCRIPTIONS: Record<string, React.ReactNode> = {
  '2025': (
    <>
      <p>The list below has all the people who participated, plus two non-human participants:</p>
      <p><strong>Averagey McAverageface:</strong> Averagey is the wisdom-of-the-crowds player. His predictions are the average of everyone else&apos;s.</p>
      <p><strong>ChatGPT:</strong> We heard this AI thing is supposed to be big, so we asked ChatGPT to make predictions this year.</p>
      <p className="pt-1">Without further ado, to the rankings!</p>
    </>
  ),
  '2024': (
    <>
      <p>The list below has all the people who participated, plus one non-human participant:</p>
      <p><strong>Averagey McAverageface:</strong> Averagey is the wisdom-of-the-crowds player. His predictions are the average of everyone else&apos;s.</p>
      <p className="pt-1">Without further ado, to the rankings!</p>
    </>
  ),
};

function RankCell({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">🥇</span>;
  if (rank === 2) return <span className="text-xl">🥈</span>;
  if (rank === 3) return <span className="text-xl">🥉</span>;
  return <>{rank}</>;
}

interface LeaderboardModuleProps {
  year: string;
}

export function LeaderboardModule({ year }: LeaderboardModuleProps) {
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getResults(Number(year)).then(res => {
      if (!res.ok) {
        setError(res.error ?? 'Failed to load results');
      } else {
        setRankings(res.data);
      }
      setLoading(false);
    });
  }, [year]);

  const description = DESCRIPTIONS[year];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          {year} Rankings
        </CardTitle>
        {description && (
          <CardDescription className="space-y-2 text-slate-600">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <RankCell rank={i + 1} />
                  </TableCell>
                  <TableCell>{entry['user name']}</TableCell>
                  <TableCell className="font-medium">{entry.score == null ? '-∞' : entry.score.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
