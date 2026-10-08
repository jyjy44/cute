import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw, Share2, Eye, ChevronDown, ChevronUp, Check, X, Clock, MessageSquare, Sparkles, UserX, Award } from 'lucide-react';
import { Quiz, FriendSubmission } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { getCharacterById } from '../data/characters';
import { fetchQuizResults, getLocalQuizzes, buildShareUrl } from '../utils/api';
import { sound } from '../utils/sound';

interface Props {
  initialQuizId?: string | null;
  onOpenShareModal: (quiz: Quiz) => void;
  onCreateNewQuiz: () => void;
}

export const Leaderboard: React.FC<Props> = ({
  initialQuizId,
  onOpenShareModal,
  onCreateNewQuiz,
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(initialQuizId || null);
  const [activeQuizData, setActiveQuizData] = useState<{
    quizId: string;
    creatorName: string;
    creatorCharacterId: string;
    title: string;
    questions: Quiz['questions'];
    submissions: FriendSubmission[];
    totalQuestions: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<string | null>(null);

  // Load creator's quizzes list from localStorage
  useEffect(() => {
    const list = getLocalQuizzes();
    setQuizzes(list);
    if (!selectedQuizId && list.length > 0) {
      setSelectedQuizId(list[0].id);
    }
  }, []);

  // Fetch results for the selected quiz
  const loadResults = async (quizId: string, showSpinner = true) => {
    if (showSpinner) setIsLoading(true);
    try {
      const data = await fetchQuizResults(quizId);
      if (data) {
        setActiveQuizData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (showSpinner) setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedQuizId) {
      loadResults(selectedQuizId, true);
    }
  }, [selectedQuizId]);

  // Auto-refresh interval (polling for new friend answers every 6 seconds)
  useEffect(() => {
    if (!autoRefresh || !selectedQuizId) return;
    const interval = setInterval(() => {
      loadResults(selectedQuizId, false);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoRefresh, selectedQuizId]);

  const handleManualRefresh = () => {
    if (!selectedQuizId) return;
    sound.playPop();
    loadResults(selectedQuizId, true);
  };

  const toggleExpand = (subId: string) => {
    sound.playClick();
    setExpandedSubmissionId((prev) => (prev === subId ? null : subId));
  };

  const currentQuiz = quizzes.find((q) => q.id === selectedQuizId);

  // If no quizzes exist yet in history
  if (quizzes.length === 0 && !activeQuizData) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center animate-fade-in">
        <div className="bg-white rounded-3xl p-8 border-2 border-pink-200 shadow-xl space-y-5">
          <CharacterAvatar characterId="basbous" size="xl" expression="thinking" bubbleText="لم تنشئ أي تحدٍ بعد!" />
          <h2 className="text-2xl font-black text-slate-800 font-['Cairo',sans-serif]">
            لوحة نتائج وتحديات الأصدقاء
          </h2>
          <p className="text-sm text-slate-600">
            أنشئ أول تحدٍ لك، وأجب عن أسئلتك، ثم شارك الرابط مع أصدقائك لمتابعة إجاباتهم ودرجاتهم هنا مباشرة!
          </p>
          <button
            onClick={() => {
              sound.playPop();
              onCreateNewQuiz();
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-base rounded-2xl shadow-lg transition cursor-pointer"
          >
            إنشاء تحدي جديد الآن 🚀
          </button>
        </div>
      </div>
    );
  }

  const submissions = activeQuizData?.submissions || [];
  const totalSubmissions = submissions.length;
  const bestScore = totalSubmissions > 0 ? Math.max(...submissions.map((s) => s.score)) : 0;
  const averagePercentage =
    totalSubmissions > 0
      ? Math.round(submissions.reduce((acc, s) => acc + s.percentage, 0) / totalSubmissions)
      : 0;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6 animate-fade-in">
      {/* Top Header & Quiz Selector */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
              لوحة التحكم والمراقبة المباشرة 📊
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-1 font-['Cairo',sans-serif]">
              إجابات الأصدقاء والنتائج النهائية
            </h2>
          </div>

          {/* Refresh controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                autoRefresh
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              {autoRefresh ? 'تحديث تلقائي: نشط 🟢' : 'تحديث يدوي ⚪'}
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 transition cursor-pointer"
              title="تحديث النتائج الآن"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quizzes Switcher Tabs if user created more than one */}
        {quizzes.length > 1 && (
          <div className="pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-500 block mb-1.5">
              اختر التحدي المراد مراقبته:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {quizzes.map((q) => {
                const isSelected = q.id === selectedQuizId;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedQuizId(q.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-pink-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-pink-50'
                    }`}
                  >
                    <span>{q.title}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10">
                      {q.submissions?.length || 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border-2 border-pink-200 text-center shadow-xs">
          <p className="text-xs text-slate-500 font-bold">الأصدقاء المشاركون</p>
          <p className="text-2xl sm:text-3xl font-black text-pink-600 mt-1">{totalSubmissions}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 text-center shadow-xs">
          <p className="text-xs text-slate-500 font-bold">أعلى نتيجة</p>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
            {totalSubmissions > 0 ? `${bestScore}/${activeQuizData?.totalQuestions}` : '-'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-purple-200 text-center shadow-xs">
          <p className="text-xs text-slate-500 font-bold">متوسط الدقة</p>
          <p className="text-2xl sm:text-3xl font-black text-purple-600 mt-1">
            {totalSubmissions > 0 ? `${averagePercentage}%` : '-'}
          </p>
        </div>
      </div>

      {/* SUBMISSIONS LIST */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>ترتيب الأصدقاء حسب معرفتهم بك:</span>
          </h3>

          {currentQuiz && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 font-mono flex items-center gap-1 shadow-xs">
                <span>🔑 كود التحدي:</span>
                <span className="text-sm font-black text-pink-600 tracking-wider">
                  {currentQuiz.code || currentQuiz.id.replace('quiz_', '')}
                </span>
              </span>
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenShareModal(currentQuiz);
                }}
                className="text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">مشاركة الكود والرابط</span>
              </button>
            </div>
          )}
        </div>

        {/* If no friends answered yet */}
        {totalSubmissions === 0 ? (
          <div className="py-10 text-center space-y-3 bg-pink-50/40 rounded-2xl border border-dashed border-pink-200">
            <CharacterAvatar characterId="arnoub" size="lg" expression="idle" />
            <h4 className="font-extrabold text-slate-700 text-base">
              لم يُجب أي من أصدقائك بعد! 🐾
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              شارك رابط التحدي الآن في مجموعات الواتساب أو تيليجرام وانتظر إجاباتهم لتراها هنا فوراً!
            </p>
            {currentQuiz && (
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenShareModal(currentQuiz);
                }}
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                شارك رابط التحدي الآن 💌
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {submissions
              .sort((a, b) => b.score - a.score || b.percentage - a.percentage)
              .map((sub, index) => {
                const isExpanded = expandedSubmissionId === sub.id;
                const char = getCharacterById(sub.characterId);
                const medal =
                  index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;

                return (
                  <div
                    key={sub.id}
                    className={`rounded-2xl border-2 transition overflow-hidden ${
                      index === 0
                        ? 'border-amber-300 bg-amber-50/40'
                        : 'border-slate-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    {/* Friend Summary Row */}
                    <div
                      onClick={() => toggleExpand(sub.id)}
                      className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      {/* Rank & Friend Mascot & Name */}
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black w-6 text-center text-slate-700 shrink-0">
                          {medal}
                        </span>

                        <div className="relative shrink-0">
                          <CharacterAvatar
                            characterId={sub.characterId}
                            size="sm"
                            expression={sub.percentage >= 70 ? 'celebrating' : 'idle'}
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-sm text-slate-800">{sub.friendName}</h4>
                            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                              ({char.name})
                            </span>
                          </div>
                          {sub.friendComment && (
                            <p className="text-xs text-purple-600 font-medium italic mt-0.5 line-clamp-1 flex items-center gap-1">
                              <MessageSquare className="w-3 h-3 inline shrink-0" />
                              <span>"{sub.friendComment}"</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Score & View Answers Button */}
                      <div className="flex items-center gap-3">
                        <div className="text-left">
                          <div className="text-base font-black text-pink-600">
                            {sub.score} / {sub.totalQuestions}
                          </div>
                          <div className="text-[11px] font-bold text-slate-400">
                            {sub.percentage}% دقة
                          </div>
                        </div>

                        <button
                          type="button"
                          className="p-1.5 rounded-lg bg-pink-100/70 text-pink-700 text-xs font-bold flex items-center gap-1 hover:bg-pink-200 transition"
                        >
                          <span className="hidden sm:inline">
                            {isExpanded ? 'إخفاء الإجابات' : 'تفاصيل الإجابات'}
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* EXPANDED VIEW: Exactly what this friend answered for each question! */}
                    {isExpanded && activeQuizData && (
                      <div className="bg-pink-50/50 p-4 border-t border-pink-100 space-y-2.5 animate-fade-in">
                        <div className="text-xs font-extrabold text-slate-700 flex items-center justify-between pb-1 border-b border-pink-200/60">
                          <span>تفاصيل إجابات {sub.friendName} لكل سؤال:</span>
                          <span className="text-slate-400 font-normal">
                            {new Date(sub.completedAt).toLocaleTimeString('ar-EG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {activeQuizData.questions.map((q, qIndex) => {
                            const friendAns = sub.answers.find((a) => a.questionId === q.questionId);
                            const isCorrect = friendAns?.isCorrect;
                            const friendChosenOpt = q.options.find(
                              (o) => o.id === friendAns?.selectedOptionId
                            );
                            const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

                            return (
                              <div
                                key={q.questionId}
                                className={`p-3 rounded-xl border text-xs ${
                                  isCorrect
                                    ? 'bg-emerald-50/70 border-emerald-200'
                                    : 'bg-rose-50/70 border-rose-200'
                                }`}
                              >
                                <div className="flex items-center justify-between font-bold mb-1">
                                  <span className="text-slate-800">
                                    {qIndex + 1}. {q.questionText} {q.emoji}
                                  </span>
                                  {isCorrect ? (
                                    <span className="text-emerald-700 font-black flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" /> أصاب!
                                    </span>
                                  ) : (
                                    <span className="text-rose-700 font-black flex items-center gap-1">
                                      <X className="w-3.5 h-3.5" /> أخطأ!
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-[11px] mt-1 text-slate-600">
                                  <div>
                                    <span className="font-semibold text-slate-400">إجابة {sub.friendName}: </span>
                                    <span className="font-bold text-slate-800">
                                      {friendChosenOpt ? `${friendChosenOpt.emoji} ${friendChosenOpt.text}` : 'لم يختر'}
                                    </span>
                                  </div>

                                  {!isCorrect && (
                                    <div>
                                      <span className="font-semibold text-pink-500">إجابتك الحقيقية: </span>
                                      <span className="font-bold text-pink-700">
                                        {correctOpt ? `${correctOpt.emoji} ${correctOpt.text}` : '-'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
