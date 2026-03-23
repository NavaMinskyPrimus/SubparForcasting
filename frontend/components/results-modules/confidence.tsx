"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { ResultsModuleProps } from './index';

export function ConfidenceModule({ year, confidenceData }: ResultsModuleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{year} Confidence Rankings</CardTitle>
        <CardDescription className="space-y-3 text-slate-600">
          <p>The measures here are using a mechanism proposed by Matt Russell in 2025.</p>
          <p>The idea is simple: we try scaling your confidence up and down until we find the scaling factor that maximizes your score. If your score goes up as we make your guesses more confident, you&apos;re underconfident. If your score goes up when we make your guesses less confident, you&apos;re overconfident.</p>
          <p>Numbers above 1 are overconfident, numbers below 1 are underconfident, and negative numbers mean that flipping the directionality of your guesses entirely would have improved your score.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!confidenceData ? (
          <p className="text-sm text-slate-500">No confidence data available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {confidenceData.map((entry, i) => (
                <TableRow key={i}>
                  <TableCell>{entry['user name']}</TableCell>
                  <TableCell className="font-medium">
                    {entry.confidence !== null ? entry.confidence.toFixed(2) : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
