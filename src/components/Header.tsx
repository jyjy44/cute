import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, PlusCircle, Users, Award, Star } from 'lucide-react';
import { sound } from '../utils/sound';
import { CharacterAvatar } from './CharacterAvatar';
import { getUserLevel } from '../data/achievements';
import { UserProfile } from '../types';

interface Props {
  currentView: 'home' | 'create' | 'play' | 'results' | 'leaderboard' | 'pass-and-play';
  onNavigate: (view: 'home' | 'create' | 'leaderboard' | 'pass-and-play') => void;
  activeQuizId?: string | null;
  userPoints?: number;
  onOpenAchievements?: () => void;
  userProfile?: UserProfile;
  onOpenEditProfile?: () => void;
}

export const Header: React.FC<Props> = ({
  currentView,
  onNavigate,
  userPoints = 0,
  onOpenAchievements,
  userProfile,
  onOpenEditProfile,
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted());
  const levelInfo = getUserLevel(userPoints);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playPop();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-pink-100 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="relative">
            <CharacterAvatar characterId="basbous" size="sm" expression="happy" />
            <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-pink-600 group-hover:text-pink-700 transition flex items-center gap-1.5 font-['Cairo',sans-serif]">
              تحدي الأصدقاء
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                الكيوت 🐾
              </span>
            </h1>
            <p className="text-[11px] text-purple-600/80 hidden sm:block font-medium">
              من يعرفك أكثر بين أصدقائك؟ 💖
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* User Profile Button */}
          {userProfile && onOpenEditProfile && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenEditProfile();
              }}
              className="px-2 sm:px-2.5 py-1 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-700 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-2xs group"
              title="تعديل ملفك الشخصي وبياناتك"
            >
              <CharacterAvatar characterId={userProfile.characterId} size="sm" />
              <span className="hidden sm:inline font-black text-slate-800 text-[11px] max-w-[80px] truncate">
                {userProfile.name}
              </span>
            </button>
          )}

          {/* Points & Achievements Badge */}
          {onOpenAchievements && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenAchievements();
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition flex items-center gap-1.5 text-xs font-black cursor-pointer shadow-xs group"
              title="عرض النقاط والإنجازات المفتوحة"
            >
              <span className="text-amber-500 text-sm group-hover:scale-125 transition-transform">⭐</span>
              <span>{userPoints}</span>
              <span className="hidden sm:inline text-amber-700 font-bold">نقطة</span>
              <span className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900 font-extrabold">
                {levelInfo.badge} {levelInfo.title}
              </span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم الصوت'}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-700 transition flex items-center gap-1 text-xs font-bold cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />}
            <span className="hidden lg:inline">{isMuted ? 'صامت' : 'موسيقى'}</span>
          </button>

          {/* Pass & Play Quick Mode */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('pass-and-play');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer ${
              currentView === 'pass-and-play'
                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">وجهاً لوجه</span>
          </button>

          {/* My Quizzes & Leaderboard */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('leaderboard');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer ${
              currentView === 'leaderboard'
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500 group-hover:text-amber-600" />
            <span className="hidden sm:inline">لوحة النتائج</span>
          </button>

          {/* Create Quiz CTA */}
          <button
            onClick={() => {
              sound.playPop();
              onNavigate('create');
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer shadow-sm ${
              currentView === 'create'
                ? 'bg-pink-600 text-white shadow-pink-200'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-200 hover:shadow-md'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>تحدي جديد</span>
          </button>
        </div>
      </div>
    </header>
  );
};

