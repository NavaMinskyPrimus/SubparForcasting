"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const QUESTIONS_DATA: Record<string, { question: string; yourPrediction: number; avgPrediction: number; actual: string }[]> = {
  '2025': [
    { question: 'Will there be a major AI breakthrough?', yourPrediction: 75, avgPrediction: 68, actual: 'Yes' },
    { question: 'Will global temperature increase?', yourPrediction: 85, avgPrediction: 82, actual: 'Yes' },
    { question: 'Will stock market be higher?', yourPrediction: 45, avgPrediction: 55, actual: 'No' },
    { question: 'Will Mars mission succeed?', yourPrediction: 10, avgPrediction: 15, actual: 'No' },
    { question: 'Will EVs reach 20% market share?', yourPrediction: 60, avgPrediction: 48, actual: 'Yes' },
  ],
};

interface QuestionsModuleProps {
  year: string;
}

export function QuestionsModule({ year }: QuestionsModuleProps) {
  const data = QUESTIONS_DATA[year] ?? [];

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-slate-500 text-center">
          No question data available for {year}.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Your Prediction</TableHead>
              <TableHead>Average</TableHead>
              <TableHead>Actual</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((result, index) => (
              <TableRow key={index}>
                <TableCell className="max-w-md">{result.question}</TableCell>
                <TableCell>{result.yourPrediction}%</TableCell>
                <TableCell>{result.avgPrediction}%</TableCell>
                <TableCell>
                  <Badge variant={result.actual === 'Yes' ? 'default' : 'secondary'}>
                    {result.actual}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
