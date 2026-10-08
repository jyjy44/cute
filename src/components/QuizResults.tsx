import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, Sparkles, MessageCircle, Share2, PlusCircle, RotateCcw, Check, X, Heart } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { getCharacterById } from '../data/characters';
import { sound } from '../utils/sound';

interface Props {
  submission: {
    friendName: string;
    characterId: string;
    score: number;
    totalQuestions: number;
    percentage: number;
    answers: {
      questionId: string;
      selectedOptionId: string;
      correctOptionId?: string;
      isCorrect: boolean;
    }[];
    friendComment?: string;
  };
  quizDetails: {
    creatorName: string;
    creatorCharacterId: string;
    questions: {
      questionId: string;
      questionText: string;
      emoji: string;
      options: { id: string; text: string; emoji: string }[];
      correctOptionId: string;
    }[];
  };
  pointsEarned?: number;
  onPlayAgain?: () => void;
  onCreateOwnQuiz: () => void;
  onViewLeaderboard: () => void;
  onOpenAchievements?: () => void;
}

export const QuizResults: React.FC<Props> = ({
  submission,
  quizDetails,
  pointsEarned,
  onPlayAgain,
  onCreateOwnQuiz,
  onViewLeaderboard,
  onOpenAchievements,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const { score, totalQuestions, percentage, friendName, characterId } = submission;
  const { creatorName, creatorCharacterId, questions } = quizDetails;

  const friendChar = getCharacterById(characterId);
  const creatorChar = getCharacterById(creatorCharacterId);

  // Determine friendship tier & rank
  const getFriendshipRank = () => {
    if (percentage === 100) {
      return {
        title: 'توأم الروح الأسطوري! 🏆💖',
        description: `أنت تعرف كل صغيرة وكبيرة عن ${creatorName}! كأنكما تقرآن أفكار بعضكما!`,
        badgeColor: 'bg-rose-100 text-rose-700 border-rose-300',
        expression: 'celebrating' as const,
      };
    }
    if (percentage >= 75) {
      return {
        title: 'أعز الأصدقاء المقربين! ⭐',
        description: `صداقتكما قوية جداً! تعرف معظم أسرار وعادات ${creatorName} ببراعة!`,
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        expression: 'happy' as const,
      };
    }
    if (percentage >= 50) {
      return {
        title: 'صديق وفيّ ولطيف! 🌸',
        description: `بداية رائعة! تعرف أشياء مميزة عن ${creatorName} لكن هناك مفاجآت لم تكتشفها بعد!`,
        badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
        expression: 'happy' as const,
      };
    }
    return {
      title: 'تحتاج لقضاء وقت أطول معاً! 😂🍕',
      description: `يبدو أنك تحتاج لجلسة قهوة وسوالف طويلة مع ${creatorName} لتتعرف عليه أكثر!`,
      badgeColor: 'bg-sky-100 text-sky-700 border-sky-300',
      expression: 'surprised' as const,
    };
  };

  const rank = getFriendshipRank();

  // Run celebration confetti on mount
  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#38bdf8'],
      });
    } catch {
      // Ignored
    }
  }, []);

  const handleShareToWhatsApp = () => {
    sound.playPop();
    const text = `🎉 مرحباً يا ${creatorName}! أنهيت تحدي الصداقة الكيوت الخاص بك وحصلت على ${score} من ${totalQuestions} (${percentage}%)! 🐾\nلقب صداقتنا: "${rank.title}"! هل ترى كيف أعرفك؟ 💖`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6 animate-fade-in">
      {/* MAIN RESULT CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-pink-200 shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Cute background circles */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-100 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-100 rounded-full blur-xl pointer-events-none"></div>

        {/* Mascots together: Creator + Friend */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex flex-col items-center">
            <CharacterAvatar characterId={creatorCharacterId} size="lg" expression={rank.expression} />
            <span className="text-xs font-bold text-pink-600 mt-1">{creatorName}</span>
          </div>

          <div className="text-2xl animate-pulse">💖</div>

          <div className="flex flex-col items-center">
            <CharacterAvatar characterId={characterId} size="lg" expression="celebrating" />
            <span className="text-xs font-bold text-purple-600 mt-1">{friendName}</span>
          </div>
        </div>

        {/* Score & Rank */}
        <div className="space-y-3">
          <div className={`inline-block px-4 py-1.5 rounded-full border-2 text-sm font-black ${rank.badgeColor}`}>
            {rank.title}
          </div>

          {pointsEarned !== undefined && (
            <div>
              <button
                type="button"
                onClick={onOpenAchievements}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-900 font-black text-xs cursor-pointer shadow-xs transition"
              >
                <span className="text-amber-500 text-sm">⭐</span>
                <span>كسبت +{pointsEarned} نقطة صداقة جديدة!</span>
                {onOpenAchievements && <span className="text-[10px] text-amber-700 underline mr-1">استعراض الإنجازات</span>}
              </button>
            </div>
          )}

          <div className="text-4xl sm:text-5xl font-black text-slate-800 font-['Cairo',sans-serif]">
            {score} <span className="text-2xl text-slate-400 font-normal">من</span> {totalQuestions}
          </div>

          <div className="w-48 mx-auto bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-xs font-bold text-pink-600">نسبة التطابق: {percentage}%</p>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {rank.description}
          </p>
        </div>

        {/* Quick CTA to boast on WhatsApp */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleShareToWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>أرسل نتيجتك لـ {creatorName} على واتساب 📲</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowCertificate(!showCertificate);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-5 h-5 text-purple-600" />
            <span>{showCertificate ? 'إخفاء الشهادة' : 'شهادة الصداقة الكيوت 📜'}</span>
          </button>
        </div>
      </div>

      {/* CUTE FRIENDSHIP CERTIFICATE (TOGGLEABLE) */}
      {showCertificate && (
        <div className="bg-gradient-to-br from-amber-50 via-pink-50 to-purple-50 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center space-y-4 relative animate-scale-up">
          <div className="absolute top-3 right-3 text-2xl">🎖️</div>
          <div className="absolute top-3 left-3 text-2xl">✨</div>
          <h3 className="text-xl sm:text-2xl font-black text-amber-900 font-['Cairo',sans-serif]">
            شهادة صداقة رسمية ومعتمدة 📜💖
          </h3>
          <p className="text-xs text-amber-800">
            يشهد هذا التحدي الكيوت بأن الصديق الرائع
          </p>
          <div className="text-2xl font-black text-purple-700 underline decoration-pink-300 underline-offset-4">
            {friendName}
          </div>
          <p className="text-xs text-slate-600">
            قد خاض بنجاح تحدي معرفة صديقه العزيز <strong className="text-pink-600">{creatorName}</strong> وحصل على درجة <strong className="text-amber-800">{score}/{totalQuestions}</strong> بمرتبة:
          </p>
          <div className="bg-white/80 p-3 rounded-2xl border border-amber-200 font-black text-sm text-amber-900 inline-block px-6">
            ✨ {rank.title} ✨
          </div>
          <p className="text-[11px] text-slate-400">
            تاريخ التحدي: {new Date().toLocaleDateString('ar-EG')}
          </p>
        </div>
      )}

      {/* DETAILED ANSWERS COMPARISON (What you picked vs what creator picked) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-md space-y-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <span>مقارنة إجاباتك بإجابات {creatorName} الحقيقية:</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-600">
            كشف الأسرار 🔍
          </span>
        </h3>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const friendAns = submission.answers.find((a) => a.questionId === q.questionId);
            const isCorrect = friendAns?.isCorrect;
            const chosenOption = q.options.find((o) => o.id === friendAns?.selectedOptionId);
            const correctOption = q.options.find((o) => o.id === q.correctOptionId);

            return (
              <div
                key={q.questionId}
                className={`p-4 rounded-2xl border-2 transition ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="font-extrabold text-xs sm:text-sm text-slate-800">
                      {q.questionText} {q.emoji}
                    </p>
                  </div>
                  {isCorrect ? (
                    <span className="text-emerald-700 text-xs font-bold flex items-center gap-1 shrink-0 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Check className="w-3.5 h-3.5" /> صحيحة
                    </span>
                  ) : (
                    <span className="text-rose-700 text-xs font-bold flex items-center gap-1 shrink-0 bg-rose-100 px-2 py-0.5 rounded-full">
                      <X className="w-3.5 h-3.5" /> خطأ
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">ما اخترته أنت:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <span>{chosenOption?.emoji}</span>
                      <span>{chosenOption?.text || 'لم يتم الاختيار'}</span>
                    </span>
                  </div>

                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-pink-500 block font-medium">إجابة {creatorName} الحقيقية:</span>
                    <span className="font-bold text-pink-700 flex items-center gap-1 mt-0.5">
                      <span>{correctOption?.emoji}</span>
                      <span>{correctOption?.text}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => {
            sound.playPop();
            onCreateOwnQuiz();
          }}
          className="py-3.5 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>أنشئ تحديك الخاص وتحدَّ أصدقاءك! 🚀</span>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onViewLeaderboard();
          }}
          className="py-3.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 border-2 border-amber-200 font-black text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Trophy className="w-5 h-5 text-amber-600" />
          <span>عرض لوحة نتائج الأصدقاء 🏆</span>
        </button>
      </div>
    </div>
  );
};
