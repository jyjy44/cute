import React, { useState, useEffect } from 'react';
import { X, Trophy, Award, Sparkles, Star, Check, Lock, History, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';
import { ACHIEVEMENTS, getUserLevel, USER_LEVELS } from '../data/achievements';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../utils/sound';

interface Props {
  profile: UserProfile;
  onClose: () => void;
}

export const AchievementsModal: React.FC<Props> = ({ profile, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [showHistory, setShowHistory] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const levelInfo = getUserLevel(profile.points);
  const nextLevel = USER_LEVELS.find((l) => l.level === levelInfo.level + 1);

  // Calculate percentage to next level
  let progressToNext = 100;
  if (nextLevel) {
    const range = nextLevel.minPoints - levelInfo.minPoints;
    const currentWithinRange = profile.points - levelInfo.minPoints;
    progressToNext = Math.min(100, Math.max(0, Math.round((currentWithinRange / range) * 100)));
  }

  const unlockedCount = profile.unlockedAchievements.length;
  const totalAchievements = ACHIEVEMENTS.length;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-amber-200 shadow-2xl p-5 sm:p-7 relative max-h-[90vh] overflow-y-auto flex flex-col space-y-6">
        {/* Prominent Exit Button (✕ خروج) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          aria-label="الخروج من قائمة الإنجازات"
          title="الخروج من قائمة الإنجازات"
          className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 hover:text-rose-800 border-2 border-rose-300 flex items-center gap-1.5 shadow-md hover:shadow-lg transition cursor-pointer font-black text-xs group"
        >
          <X className="w-4 h-4 text-rose-600 group-hover:rotate-90 transition-transform duration-200 stroke-[3]" />
          <span>خروج</span>
        </button>

        {/* PROFILE HEADER & POINTS CARD */}
        <div className="bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 rounded-3xl p-5 sm:p-6 border-2 border-amber-200/90 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-right">
            <div className="relative shrink-0">
              <CharacterAvatar characterId={profile.characterId} size="lg" expression="celebrating" />
              <span className="absolute -bottom-1 -right-1 text-2xl">{levelInfo.badge}</span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-['Cairo',sans-serif]">
                  {profile.name}
                </h3>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  مستوى {levelInfo.level}: {levelInfo.title} {levelInfo.badge}
                </span>
              </div>

              {/* Points Big Display */}
              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-amber-600 font-['Cairo',sans-serif]">
                  {profile.points}
                </span>
                <span className="text-sm font-black text-amber-700 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                  نقطة صداقة ⭐
                </span>
              </div>

              {/* Progress to Next Level */}
              {nextLevel ? (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>التقدم نحو المستوى التالي ({nextLevel.title} {nextLevel.badge})</span>
                    <span>{profile.points} / {nextLevel.minPoints} نقطة</span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-amber-200">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressToNext}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <p className="text-xs font-black text-emerald-600 pt-1">
                  وصلت إلى أقصى مستوى في الصداقة! 👑
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 pt-4 mt-4 border-t border-amber-200/60 text-center">
            <div className="bg-white/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block">التحديات الملعوبة</span>
              <span className="text-sm font-black text-purple-700">{profile.stats.quizzesPlayed}</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block">التحديات المنشأة</span>
              <span className="text-sm font-black text-pink-700">{profile.stats.quizzesCreated}</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block">إجابات صحيحة</span>
              <span className="text-sm font-black text-emerald-700">{profile.stats.totalCorrectAnswers}</span>
            </div>
            <div className="bg-white/80 p-2 rounded-xl">
              <span className="text-[10px] text-slate-500 font-bold block">درجات كاملة (100%)</span>
              <span className="text-sm font-black text-amber-600">{profile.stats.perfectScoresCount}</span>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS LIST SECTION */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-lg font-black text-slate-800 flex items-center gap-2 font-['Cairo',sans-serif]">
                <Award className="w-5 h-5 text-amber-500" />
                <span>قائمة الإنجازات والأوسمة الكيوت</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold">
                  {unlockedCount} / {totalAchievements} مفتوح
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                حقق الأهداف واكسب نقاط إضافية لترقية مستواك وفتح الشارات!
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  setFilter('all');
                  setShowHistory(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filter === 'all' && !showHistory
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الكل
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setFilter('unlocked');
                  setShowHistory(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filter === 'unlocked' && !showHistory
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                المفتوحة ({unlockedCount})
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setFilter('locked');
                  setShowHistory(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filter === 'locked' && !showHistory
                    ? 'bg-purple-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                المقفولة ({totalAchievements - unlockedCount})
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setShowHistory(true);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  showHistory
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="سجل النقاط"
              >
                <History className="w-3.5 h-3.5" />
                <span>السجل</span>
              </button>
            </div>
          </div>

          {/* VIEW: Points History Log */}
          {showHistory ? (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {profile.history.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  لا توجد عمليات نقاط مسجلة بعد. ابدأ بأول تحدٍ لتبدأ بجمع النقاط! ⭐
                </div>
              ) : (
                profile.history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs font-bold"
                  >
                    <div>
                      <p className="text-slate-800">{item.description}</p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString('ar-EG', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <span className="text-emerald-600 font-black text-sm">
                      +{item.points} نقطة
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* VIEW: Achievements Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {ACHIEVEMENTS.filter((ach) => {
                const isUnlocked = profile.unlockedAchievements.includes(ach.id);
                if (filter === 'unlocked') return isUnlocked;
                if (filter === 'locked') return !isUnlocked;
                return true;
              }).map((ach) => {
                const isUnlocked = profile.unlockedAchievements.includes(ach.id);
                const currentStat = ach.getStatValue(profile.stats);
                const progressPct = Math.min(
                  100,
                  Math.round((currentStat / ach.targetCount) * 100)
                );

                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border-2 transition relative flex flex-col justify-between ${
                      isUnlocked
                        ? 'border-amber-300 bg-amber-50/50 shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 opacity-80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-2 ${
                          isUnlocked
                            ? 'bg-amber-100 border-amber-300 shadow-sm animate-pulse'
                            : 'bg-slate-200 border-slate-300 grayscale'
                        }`}
                      >
                        {isUnlocked ? ach.badgeEmoji : '🔒'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-black text-sm text-slate-800 truncate font-['Cairo',sans-serif]">
                            {ach.title}
                          </h5>
                          <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                            +{ach.pointsReward} ⭐
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar & Status */}
                    <div className="mt-3 pt-2 border-t border-slate-200/60">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1">
                        <span>
                          {isUnlocked ? 'مكتمل ومفتوح بنجاح ✨' : `التقدم: ${currentStat} / ${ach.targetCount}`}
                        </span>
                        <span className="text-purple-600 font-extrabold">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isUnlocked
                              ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                              : 'bg-gradient-to-r from-amber-400 to-pink-500'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Exit Button */}
        <div className="pt-2 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mx-auto cursor-pointer active:scale-95"
          >
            <X className="w-5 h-5 stroke-[3]" />
            <span>الخروج من قائمة الإنجازات والعودة للتطبيق</span>
          </button>
        </div>
      </div>
    </div>
  );
};
