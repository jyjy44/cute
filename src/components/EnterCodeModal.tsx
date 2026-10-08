import React, { useState } from 'react';
import { X, Search, Sparkles, AlertCircle, CheckCircle, KeyRound, ArrowRight } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { searchQuizByCode } from '../utils/api';
import { sound } from '../utils/sound';

interface Props {
  onEnterQuiz: (quizId: string) => void;
  onClose: () => void;
  onStartPassAndPlay?: (quizId: string) => void;
}

export const EnterCodeModal: React.FC<Props> = ({ onEnterQuiz, onClose, onStartPassAndPlay }) => {
  const [code, setCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundQuiz, setFoundQuiz] = useState<{
    id: string;
    code: string;
    creatorName: string;
    creatorCharacterId: string;
    title: string;
    totalQuestions: number;
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    let cleanCode = code.trim();
    if (cleanCode.includes('quiz=')) {
      const parts = cleanCode.split('quiz=');
      cleanCode = parts[1].split('&')[0];
    }

    setIsSearching(true);
    setError(null);
    setFoundQuiz(null);

    try {
      const result = await searchQuizByCode(cleanCode);
      if (result && result.found && result.quiz) {
        sound.playCorrect();
        setFoundQuiz(result.quiz);
      } else {
        sound.playWrong();
        setError('لم يتم العثور على تحدٍ بهذا الكود.. تأكد من كتابة الأرقام بشكل صحيح!');
      }
    } catch {
      setError('حدث خطأ أثناء البحث، يرجى المحاولة ثانية.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleEnterQuiz = () => {
    if (foundQuiz) {
      sound.playVictory();
      onEnterQuiz(foundQuiz.id);
      onClose();
    }
  };

  const handleEnterPassAndPlay = () => {
    if (foundQuiz && onStartPassAndPlay) {
      sound.playVictory();
      onStartPassAndPlay(foundQuiz.id);
      onClose();
    }
  };

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
      <div className="bg-white rounded-3xl max-w-md w-full border-4 border-purple-200 shadow-2xl p-6 relative space-y-5 animate-scale-up">
        {/* Prominent Exit Button (✕ خروج) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          aria-label="الخروج"
          className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 border-2 border-rose-300 flex items-center gap-1.5 shadow-md transition cursor-pointer font-black text-xs"
        >
          <X className="w-4 h-4 text-rose-600 stroke-[3]" />
          <span>خروج</span>
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-purple-700 shadow-xs">
            <KeyRound className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-800 font-['Cairo',sans-serif]">
            كتابة كود التحدي 🔑
          </h3>
          <p className="text-xs text-slate-600">
            أدخل كود التحدي الذي أرسله لك صديقك (مثال: 74921) لدخول التحدي ومواجهته فوراً!
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
                setFoundQuiz(null);
              }}
              placeholder="اكتب الكود هنا (مثال: 74921)..."
              autoFocus
              className="w-full px-4 py-3.5 rounded-2xl bg-purple-50/50 border-2 border-purple-300 focus:border-purple-600 focus:bg-white text-base font-black text-slate-800 text-center tracking-widest outline-hidden transition shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || !code.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>{isSearching ? 'جارٍ البحث عن التحدي...' : 'بحث وتأكيد الكود 🔍'}</span>
          </button>
        </form>

        {/* Error Feedback */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2 animate-fade-in text-right">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Found Quiz Preview Card */}
        {foundQuiz && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-4 border-2 border-emerald-300 shadow-sm space-y-3 animate-scale-up text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>تم العثور على التحدي! 🎉</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <CharacterAvatar characterId={foundQuiz.creatorCharacterId} size="md" expression="celebrating" />
              <div className="text-right">
                <h4 className="text-sm font-black text-slate-800 font-['Cairo',sans-serif]">
                  {foundQuiz.title}
                </h4>
                <p className="text-xs text-purple-700 font-bold">
                  صديقك: {foundQuiz.creatorName} ({foundQuiz.totalQuestions} أسئلة)
                </p>
                <span className="text-[10px] text-slate-400 font-mono font-bold">
                  الكود: #{foundQuiz.code}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnterQuiz}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>دخول تحدي {foundQuiz.creatorName} الآن! 🚀</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
