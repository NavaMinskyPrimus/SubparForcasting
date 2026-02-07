"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import {
  Target,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";
import { CURRENT_DATE } from "@/lib/constants";

function KatexBlock({ tex }: { tex: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    katex.render(tex, ref.current, {
      displayMode: true,
      throwOnError: false,
      macros: {},
      fleqn: false,
    });
  }, [tex]);

  return <div ref={ref} />;
}

export function InstructionsPage({ isAdmin, open, close}: { isAdmin: boolean, open: Date ,close: Date}) {
  const isOpen = (open <= CURRENT_DATE) && (CURRENT_DATE < close);
  const dueDate = close.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Header isAdmin={isAdmin} />
      <div className="p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How do you play?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Read the questions and assign probabilities,
              that's it!
            </p>
            {/* due date banner */}
            {isOpen && <div className="pt-4">
              <div className="inline-block bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white px-8 py-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">
                  Submissions are due on {dueDate}
                </p>
              </div>
            </div>}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* The Basics */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    The Basics
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      You'll be presented with questions about
                      events that might happen in 2026
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      Assign a probability (0-100%) based on how
                      likely you think the event will occur
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      You can resubmit your answers as many
                      times as you want, so long as you do it
                      before the due date!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Some Tips
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      <strong>Don't be too confident.</strong>{" "}
                      People are often tempted to predict events
                      as either 0% or 100%. But back in 2021
                      when a lot of people did this, only 50% of
                      those guesses were correct!
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      <strong>
                        Look for comparison classes.
                      </strong>{" "}
                      People often take the inside view of a
                      prediction: they think about the details,
                      and how those details influence the
                      result. But it can be helpful to also
                      consider the outside view.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      <strong>Look at other sources.</strong>{" "}
                      Doing a bit of google searching or talking
                      to a better informed friend is totally
                      within the spirit of the game. After all,
                      that's how we get data in real life.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Scoring
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      <strong>Settling:</strong> All questions
                      will be settled by December 1st, 2027.
                      Some questions have specific settling
                      rules (e.g. an arbiter, a different date)
                      so read carefully!
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">
                      <strong>Less Technical:</strong> We score
                      participants based on how surprised they
                      are by the final results. Being confident
                      and right earns you more points than being
                      uncertain and right. But being confident
                      and wrong costs you more than being
                      uncertain and wrong. The key is
                      calibration!
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="text-slate-700">
                      <p className="mb-2">
                        <strong>Technical:</strong> Your score
                        is the average of the log probabilities
                        you gave to each outcome, normalized
                        where a guess of 50% for each question
                        is worth 0 points. Thus the equation for
                        your score for any given question is:
                      </p>
                        <div className="my-3 bg-slate-50 p-4 rounded-md overflow-x-auto">
                          <KatexBlock
                            tex={String.raw`\text{score}(p,\text{outcome}) =
                          \left(
                          \begin{cases}
                          \ln(p) & \text{if the outcome was true}\\
                          \ln(1-p) & \text{if the outcome was false}
                          \end{cases}
                          \right) - \ln(0.5)`}
                          />
                        </div>
                      <p>
                        And your final score is the average of
                        your scores for each question.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={() => router.push("/questions")}
              className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Ready to Start Forecasting →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
