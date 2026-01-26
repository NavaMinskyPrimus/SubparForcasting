"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Header } from '@/components/header';
import { toast } from 'sonner';

// Mock questions data
const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "Will there be a major AI breakthrough that makes front-page news?",
    category: "Technology"
  },
  {
    id: 2,
    text: "Will global average temperature in 2026 be higher than 2025?",
    category: "Climate"
  },
  {
    id: 3,
    text: "Will the stock market (S&P 500) be higher at the end of 2026 than at the start?",
    category: "Economy"
  },
  {
    id: 4,
    text: "Will there be a successful human mission to Mars?",
    category: "Space"
  },
  {
    id: 5,
    text: "Will electric vehicles make up more than 20% of new car sales globally?",
    category: "Technology"
  },
  {
    id: 6,
    text: "Will a new pandemic emerge requiring international response?",
    category: "Health"
  },
  {
    id: 7,
    text: "Will quantum computing have a commercial application announced?",
    category: "Technology"
  },
  {
    id: 8,
    text: "Will there be a major earthquake (>7.0) affecting a major city?",
    category: "Natural Events"
  }
];

interface Answer {
  questionId: number;
  probability: number;
  inputValue?: string;
}

export function QuestionsPage() {
  const [answers, setAnswers] = useState<Answer[]>(
    MOCK_QUESTIONS.map(q => ({ questionId: q.id, probability: 50, inputValue: '50' }))
  );

  const updateAnswer = (questionId: number, probability: number, inputValue?: string) => {
    setAnswers(prev =>
      prev.map(a => a.questionId === questionId ? { ...a, probability, inputValue } : a)
    );
  };

  const handleSave = () => {
    toast.success('Your predictions have been saved!', {
      description: 'You can come back and update them anytime before the deadline.'
    });
  };

  const handleSubmit = () => {
    toast.success('Your predictions have been submitted!', {
      description: 'Good luck! Check back at the end of the year to see your results.'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header isAdmin={true} />
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-end">
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              2026 Forecasting Questions
            </h1>
          </div>

          <div className="space-y-6">
            {MOCK_QUESTIONS.map((question, index) => {
              const answer = answers.find(a => a.questionId === question.id);
              const probability = answer?.probability || 50;

              return (
                <Card key={question.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-slate-500">
                            Question {index + 1}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{question.text}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`question-${question.id}`}>
                          Your Prediction
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`question-${question.id}-input`}
                            type="text"
                            value={answer?.inputValue ?? ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '') {
                                updateAnswer(question.id, probability, '');
                                return;
                              }
                              const numValue = parseFloat(value);
                              if (!isNaN(numValue)) {
                                const clampedValue = Math.max(0, Math.min(100, numValue));
                                updateAnswer(question.id, clampedValue, value);
                              }
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (value === '' || isNaN(parseFloat(value))) {
                                updateAnswer(question.id, probability, probability.toString());
                              } else {
                                const numValue = parseFloat(value);
                                const clampedValue = Math.max(0, Math.min(100, numValue));
                                updateAnswer(question.id, clampedValue, clampedValue.toString());
                              }
                            }}
                            className="w-20 text-center"
                          />
                          <span className="text-sm text-slate-600">%</span>
                        </div>
                      </div>

                      <Slider
                        id={`question-${question.id}`}
                        value={[probability]}
                        onValueChange={(values) => updateAnswer(question.id, values[0], values[0].toString())}
                        max={100}
                        step={1}
                        className="w-full"
                      />

                      <div className="flex justify-between text-xs text-slate-500">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
