"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';

// Mock data for past years
const PAST_YEARS = ['2025', '2024', '2023', '2022', '2021'];

const MOCK_RANKINGS_2025 = [
  { rank: 1, name: 'Alice Johnson', score: 92.5, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 1.02 },
  { rank: 2, name: 'Bob Smith', score: 89.3, confidence: 'Slightly overconfident', trend: 'up', confidenceScore: 0.85 },
  { rank: 3, name: 'Carol Davis', score: 87.1, confidence: 'Well-calibrated', trend: 'down', confidenceScore: 0.98 },
  { rank: 4, name: 'David Wilson', score: 85.8, confidence: 'Slightly underconfident', trend: 'same', confidenceScore: 1.15 },
  { rank: 5, name: 'Eve Martinez', score: 84.2, confidence: 'Overconfident', trend: 'up', confidenceScore: 0.72 },
  { rank: 6, name: 'Frank Brown', score: 82.9, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 1.01 },
  { rank: 7, name: 'Grace Lee', score: 81.5, confidence: 'Underconfident', trend: 'down', confidenceScore: 1.28 },
  { rank: 8, name: 'Henry Taylor', score: 80.3, confidence: 'Well-calibrated', trend: 'same', confidenceScore: 0.99 },
  { rank: 9, name: 'Ivy Chen', score: 79.1, confidence: 'Slightly overconfident', trend: 'up', confidenceScore: 0.88 },
  { rank: 10, name: 'Jack Robinson', score: 77.8, confidence: 'Overconfident', trend: 'down', confidenceScore: 0.68 },
  { rank: 11, name: 'ChatGPT', score: 76.2, confidence: 'Well-calibrated', trend: 'same', confidenceScore: 1.00 },
  { rank: 12, name: 'Averagey McAverageface', score: 74.5, confidence: 'Well-calibrated', trend: 'same', confidenceScore: 1.00 },
];

const MOCK_RANKINGS_2024 = [
  { rank: 1, name: 'Bob Smith', score: 88.1, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 0.97 },
  { rank: 2, name: 'Alice Johnson', score: 86.7, confidence: 'Slightly overconfident', trend: 'same', confidenceScore: 0.89 },
  { rank: 3, name: 'Carol Davis', score: 85.2, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 1.03 },
  { rank: 4, name: 'Eve Martinez', score: 82.9, confidence: 'Well-calibrated', trend: 'down', confidenceScore: 0.99 },
  { rank: 5, name: 'Grace Lee', score: 81.3, confidence: 'Slightly underconfident', trend: 'up', confidenceScore: 1.12 },
  { rank: 6, name: 'Henry Taylor', score: 79.8, confidence: 'Well-calibrated', trend: 'same', confidenceScore: 1.01 },
  { rank: 7, name: 'David Wilson', score: 78.5, confidence: 'Overconfident', trend: 'down', confidenceScore: 0.75 },
  { rank: 8, name: 'Ivy Chen', score: 77.2, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 0.98 },
  { rank: 9, name: 'Frank Brown', score: 75.9, confidence: 'Slightly overconfident', trend: 'same', confidenceScore: 0.86 },
  { rank: 10, name: 'Averagey McAverageface', score: 73.4, confidence: 'Well-calibrated', trend: 'same', confidenceScore: 1.00 },
];

const MOCK_RANKINGS_OTHER = [
  { rank: 1, name: 'Carol Davis', score: 91.2, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 1.04 },
  { rank: 2, name: 'Alice Johnson', score: 88.5, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 0.96 },
  { rank: 3, name: 'Bob Smith', score: 86.9, confidence: 'Slightly overconfident', trend: 'same', confidenceScore: 0.84 },
  { rank: 4, name: 'Henry Taylor', score: 84.3, confidence: 'Well-calibrated', trend: 'down', confidenceScore: 1.02 },
  { rank: 5, name: 'Eve Martinez', score: 82.7, confidence: 'Slightly underconfident', trend: 'up', confidenceScore: 1.11 },
  { rank: 6, name: 'David Wilson', score: 81.1, confidence: 'Well-calibrated', trend: 'up', confidenceScore: 0.99 },
  { rank: 7, name: 'Frank Brown', score: 79.4, confidence: 'Overconfident', trend: 'down', confidenceScore: 0.71 },
  { rank: 8, name: 'Grace Lee', score: 78.2, confidence: 'Well-calibrated', trend: 'same', confidenceScore: 1.01 },
  { rank: 9, name: 'Ivy Chen', score: 76.8, confidence: 'Slightly overconfident', trend: 'up', confidenceScore: 0.87 },
  { rank: 10, name: 'Jack Robinson', score: 75.1, confidence: 'Underconfident', trend: 'down', confidenceScore: 1.22 },
];

const MOCK_QUESTIONS_RESULTS = [
  {
    question: "Will there be a major AI breakthrough?",
    resolved: true,
    avgPrediction: 68,
    yourPrediction: 75,
    actual: 'Yes'
  },
  {
    question: "Will global temperature increase?",
    resolved: true,
    avgPrediction: 82,
    yourPrediction: 85,
    actual: 'Yes'
  },
  {
    question: "Will stock market be higher?",
    resolved: true,
    avgPrediction: 55,
    yourPrediction: 45,
    actual: 'No'
  },
  {
    question: "Will Mars mission succeed?",
    resolved: true,
    avgPrediction: 15,
    yourPrediction: 10,
    actual: 'No'
  },
  {
    question: "Will EVs reach 20% market share?",
    resolved: true,
    avgPrediction: 48,
    yourPrediction: 60,
    actual: 'Yes'
  },
];

export function ResultsPage() {
  const [selectedYear, setSelectedYear] = useState(PAST_YEARS[0]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getConfidenceBadge = (confidence: string) => {
    if (confidence === 'Well-calibrated') {
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">Well-calibrated</Badge>;
    }
    if (confidence.includes('Slightly')) {
      return <Badge variant="secondary">{confidence}</Badge>;
    }
    return <Badge variant="destructive">{confidence}</Badge>;
  };

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
                  {PAST_YEARS.map(year => (
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

          <Tabs defaultValue="rankings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rankings">Rankings</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="confidence">Confidence</TabsTrigger>
            </TabsList>

            <TabsContent value="rankings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {selectedYear} Rankings
                  </CardTitle>
                  <CardDescription className="space-y-2 text-slate-600">
                    {selectedYear === '2025' && (
                      <>
                        <p>The list below has all the people who participated, plus two non-human participants:</p>
                        <p><strong>Averagey McAverageface:</strong> Averagey is the wisdom-of-the-crowds player. His predictions are the average of everyone else's.</p>
                        <p><strong>ChatGPT:</strong> We heard this AI thing is supposed to be big, so we asked ChatGPT to make predictions this year.</p>
                        <p className="pt-1">Without further ado, to the rankings!</p>
                      </>
                    )}
                    {selectedYear === '2024' && (
                      <>
                        <p>The list below has all the people who participated, plus one non-human participant:</p>
                        <p><strong>Averagey McAverageface:</strong> Averagey is the wisdom-of-the-crowds player. His predictions are the average of everyone else's.</p>
                        <p className="pt-1">Without further ado, to the rankings!</p>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedYear === '2025' ? MOCK_RANKINGS_2025.map((entry) => (
                        <TableRow key={entry.rank}>
                          <TableCell className="font-medium">
                            {entry.rank <= 3 ? (
                              <span className="text-xl">
                                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                              </span>
                            ) : (
                              entry.rank
                            )}
                          </TableCell>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell className="font-medium">{entry.score}</TableCell>
                        </TableRow>
                      )) : selectedYear === '2024' ? MOCK_RANKINGS_2024.map((entry) => (
                        <TableRow key={entry.rank}>
                          <TableCell className="font-medium">
                            {entry.rank <= 3 ? (
                              <span className="text-xl">
                                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                              </span>
                            ) : (
                              entry.rank
                            )}
                          </TableCell>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell className="font-medium">{entry.score}</TableCell>
                        </TableRow>
                      )) : MOCK_RANKINGS_OTHER.map((entry) => (
                        <TableRow key={entry.rank}>
                          <TableCell className="font-medium">
                            {entry.rank <= 3 ? (
                              <span className="text-xl">
                                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                              </span>
                            ) : (
                              entry.rank
                            )}
                          </TableCell>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell className="font-medium">{entry.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardContent>
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
                      {MOCK_QUESTIONS_RESULTS.map((result, index) => (
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
            </TabsContent>

            <TabsContent value="confidence" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedYear} Confidence Rankings</CardTitle>
                  <CardDescription className="space-y-3 text-slate-600">
                    <p>The measures here are using a mechanism proposed by Matt Russell last year.</p>
                    <p>The idea is simple: we try scaling your confidence up and down until we find the scaling factor that maximizes your score. If your score goes up as we make your guesses more confident, you're underconfident. If your score goes up when we make your guesses less confident, you're overconfident.</p>
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
                      {selectedYear === '2025' ? MOCK_RANKINGS_2025.map((entry) => (
                        <TableRow key={entry.name}>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell className="font-medium">{entry.confidenceScore.toFixed(2)}</TableCell>
                        </TableRow>
                      )) : selectedYear === '2024' ? MOCK_RANKINGS_2024.map((entry) => (
                        <TableRow key={entry.name}>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell className="font-medium">{entry.confidenceScore.toFixed(2)}</TableCell>
                        </TableRow>
                      )) : MOCK_RANKINGS_OTHER.map((entry) => (
                        <TableRow key={entry.name}>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell className="font-medium">{entry.confidenceScore.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
