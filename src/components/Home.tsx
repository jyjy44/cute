import React, { useState } from 'react';
import {
  Sparkles,
  Trophy,
  Users,
  PlusCircle,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  HelpCircle,
  Award,
  Star,
  Search,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Flame,
  Brain,
  KeyRound,
  Filter,
} from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { ACHIEVEMENTS, getUserLevel } from '../data/achievements';
import { CharacterAvatar } from './CharacterAvatar';
import { EnterCodeModal } from './EnterCodeModal';
import { ALL_PREMADE_CHALLENGES, UnifiedChallenge } from '../data/allChallenges';
import { sound } from '../utils/sound';
import { searchQuizByCode } from '../utils/api';

interface Props {
  onStartCreate: () => void;
  onOpenLeaderboard: () => void;
  onOpenPassAndPlay: (quizId?: string) => void;
  onEnterQuizCode: (code: string) => void;
  userPoints?: number;
  onOpenAchievements?: () => void;
  onSelectChallenge?: (challenge: UnifiedChallenge) => void;
}

export const Home: React.FC<Props> = ({
  onStartCreate,
  onOpenLeaderboard,
  onOpenPassAndPlay,
  onEnterQuizCode,
  userPoints = 0,
  onOpenAchievements,
  onSelectChallenge,
}) => {
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const [quizCodeInput, setQuizCodeInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [foundQuiz, setFoundQuiz] = useState<{
    id: string;
    code: string;
    creatorName: string;
    creatorCharacterId: string;
    title: string;
    totalQuestions: number;
  } | null>(null);

  // Challenges Library Filters
  const [challengeFilter, setChallengeFilter] = useState<'all' | 'couples' | 'personality'>('all');
  const [challengeSearchQuery, setChallengeSearchQuery] = useState('');
  const [visibleChallengesCount, setVisibleChallengesCount] = useState(12);

  const [activeMascotBubble, setActiveMascotBubble] = useState<string>('اضغط على أي شخصية لتسمع ما تقوله!');
  const levelInfo = getUserLevel(userPoints);

  const handleMascotClick = (quote: string) => {
    sound.playPop();
    setActiveMascotBubble(quote);
  };

  const handleCodeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizCodeInput.trim()) return;

    let cleanCode = quizCodeInput.trim();
    if (cleanCode.includes('quiz=')) {
      const parts = cleanCode.split('quiz=');
      cleanCode = parts[1].split('&')[0];
    }

    setIsSearching(true);
    setSearchError(null);
    setFoundQuiz(null);

    try {
      const result = await searchQuizByCode(cleanCode);
      if (result && result.found && result.quiz) {
        sound.playCorrect();
        setFoundQuiz(result.quiz);
      } else {
        sound.playWrong();
        setSearchError('لم يتم العثور على تحدٍ بهذا الكود.. تأكد من كتابة الكود بشكل صحيح أو اطلب الكود من صديقك!');
      }
    } catch {
      setSearchError('حدث خطأ أثناء البحث، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleEnterFoundQuiz = () => {
    if (foundQuiz) {
      sound.playVictory();
      onEnterQuizCode(foundQuiz.id);
    }
  };

  const handleEnterFoundQuizHeadToHead = () => {
    if (foundQuiz) {
      sound.playVictory();
      onOpenPassAndPlay(foundQuiz.id);
    }
  };

  // Filtered challenges list
  const filteredChallenges = ALL_PREMADE_CHALLENGES.filter((ch) => {
    const matchesCategory =
      challengeFilter === 'all' || ch.categoryGroup === challengeFilter;
    const matchesSearch =
      !challengeSearchQuery.trim() ||
      ch.title.toLowerCase().includes(challengeSearchQuery.toLowerCase()) ||
      ch.tagline.toLowerCase().includes(challengeSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedChallenges = filteredChallenges.slice(0, visibleChallengesCount);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-8 px-4 space-y-10 animate-fade-in">
      {/* HERO SECTION */}
      <div className="text-center space-y-5 pt-2 relative">
        {/* Floating Cute Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs sm:text-sm font-black shadow-xs animate-bounce">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>تطبيق تحدي الصداقة والكابلز الألطف والأمتع لعام 2026! 🐾</span>
        </div>

        {/* Big Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight font-['Cairo',sans-serif] leading-tight sm:leading-tight">
          من يعرفني أكثر؟ <br />
          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
            تحدي الأصدقاء والكابلز الكيوت 💖
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
          أجب عن أسئلتك أو اختر من بين 50 تحدياً جاهزاً، شارك الرابط والكود مع أصدقائك وشريكك، واكتشف فوراً من هو توأم روحك الحقيقي! 😂🐾
        </p>

        {/* CODE SEARCH PLACED PROMINENTLY ABOVE */}
        <div className="max-w-xl mx-auto bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-4 sm:p-5 rounded-3xl border-2 border-purple-300 shadow-md space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="p-1 rounded-lg bg-purple-200 text-purple-700">
              <KeyRound className="w-4 h-4" />
            </span>
            <span className="text-xs sm:text-sm font-black text-purple-900">
              البحث عن كود التحدي للعب (أونلاين أو وجهاً لوجه 👥) 🔑
            </span>
          </div>

          <form onSubmit={handleCodeSearch} className="flex gap-2">
            <input
              type="text"
              value={quizCodeInput}
              onChange={(e) => {
                setQuizCodeInput(e.target.value);
                setSearchError(null);
                setFoundQuiz(null);
              }}
              placeholder="اكتب كود التحدي هنا (مثال: 74921)..."
              className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-purple-200 focus:border-purple-600 text-sm font-black text-slate-800 outline-hidden tracking-wider shadow-inner"
            />
            <button
              type="submit"
              disabled={isSearching || !quizCodeInput.trim()}
              className="px-5 sm:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>{isSearching ? 'جارٍ البحث...' : 'بحث 🔍'}</span>
            </button>
          </form>

          {/* Search Error Message */}
          {searchError && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center justify-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* FOUND QUIZ PREVIEW CARD (WITH BOTH ONLINE AND HEAD-TO-HEAD OPTIONS) */}
          {foundQuiz && (
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-300 shadow-lg space-y-3 animate-scale-up text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>وجدنا تحدي صديقك بنجاح! 🎉</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <CharacterAvatar characterId={foundQuiz.creatorCharacterId} size="md" expression="celebrating" />
                <div className="text-right">
                  <h4 className="text-sm sm:text-base font-black text-slate-800 font-['Cairo',sans-serif]">
                    {foundQuiz.title}
                  </h4>
                  <p className="text-xs text-purple-600 font-bold">
                    صانع التحدي: {foundQuiz.creatorName} ({foundQuiz.totalQuestions} أسئلة)
                  </p>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    كود التحدي: #{foundQuiz.code}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {/* Single Player Online */}
                <button
                  type="button"
                  onClick={handleEnterFoundQuiz}
                  className="py-3 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>دخول التحدي ومواجهته 🚀</span>
                </button>

                {/* Head-to-Head Challenge */}
                <button
                  type="button"
                  onClick={handleEnterFoundQuizHeadToHead}
                  className="py-3 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-300" />
                  <span>لعب هذا التحدي وجهاً لوجه! 👥🔥</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          {/* Create Quiz Button */}
          <button
            onClick={() => {
              sound.playVictory();
              onStartCreate();
            }}
            className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <PlusCircle className="w-5 h-5 shrink-0" />
            <span>أنشئ تحديك الخاص الآن! 🚀</span>
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-amber-50/60 text-amber-900 border-2 border-amber-300 font-extrabold text-base rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <span>لوحة نتائج إجابات أصدقائك 🏆</span>
          </button>

          {/* Face to Face Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenPassAndPlay();
            }}
            className="w-full sm:w-auto px-6 py-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border-2 border-purple-200 font-extrabold text-base rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <Users className="w-5 h-5 shrink-0" />
            <span>تحدي وجهاً لوجه 👥🔥</span>
          </button>
        </div>
      </div>

      {/* 50 PRE-MADE CHALLENGES SHOWCASE SECTION */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-300 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-black border border-pink-200">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>مكتبة التحديات الجاهزة (50 تحدياً مميزاً!) 🎉</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-2 font-['Cairo',sans-serif]">
              تحديات الكابلز والأصدقاء والتحليل النفسي 🌟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              اختر أي تحدٍ جاهز فوراً، أجب عن أسئلته وشارك الرابط مع شريكك أو أصدقائك لتبدأ المنافسة!
            </p>
          </div>

          {/* Challenge Type Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setChallengeFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                challengeFilter === 'all'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>✨ الكل</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">50</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setChallengeFilter('couples');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                challengeFilter === 'couples'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              <span>❤️ الكابلز والحب</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">30</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setChallengeFilter('personality');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                challengeFilter === 'personality'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <span>🧠 النفسية والشخصية</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">20</span>
            </button>
          </div>
        </div>

        {/* Quick Search inside challenges */}
        <div className="relative">
          <input
            type="text"
            value={challengeSearchQuery}
            onChange={(e) => setChallengeSearchQuery(e.target.value)}
            placeholder="ابحث عن تحدٍ بالاسم أو الموضوع (مثال: نرجسية، حب، غيرة، مين، سفر، صراحة)..."
            className="w-full px-10 py-3 rounded-2xl bg-pink-50/50 border-2 border-pink-200 focus:border-pink-500 focus:bg-white text-xs sm:text-sm text-slate-800 font-bold outline-hidden transition"
          />
          <Search className="w-4 h-4 text-pink-400 absolute right-3.5 top-3.5" />
          {challengeSearchQuery && (
            <button
              onClick={() => setChallengeSearchQuery('')}
              className="absolute left-3.5 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              مسح
            </button>
          )}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {displayedChallenges.map((ch) => (
            <div
              key={ch.id}
              className="bg-white p-4 rounded-2xl border-2 border-pink-100 hover:border-pink-300 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${ch.badgeColor}`}>
                    {ch.categoryGroupLabel}
                  </span>
                  <span className="text-xl">{ch.emoji}</span>
                </div>

                <h4 className="font-black text-sm sm:text-base text-slate-800 font-['Cairo',sans-serif] group-hover:text-pink-600 transition leading-snug">
                  {ch.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {ch.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-400">
                  {ch.questions.length} أسئلة ممتعة
                </span>

                <button
                  type="button"
                  onClick={() => {
                    sound.playVictory();
                    if (onSelectChallenge) {
                      onSelectChallenge(ch);
                    } else {
                      onStartCreate();
                    }
                  }}
                  className="px-3.5 py-1.5 bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1 cursor-pointer"
                >
                  <span>بدء التحدي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show more button if filtered challenges exceeds visible count */}
        {filteredChallenges.length > visibleChallengesCount && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                sound.playPop();
                setVisibleChallengesCount((prev) => prev + 12);
              }}
              className="px-6 py-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 border-2 border-pink-200 font-black text-xs transition cursor-pointer shadow-xs"
            >
              عرض المزيد من التحديات ({filteredChallenges.length - visibleChallengesCount} تحدٍ متبقٍ) ✨
            </button>
          </div>
        )}
      </div>

      {/* MASCOT PARADE SHOWCASE */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-md space-y-5 text-center">
        <div>
          <span className="text-xs font-black text-purple-600 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            أصدقاؤنا الكرتونيون الكيوت 🌟
          </span>
          <h3 className="text-xl font-black text-slate-800 mt-2 font-['Cairo',sans-serif]">
            شخصيات كرتونية لطيفة ترافقك في كل سؤال وجواب!
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            {activeMascotBubble}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              onClick={() => handleMascotClick(char.quote)}
              className="p-3 bg-pink-50/40 hover:bg-pink-100/60 rounded-2xl border border-pink-200/80 flex flex-col items-center gap-1.5 transition cursor-pointer group hover:scale-105"
            >
              <CharacterAvatar characterId={char.id} size="md" interactive expression="happy" />
              <p className="font-black text-xs text-slate-800 group-hover:text-pink-600 transition">
                {char.name}
              </p>
              <span className="text-[10px] text-slate-500 leading-tight">
                {char.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ACHIEVEMENTS & POINTS SYSTEM SHOWCASE */}
      <div className="bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-100 text-amber-700">
                <Award className="w-5 h-5 text-amber-600" />
              </span>
              <span className="text-xs font-black text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                نظام النقاط والإنجازات الكيوت 🌟
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-['Cairo',sans-serif]">
              اكسب النقاط وافتح أوسمة الصداقة!
            </h3>
            <p className="text-xs text-slate-600 max-w-lg">
              يبدأ كل مستخدم بصفر نقاط ويكتسب نقاطًا عند إنشاء التحديات أو إكمالها بنجاح وتحقيق أهداف مميزة مثل 'المتحدي الأول' و'خبير التحديات'!
            </p>
          </div>

          {/* User Points Badge with Level */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 text-center shadow-xs shrink-0 min-w-[170px]">
            <span className="text-[11px] font-bold text-slate-500 block">رصيد نقاطك الحالي</span>
            <div className="text-3xl font-black text-amber-600 flex items-center justify-center gap-1.5 my-0.5">
              <span>{userPoints}</span>
              <span className="text-base text-amber-500">⭐</span>
            </div>
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 inline-block">
              {levelInfo.badge} {levelInfo.title}
            </span>
          </div>
        </div>

        {/* Featured Achievements Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {ACHIEVEMENTS.slice(0, 4).map((ach) => (
            <div
              key={ach.id}
              className="bg-white/90 p-3.5 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between space-y-2 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{ach.badgeEmoji}</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  +{ach.pointsReward} ⭐
                </span>
              </div>
              <div>
                <h4 className="font-black text-xs text-slate-800 font-['Cairo',sans-serif]">
                  {ach.title}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to view full achievements */}
        {onOpenAchievements && (
          <div className="pt-1 text-center sm:text-right">
            <button
              onClick={() => {
                sound.playPop();
                onOpenAchievements();
              }}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-sm hover:shadow-md transition cursor-pointer inline-flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-white" />
              <span>استعرض جميع الإنجازات وشريط التقدم 🏆</span>
            </button>
          </div>
        )}
      </div>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <div className="space-y-6 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-['Cairo',sans-serif]">
          كيف يعمل التحدي في 3 خطوات بسيطة؟ 🐾
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-pink-200 shadow-xs space-y-3 relative overflow-hidden">
            <span className="w-8 h-8 rounded-full bg-pink-500 text-white font-black text-sm flex items-center justify-center">
              1
            </span>
            <div className="text-3xl">🤫</div>
            <h4 className="font-extrabold text-base text-slate-800 font-['Cairo',sans-serif]">
              أجب عن أسئلتك
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              اختر شخصيتك الكرتونية وحدد إجاباتك الحقيقية من بنك الأسئلة المرحة أو التحديات الجاهزة!
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-purple-200 shadow-xs space-y-3 relative overflow-hidden">
            <span className="w-8 h-8 rounded-full bg-purple-500 text-white font-black text-sm flex items-center justify-center">
              2
            </span>
            <div className="text-3xl">💌</div>
            <h4 className="font-extrabold text-base text-slate-800 font-['Cairo',sans-serif]">
              شارك الرابط والكود مع أصدقائك
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              بضغطة زر أرسل الرابط والكود في مجموعات واتساب أو تيليجرام ليدخل أصدقاؤك التحدي فوراً.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-amber-200 shadow-xs space-y-3 relative overflow-hidden">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center">
              3
            </span>
            <div className="text-3xl">🏆</div>
            <h4 className="font-extrabold text-base text-slate-800 font-['Cairo',sans-serif]">
              راقب الإجابات والنتائج فوراً!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              ستظهر لك درجاتهم وإجاباتهم التفصيلية سؤالاً بسؤال على لوحة المتصدرين المباشرة!
            </p>
          </div>
        </div>
      </div>

      {/* Enter Code Modal with "✕ خروج" */}
      {isEnterCodeModalOpen && (
        <EnterCodeModal
          onEnterQuiz={onEnterQuizCode}
          onStartPassAndPlay={(quizId) => onOpenPassAndPlay(quizId)}
          onClose={() => setIsEnterCodeModalOpen(false)}
        />
      )}
    </div>
  );
};
