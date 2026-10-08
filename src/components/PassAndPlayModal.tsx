import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Users, ArrowRight, Check, Sparkles, RefreshCw, Search, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { CHARACTERS } from '../data/characters';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';
import { ALL_PREMADE_CHALLENGES } from '../data/allChallenges';
import { Question } from '../types';
import { sound } from '../utils/sound';
import { triggerStarBurst } from './FlyingStarsCanvas';
import { fetchQuizForPlay, searchQuizByCode } from '../utils/api';
import { recordPassAndPlayGame } from '../utils/userProfile';

interface Props {
  onClose: () => void;
  onGameFinished?: (result: { pointsEarned: number; newAchievements: any[] }) => void;
  initialQuizId?: string | null;
}

export const PassAndPlayModal: React.FC<Props> = ({ onClose, onGameFinished, initialQuizId }) => {
  // Phase 1: Setup players (P1 Name & Mascot, P2 Name & Mascot)
  // Phase 2: Player 1 answers secretly
  // Phase 3: Handover screen ("أعطِ الهاتف لـ...")
  // Phase 4: Player 2 guesses
  // Phase 5: Showdown results!
  const [phase, setPhase] = useState<'setup' | 'p1_answer' | 'handover' | 'p2_guess' | 'result'>('setup');

  const [p1Name, setP1Name] = useState('سارة');
  const [p1Char, setP1Char] = useState('basbous');
  const [p2Name, setP2Name] = useState('نور');
  const [p2Char, setP2Char] = useState('arnoub');

  const [questions, setQuestions] = useState<Question[]>(() => DEFAULT_QUESTIONS.slice(0, 5));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Code search inside Face-to-Face modal
  const [codeQuery, setCodeQuery] = useState('');
  const [isSearchingCode, setIsSearchingCode] = useState(false);
  const [codeSearchError, setCodeSearchError] = useState<string | null>(null);
  const [loadedChallengeName, setLoadedChallengeName] = useState<string | null>(null);

  const [p1Answers, setP1Answers] = useState<Record<string, string>>({});
  const [p2Answers, setP2Answers] = useState<Record<string, string>>({});

  // Auto-load initialQuizId if passed from code search
  useEffect(() => {
    if (initialQuizId) {
      loadQuizById(initialQuizId);
    }
  }, [initialQuizId]);

  const loadQuizById = async (idOrCode: string) => {
    setIsSearchingCode(true);
    setCodeSearchError(null);
    try {
      const qz = await fetchQuizForPlay(idOrCode);
      if (qz && qz.questions && qz.questions.length > 0) {
        sound.playCorrect();
        const convertedQuestions: Question[] = qz.questions.map((item) => ({
          id: item.questionId,
          category: 'shared',
          question: item.questionText,
          emoji: item.emoji || '✨',
          options: item.options,
        }));
        setQuestions(convertedQuestions);
        setP1Name(qz.creatorName);
        setP1Char(qz.creatorCharacterId || 'basbous');
        setLoadedChallengeName(`${qz.title} (كود #${qz.code || qz.id.replace('quiz_', '')})`);
      } else {
        sound.playWrong();
        setCodeSearchError('لم نتمكن من العثور على التحدي بهذا الكود.');
      }
    } catch {
      setCodeSearchError('حدث خطأ أثناء تحميل التحدي.');
    } finally {
      setIsSearchingCode(false);
    }
  };

  const handleSearchCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeQuery.trim()) return;
    await loadQuizById(codeQuery.trim());
  };

  const currentQ = questions[currentIndex] || questions[0];

  const handleStartP1 = () => {
    if (!p1Name.trim() || !p2Name.trim()) {
      alert('الرجاء كتابة اسم الصديقين!');
      return;
    }
    sound.playCorrect();
    setCurrentIndex(0);
    setPhase('p1_answer');
  };

  const handleP1Pick = (optionId: string) => {
    sound.playPop();
    triggerStarBurst(undefined, undefined, 16);
    const updated = { ...p1Answers, [currentQ.id]: optionId };
    setP1Answers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed P1 answers, go to handover
      sound.playCorrect();
      setPhase('handover');
    }
  };

  const handleStartP2 = () => {
    sound.playCorrect();
    setCurrentIndex(0);
    setPhase('p2_guess');
  };

  const handleP2Pick = (optionId: string) => {
    sound.playPop();
    triggerStarBurst(undefined, undefined, 16);
    const updated = { ...p2Answers, [currentQ.id]: optionId };
    setP2Answers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Finished all guesses!
      sound.playVictory();
      try {
        confetti({ particleCount: 90, spread: 70 });
      } catch {}

      // Calculate final score
      let localScore = 0;
      questions.forEach((q) => {
        if (p1Answers[q.id] === (q.id === currentQ.id ? optionId : p2Answers[q.id])) {
          localScore++;
        }
      });

      const { pointsEarned, newAchievements } = recordPassAndPlayGame(localScore, questions.length);
      if (onGameFinished) {
        onGameFinished({ pointsEarned, newAchievements });
      }

      setPhase('result');
    }
  };

  // Calculate score for result view
  let score = 0;
  questions.forEach((q) => {
    if (p1Answers[q.id] === p2Answers[q.id]) score++;
  });
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border-4 border-purple-200 shadow-2xl p-5 sm:p-6 relative max-h-[92vh] overflow-y-auto">
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

        {/* SETUP PHASE */}
        {phase === 'setup' && (
          <div className="space-y-5 text-center pt-2">
            <div className="inline-block">
              <CharacterAvatar characterId="shoushou" size="lg" expression="celebrating" />
            </div>
            <div>
              <h3 className="text-xl font-black text-purple-700 font-['Cairo',sans-serif]">
                تحدي وجهاً لوجه! 👥🔥
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                صديقان أو حبيبين على نفس الهاتف: الأول يجيب بسريّة، ثم يعطي الهاتف للثاني ليخمن إجاباته!
              </p>
            </div>

            {/* HEAD-TO-HEAD CODE FINDER BOX */}
            <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 p-4 rounded-2xl border-2 border-purple-300 text-right space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-purple-600" />
                  <span>البحث عن كود تحدي للعب به وجهاً لوجه 🔑</span>
                </span>
                {loadedChallengeName && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    تم التحميل!
                  </span>
                )}
              </div>

              <form onSubmit={handleSearchCode} className="flex gap-2">
                <input
                  type="text"
                  value={codeQuery}
                  onChange={(e) => {
                    setCodeQuery(e.target.value);
                    setCodeSearchError(null);
                  }}
                  placeholder="أدخل كود التحدي (مثال: 74921)..."
                  className="w-full px-3 py-2 bg-white rounded-xl border border-purple-200 text-xs font-black text-slate-800 outline-hidden"
                />
                <button
                  type="submit"
                  disabled={isSearchingCode || !codeQuery.trim()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black transition cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isSearchingCode ? 'تحميل...' : 'بحث 🔍'}</span>
                </button>
              </form>

              {codeSearchError && (
                <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-[11px] font-bold text-rose-700 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{codeSearchError}</span>
                </div>
              )}

              {loadedChallengeName && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>جاهز: {loadedChallengeName} ({questions.length} أسئلة)</span>
                </div>
              )}
            </div>

            {/* Players Setup */}
            <div className="grid grid-cols-2 gap-3 text-right">
              {/* Player 1 */}
              <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 space-y-2">
                <span className="text-xs font-black text-pink-600">المتحدي الأول (المُجيب)</span>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-pink-300 text-xs font-bold"
                  placeholder="الاسم الأول"
                />
                <div className="flex justify-center">
                  <CharacterAvatar characterId={p1Char} size="sm" />
                </div>
              </div>

              {/* Player 2 */}
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                <span className="text-xs font-black text-purple-600">المتحدي الثاني (المُخمّن)</span>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-purple-300 text-xs font-bold"
                  placeholder="الاسم الثاني"
                />
                <div className="flex justify-center">
                  <CharacterAvatar characterId={p2Char} size="sm" />
                </div>
              </div>
            </div>

            <button
              onClick={handleStartP1}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-md transition cursor-pointer"
            >
              ابدأ الآن: دور {p1Name} للإجابة بسريّة 🤫
            </button>
          </div>
        )}

        {/* P1 ANSWERING */}
        {phase === 'p1_answer' && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-black px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
                دور {p1Name} للإجابة (سري! 🤫)
              </span>
              <p className="text-xs text-slate-400 mt-1">السؤال {currentIndex + 1} من {questions.length}</p>
            </div>

            <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-200 text-center">
              <span className="text-2xl">{currentQ.emoji}</span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                {currentQ.question}
              </h4>
            </div>

            <div className="space-y-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleP1Pick(opt.id)}
                  className="w-full p-3 rounded-xl border-2 border-slate-200 hover:border-pink-400 hover:bg-pink-50/40 text-right font-bold text-xs sm:text-sm flex items-center justify-between transition cursor-pointer"
                >
                  <span>{opt.emoji} {opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* HANDOVER SCREEN */}
        {phase === 'handover' && (
          <div className="py-8 text-center space-y-5 animate-scale-up">
            <div className="inline-block relative">
              <CharacterAvatar characterId={p2Char} size="xl" expression="celebrating" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-purple-700 font-['Cairo',sans-serif]">
                حان الوقت يا {p2Name}! 📱👀
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-xs mx-auto">
                لقد أجاب <strong className="text-pink-600">{p1Name}</strong> عن كل الأسئلة بسريّة!
                مرر الهاتف الآن لـ <strong className="text-purple-600">{p2Name}</strong> ليخمن إجاباته!
              </p>
            </div>
            <button
              onClick={handleStartP2}
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-sm rounded-2xl shadow-lg cursor-pointer"
            >
              أنا {p2Name}، وجاهز للتخمين! 🎯
            </button>
          </div>
        )}

        {/* P2 GUESSING */}
        {phase === 'p2_guess' && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-black px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                دور {p2Name} لتخمين إجابة {p1Name} 🎯
              </span>
              <p className="text-xs text-slate-400 mt-1">السؤال {currentIndex + 1} من {questions.length}</p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 text-center">
              <span className="text-2xl">{currentQ.emoji}</span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 mt-1">
                {currentQ.question}
              </h4>
            </div>

            <div className="space-y-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleP2Pick(opt.id)}
                  className="w-full p-3 rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-right font-bold text-xs sm:text-sm flex items-center justify-between transition cursor-pointer"
                >
                  <span>{opt.emoji} {opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="text-center space-y-4 pt-2">
            <div className="flex justify-center gap-4">
              <CharacterAvatar characterId={p1Char} size="md" />
              <span className="text-2xl my-auto">💖</span>
              <CharacterAvatar characterId={p2Char} size="md" expression="celebrating" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-purple-800">
                النتيجة: {score} من {questions.length}!
              </h3>
              <p className="text-xs font-bold text-pink-600 mt-0.5">
                نسبة التوافق: {percentage}%
              </p>
            </div>

            <div className="space-y-2 text-right max-h-52 overflow-y-auto pr-1">
              {questions.map((q) => {
                const match = p1Answers[q.id] === p2Answers[q.id];
                const opt1 = q.options.find((o) => o.id === p1Answers[q.id]);
                const opt2 = q.options.find((o) => o.id === p2Answers[q.id]);

                return (
                  <div
                    key={q.id}
                    className={`p-2.5 rounded-xl border text-xs ${
                      match ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                    }`}
                  >
                    <p className="font-bold text-slate-800">{q.question}</p>
                    <div className="flex justify-between text-[11px] mt-1 text-slate-600">
                      <span>إجابة {p1Name}: {opt1?.text}</span>
                      <span>تخمين {p2Name}: {opt2?.text}</span>
                      <span>{match ? '✅ توافق!' : '❌ اختلاف'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                sound.playPop();
                setPhase('setup');
                setP1Answers({});
                setP2Answers({});
              }}
              className="w-full py-3 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              إعادة التحدي بجولة جديدة 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
