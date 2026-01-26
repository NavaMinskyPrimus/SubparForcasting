"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Target, BookOpen, TrendingUp } from 'lucide-react';
import { CURRENT_YEAR, GAME_YEAR_NUMBER } from '@/lib/constants';

export function HomePage() {
  const router = useRouter();

  // TODO: Replace with actual logic to check if questions are open
  // This should check against the opening/closing dates set in admin
  const questionsAreOpen = true;
  const dueDate = "Monday, January 19th"; // TODO: Get from admin settings

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />
      <div className="p-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Welcome Banner */}
          <div className="text-center py-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-3xl opacity-60"></div>
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Welcome to Subparforecasting, {CURRENT_YEAR}!
              </h1>
              {questionsAreOpen ? (
                <p className="text-xl text-slate-700 font-medium">
                  Questions are open! Please submit by {dueDate}
                </p>
              ) : (
                <p className="text-xl text-slate-700 font-medium">
                  Our next game will start in January {CURRENT_YEAR + 1}
                </p>
              )}
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Instructions - Left */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Instructions and Advice</h3>
                <Button
                  size="lg"
                  onClick={() => router.push('/instructions')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold"
                >
                  Read Instructions →
                </Button>
              </CardContent>
            </Card>

            {/* Questions - Middle */}
            <Card className="border-2 border-green-200 shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#228B22] to-green-600 shadow-md">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Questions</h3>
                <Button
                  size="lg"
                  onClick={() => {
                    router.push('/questions');
                    window.scrollTo(0, 0);
                  }}
                  className="w-full bg-gradient-to-r from-[#228B22] to-green-600 hover:from-green-700 hover:to-green-800 text-white font-semibold"
                >
                  Go to Questions →
                </Button>
              </CardContent>
            </Card>

            {/* Past Results - Right */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-md">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Past Results</h3>
                <Button
                  size="lg"
                  onClick={() => router.push('/results')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold"
                >
                  View Results →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* About Section */}
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardContent className="pt-8 pb-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-slate-900">What is Subparforecasting?</h2>
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed text-lg">
                <p>
                  For the {GAME_YEAR_NUMBER === 1 ? '1st' : GAME_YEAR_NUMBER === 2 ? '2nd' : GAME_YEAR_NUMBER === 3 ? '3rd' : `${GAME_YEAR_NUMBER}th`} year, we're doing a weird and supposedly fun activity to celebrate the New Year:
                  we're all going to try to be <span className="font-semibold">superforecasters</span>.
                  Since we're not great at it, we call it <span className="font-semibold">subparforecasting</span> instead!
                </p>

                <p>
                  Superforecasting is a concept developed by{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Philip_E._Tetlock"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    Philip Tetlock
                  </a>, who runs
                  competitions in which people make predictions and are evaluated over time on the quality of their predictions.
                  The people who do best earn the title "superforecasters". Those so-called superforecasters have racked up an
                  impressive record, <span className="font-semibold">beating out CIA analysts</span> and other
                  expert forecasters.
                </p>

                <p>
                  Tetlock wrote a{' '}
                  <a
                    href="https://www.amazon.com/Superforecasting-Science-Prediction-Philip-Tetlock/dp/0804136718/ref=sr_1_1?crid=27N0E9VSKKMC4&dchild=1&keywords=tetlock+superforecasting&qid=1609382011&sprefix=tetlock+superfor%2Caps%2C165&sr=8-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    book
                  </a>
                  {' '}about this effort, and there's a nice{' '}
                  <a
                    href="https://www.vox.com/podcasts/2021/3/31/22358470/the-ezra-klein-show-julia-galef-the-scout-mindset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-semibold"
                  >
                    interview with him on the Ezra Klein show
                  </a>
                  {' '}(interviewed by Julia Galef, whose book{' '}
                  <a
                    href="https://www.amazon.com/Scout-Mindset-People-Things-Clearly/dp/B07RP27XJP/ref=sr_1_1?crid=3DEGY2F2YK9NW&keywords=the+scout+mindset&qid=1640655205&sprefix=the+scout+mindset%2Caps%2C134&sr=8-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline italic font-semibold"
                  >
                    The Scout Mindset
                  </a>
                  {' '}we also recommend!)
                </p>

                <p>
                  You can submit multiple times. We'll only count the last submission. And feel free to do the form with a partner.
                  Try to put in an answer for every question. Blanks will be treated as 50/50 guesses. The questions are written to be settleable by December 1st,
                  and we'll generate a final report when it's all said and done.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center py-8">
            <div className="bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Make Your Predictions?</h3>
              <Button
                size="lg"
                onClick={() => {
                  router.push('/questions');
                  window.scrollTo(0, 0);
                }}
                className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Go forth and forecast!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
