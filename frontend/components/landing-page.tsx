"use client";

import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { CURRENT_YEAR } from '@/lib/constants';
import { loginWithGoogle } from '@/lib/authInteractions';

export function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Subparforecasting</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-8 pt-16">
        <div className="max-w-5xl w-full space-y-12">

          {/* Banner Image */}
          <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-200">
              <img
                src="/banner.png"
                alt="Subparforecasting"
                className="w-full h-auto"
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center space-y-4 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Subparforecasting {CURRENT_YEAR}
              </h2>
              <p className="text-xl text-slate-600">
                The annual game where we try (and fail) to be superforecasters
              </p>
            </div>

            {/* Login Button */}
            <form action={loginWithGoogle}>
              <Button
                type="submit"
                size="lg"
                className="text-lg px-16 py-7 bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login with Google
              </Button>
            </form>
          </div>

          {/* Easter Egg Banner */}
          <div className="bg-blue-600 rounded-2xl p-8 shadow-xl text-center min-h-[120px] flex items-center justify-center">
            <p className="text-blue-600 select-all">
              Wow, you found an easter egg, greeeaattttttt joooobbbb
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
