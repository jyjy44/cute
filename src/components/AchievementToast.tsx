import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, X, Award } from 'lucide-react';
import { AchievementDefinition } from '../types';
import { sound } from '../utils/sound';

interface Props {
  achievement: AchievementDefinition;
  pointsEarned: number;
  onDismiss: () => void;
  onOpenAchievements: () => void;
}

export const AchievementToast: React.FC<Props> = ({
  achievement,
  pointsEarned,
  onDismiss,
  onOpenAchievements,
}) => {
  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.2 },
        colors: ['#fbbf24', '#f59e0b', '#ec4899', '#a855f7'],
      });
    } catch {}

    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] animate-bounce">
      <div className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 p-1 rounded-3xl shadow-2xl">
        <div className="bg-white rounded-[22px] p-4 flex items-center justify-between gap-3 relative overflow-hidden">
          {/* Confetti sparkle icon */}
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shrink-0 shadow-xs">
            {achievement.badgeEmoji}
          </div>

          <div
            onClick={onOpenAchievements}
            className="flex-1 cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                إنجاز جديد مفتوح! 🎉
              </span>
              <span className="text-xs font-black text-emerald-600">
                +{pointsEarned} نقطة ⭐
              </span>
            </div>
            <h4 className="font-black text-sm text-slate-800 mt-0.5 font-['Cairo',sans-serif]">
              {achievement.title}
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              {achievement.description}
            </p>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
