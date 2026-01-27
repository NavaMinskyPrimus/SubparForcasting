"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Home, Target, BookOpen, TrendingUp } from 'lucide-react';
import { CURRENT_YEAR } from '@/lib/constants';
import { logout } from '@/lib/authInteractions';

export function Header({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-[#228B22] via-blue-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Subparforecasting {CURRENT_YEAR}</h2>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/home')}
            className="gap-2 text-white hover:bg-white/20 hover:text-white"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/instructions')}
            className="gap-2 text-white hover:bg-white/20 hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            Instructions
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/questions')}
            className="gap-2 text-white hover:bg-white/20 hover:text-white"
          >
            <Target className="w-4 h-4" />
            Forecast!
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/results')}
            className="gap-2 text-white hover:bg-white/20 hover:text-white"
          >
            <TrendingUp className="w-4 h-4" />
            Results
          </Button>

          {isAdmin && <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/admin')}
            className="gap-2 text-white hover:bg-white/20 hover:text-white"
          >
            <Settings className="w-4 h-4" />
            Admin
          </Button>}

          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="gap-2 text-white hover:bg-white/20 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
