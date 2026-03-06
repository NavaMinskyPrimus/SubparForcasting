"use client";

import { startTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Header } from '@/components/header';
import { toast } from 'sonner';
import { CURRENT_YEAR } from '@/lib/constants';
import { postAnswers } from '@/lib/answersActions';

// Mock questions data

interface Answer {
  questionId: number;
  probability: number;
  inputValue?: string;
}

export function QuestionsPage({rows, isAdmin, origional_answers}: {rows: any[], isAdmin: boolean, origional_answers: any[]}) {
  const [answers, setAnswers] = useState<Answer[]>(
    rows.map(q => ({ questionId: q.questionid, probability: q.probability, inputValue: String(q.probability) }))
  );
  type SaveStatus = "idle" | "saving" | "success" | "error";
  const [answersSaveStatus, setAnswersSaveStatus] = useState<SaveStatus>("idle");
  const [answersSaveError, setAnswersSaveError] = useState<string | null>(null);

  const updateAnswer = (questionId: number, probability: number, inputValue?: string) => {
    setAnswers(prev =>
      prev.map(a => a.questionId === questionId ? { ...a, probability, inputValue } : a)
    );
  };

  const handleSubmit = () => {
      setAnswersSaveStatus("saving");
      setAnswersSaveError(null);
     startTransition(async () => {
//export async function postAnswers(answers: {probability: number, questionid: number}[]): Promise<ActionResult<any>>{
        let answers_formatted = []
        for(let a of answers){
          const response = {questionid: a.questionId, probability: a.probability}
          answers_formatted.push(response)
        }
        const res = await postAnswers(answers_formatted);
         if(!res.ok){
          setAnswersSaveStatus("error")
          setAnswersSaveError(res.error)
          return;
        }
        setAnswersSaveStatus("success");
        toast.success('Your predictions have been submitted!', {
          description: 'Good luck! Check back at the end of the year to see your results.'
        });
        setTimeout(() => setAnswersSaveStatus("idle"), 1000);
     })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header isAdmin={isAdmin} playing={true}/>
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-end">
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              {CURRENT_YEAR} Forecasting Questions
            </h1>
          </div>

          <div className="space-y-6">
            {rows.map((question, index) => {
              const answer = answers.find(a => a.questionId === question.questionid);
              const probability = (answer?.probability) ?? 50;

              return (
                
                <Card key={question.questionid}>
                  
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
                        <Label htmlFor={`question-${question.questionid}`}>
                          Your Prediction
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`question-${question.questionid}-input`}
                            type="text"
                            value={answer?.inputValue ?? ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '') {
                                updateAnswer(question.questionid, probability, '');
                                return;
                              }
                              const numValue = parseFloat(value);
                              if (!isNaN(numValue)) {
                                const clampedValue = Math.max(0, Math.min(100, numValue));
                                updateAnswer(question.questionid, clampedValue, value);
                              }
                            }}
                            onBlur={(e) => {
                              const value = e.target.value;
                              if (value === '' || isNaN(parseFloat(value))) {
                                updateAnswer(question.questionid, probability, probability.toString());
                              } else {
                                const numValue = parseFloat(value);
                                const clampedValue = Math.max(0, Math.min(100, numValue));
                                updateAnswer(question.questionid, clampedValue, clampedValue.toString());
                              }
                            }}
                            className="w-20 text-center"
                          />
                          <span className="text-sm text-slate-600">%</span>
                        </div>
                      </div>

                      <Slider
                        id={`question-${question.questionid}`}
                        value={[probability]}
                        onValueChange={(values) => updateAnswer(question.questionid, values[0], values[0].toString())}
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
