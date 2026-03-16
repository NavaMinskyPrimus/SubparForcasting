"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CONFIDENCE_DATA: Record<string, { name: string; confidenceScore: number }[]> = {
  '2025': [
    { name: 'Alice Johnson', confidenceScore: 1.02 },
    { name: 'Bob Smith', confidenceScore: 0.85 },
    { name: 'Carol Davis', confidenceScore: 0.98 },
    { name: 'David Wilson', confidenceScore: 1.15 },
    { name: 'Eve Martinez', confidenceScore: 0.72 },
    { name: 'Frank Brown', confidenceScore: 1.01 },
    { name: 'Grace Lee', confidenceScore: 1.28 },
    { name: 'Henry Taylor', confidenceScore: 0.99 },
    { name: 'Ivy Chen', confidenceScore: 0.88 },
    { name: 'Jack Robinson', confidenceScore: 0.68 },
    { name: 'ChatGPT', confidenceScore: 1.00 },
    { name: 'Averagey McAverageface', confidenceScore: 1.00 },
  ],
  '2024': [
    { name: 'Bob Smith', confidenceScore: 0.97 },
    { name: 'Alice Johnson', confidenceScore: 0.89 },
    { name: 'Carol Davis', confidenceScore: 1.03 },
    { name: 'Eve Martinez', confidenceScore: 0.99 },
    { name: 'Grace Lee', confidenceScore: 1.12 },
    { name: 'Henry Taylor', confidenceScore: 1.01 },
    { name: 'David Wilson', confidenceScore: 0.75 },
    { name: 'Ivy Chen', confidenceScore: 0.98 },
    { name: 'Frank Brown', confidenceScore: 0.86 },
    { name: 'Averagey McAverageface', confidenceScore: 1.00 },
  ],
};

const FALLBACK_CONFIDENCE_DATA = [
  { name: 'Carol Davis', confidenceScore: 1.04 },
  { name: 'Alice Johnson', confidenceScore: 0.96 },
  { name: 'Bob Smith', confidenceScore: 0.84 },
  { name: 'Henry Taylor', confidenceScore: 1.02 },
  { name: 'Eve Martinez', confidenceScore: 1.11 },
  { name: 'David Wilson', confidenceScore: 0.99 },
  { name: 'Frank Brown', confidenceScore: 0.71 },
  { name: 'Grace Lee', confidenceScore: 1.01 },
  { name: 'Ivy Chen', confidenceScore: 0.87 },
  { name: 'Jack Robinson', confidenceScore: 1.22 },
];

interface ConfidenceModuleProps {
  year: string;
}

export function ConfidenceModule({ year }: ConfidenceModuleProps) {
  const data = CONFIDENCE_DATA[year] ?? FALLBACK_CONFIDENCE_DATA;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{year} Confidence Rankings</CardTitle>
        <CardDescription className="space-y-3 text-slate-600">
          <p>The measures here are using a mechanism proposed by Matt Russell last year.</p>
          <p>The idea is simple: we try scaling your confidence up and down until we find the scaling factor that maximizes your score. If your score goes up as we make your guesses more confident, you&apos;re underconfident. If your score goes up when we make your guesses less confident, you&apos;re overconfident.</p>
          <p>Numbers above 1 are overconfident and numbers below 1 are underconfident.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry) => (
              <TableRow key={entry.name}>
                <TableCell>{entry.name}</TableCell>
                <TableCell className="font-medium">{entry.confidenceScore.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
