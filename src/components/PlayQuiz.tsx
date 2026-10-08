import React, { useState } from 'react';
import { Sparkles, Check, ChevronLeft, ChevronRight, ArrowRight, Heart, User, MessageCircle, Swords, Zap, Calendar, Globe, Phone } from 'lucide-react';
import { Quiz, Option } from '../types';
import { CHARACTERS, getCharacterById } from '../data/characters';
import { CharacterAvatar, MascotExpression } from './CharacterAvatar';
import { CharacterBattleCard } from './CharacterBattleCard';
import { triggerStarBurst } from './FlyingStarsCanvas';
import { submitFriendAnswers } from '../utils/api';
import { sound } from '../utils/sound';

interface Props {
  quiz: Quiz;
  onQuizFinished: (resultData: {
    submission: any;
    quizDetails: {
      creatorName: string;
      creatorCharacterId: string;
      questions: Quiz['questions'];
    };
  }) => void;
  onGoHome: () => void;
}

export const PlayQuiz: React.FC<Props> = ({ quiz, onQuizFinished, onGoHome }) => {
  // Game states: 'intro' | 'playing' | 'submitting'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'submitting'>('intro');

  // Friend details
  const [friendName, setFriendName] = useState('');
  const [friendAge, setFriendAge] = useState('20');
  const [friendCountry, setFriendCountry] = useState('مصر 🇪🇬');
  const [friendPhone, setFriendPhone] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState('arnoub');
  const [friendComment, setFriendComment] = useState('');

  // Quiz progression
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [mascotExpression, setMascotExpression] = useState<MascotExpression>('happy');
  const [mascotBubble, setMascotBubble] = useState<string>('');

  const creatorChar = getCharacterById(quiz.creatorCharacterId);
  const friendChar = getCharacterById(selectedCharacterId);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  const handleStartGame = () => {
    if (!friendName.trim()) {
      sound.playWrong();
      alert('الرجاء كتابة اسمك أولاً لنعرف من هو الصديق البطل!');
      return;
    }
    sound.playCorrect();
    setGameState('playing');
    setMascotBubble(`أرنا مدى معرفتك بـ ${quiz.creatorName}! 🐾`);
  };

  const handleSelectOption = (optionId: string, e?: React.MouseEvent) => {
    sound.playPop();
    if (e) {
      triggerStarBurst(e.clientX, e.clientY, 16);
    } else {
      triggerStarBurst(undefined, undefined, 16);
    }

    const qId = currentQuestion.questionId;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }));

    // Cute random mascot reactions
    const cuteReactions = [
      'يا ترى هل هذا خيار صحيح؟ 🤔✨',
      'تخمين خطير وذكي! 🌟',
      'سنرى في نهاية التحدي! 💖',
      'هل تثق في إجابتك؟ 🐾⭐',
      'يا لها من إجابة مرحة! 😂✨',
    ];
    const randomBubble = cuteReactions[Math.floor(Math.random() * cuteReactions.length)];
    setMascotBubble(randomBubble);
    setMascotExpression('celebrating');

    setTimeout(() => {
      setMascotExpression('happy');
    }, 1200);
  };

  const handleNext = async () => {
    sound.playClick();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all questions, submit to backend!
      setGameState('submitting');
      sound.playCorrect();

      const formattedAnswers = quiz.questions.map((q) => ({
        questionId: q.questionId,
        selectedOptionId: selectedAnswers[q.questionId] || '',
      }));

      try {
        const result = await submitFriendAnswers(quiz.id, {
          friendName: friendName.trim(),
          characterId: selectedCharacterId,
          answers: formattedAnswers,
          friendComment: friendComment.trim() || undefined,
          friendAge: friendAge ? Number(friendAge) || friendAge : undefined,
          friendCountry: friendCountry || undefined,
          friendPhone: friendPhone.trim() || undefined,
        });

        onQuizFinished(result);
      } catch (err) {
        console.error(err);
        alert('حدث خطأ أثناء إرسال إجاباتك، يرجى إعادة المحاولة');
        setGameState('playing');
      }
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isCurrentAnswered = Boolean(selectedAnswers[currentQuestion?.questionId]);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 animate-fade-in">
      {/* INTRO SCREEN */}
      {gameState === 'intro' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl space-y-6 text-center animate-scale-up">
          {/* Creator greeting header */}
          <div className="inline-block relative">
            <CharacterAvatar
              characterId={quiz.creatorCharacterId}
              size="xl"
              expression="celebrating"
              bubbleText={`أهلاً بك! أنا ${quiz.creatorName}.. هل تعرفني حقاً؟ 🐾`}
            />
          </div>

          <div className="mt-2">
            <span className="text-xs font-black px-3.5 py-1 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
              تحدي الصداقة الكيوت 💖
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 font-['Cairo',sans-serif]">
              {quiz.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              أعدّ لك <span className="text-pink-600 font-bold">{quiz.creatorName}</span> {totalQuestions} أسئلة خاصة ومسلية عن حياته وتفضيلاته.. هل ستتوقع إجاباته الصحيحة؟
            </p>
          </div>

          {/* Friend info inputs */}
          <div className="space-y-4 text-right bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
            <div>
              <label className="block text-sm font-black text-slate-800 mb-1.5">
                ما هو اسمك الجميل؟ <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="اكتب اسمك هنا ليراه صاحب التحدي..."
                  maxLength={25}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-pink-200 focus:border-pink-500 text-slate-800 font-bold text-sm outline-hidden transition"
                />
              </div>
            </div>

            {/* Friend Age, Country, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-500" />
                  <span>العمر:</span>
                </label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={friendAge}
                  onChange={(e) => setFriendAge(e.target.value)}
                  placeholder="العمر (مثال: 20)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-purple-500" />
                  <span>البلد:</span>
                </label>
                <input
                  type="text"
                  value={friendCountry}
                  onChange={(e) => setFriendCountry(e.target.value)}
                  placeholder="البلد (مثال: مصر 🇪🇬)"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الهاتف (اختياري):</span>
                </label>
                <input
                  type="tel"
                  value={friendPhone}
                  onChange={(e) => setFriendPhone(e.target.value)}
                  placeholder="رقم الهاتف"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-pink-200 text-xs font-bold font-mono text-left"
                />
              </div>
            </div>

            {/* Friend Mascot picker */}
            <div>
              <label className="block text-sm font-black text-slate-800 mb-2">
                اختر شخصيتك الكرتونية لتتحدى بها شخصية {quiz.creatorName}:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CHARACTERS.map((c) => {
                  const isSelected = c.id === selectedCharacterId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setSelectedCharacterId(c.id);
                      }}
                      className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition cursor-pointer text-center ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-300 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/20'
                      }`}
                    >
                      <CharacterAvatar characterId={c.id} size="sm" expression={isSelected ? 'happy' : 'idle'} />
                      <div className="w-full">
                        <span className="text-xs font-black text-slate-800 block truncate">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-purple-600 font-medium block truncate">
                          {c.superpower.split(' ')[0]} {c.superpower.split(' ')[1] || ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LIVE BATTLE CARD PREVIEW */}
            <CharacterBattleCard
              creatorName={quiz.creatorName}
              creatorCharacterId={quiz.creatorCharacterId}
              friendName={friendName || 'أنت'}
              friendCharacterId={selectedCharacterId}
            />

            {/* Optional message for creator */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                صيحة التحدي أو تعليق لطيف لـ {quiz.creatorName} (اختياري):
              </label>
              <input
                type="text"
                value={friendComment}
                onChange={(e) => setFriendComment(e.target.value)}
                placeholder="مثال: جهز نفسك، شخصيتي ستكتشف كل أسرارك! 😎"
                maxLength={60}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:border-purple-400 text-xs font-bold outline-hidden"
              />
            </div>
          </div>

          {/* Start CTA */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Swords className="w-5 h-5" />
            <span>ابدأ مواجهة التحدي الآن! 🚀</span>
          </button>
        </div>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl space-y-6 animate-scale-up">
          {/* Top Compact Battle Bar */}
          <CharacterBattleCard
            creatorName={quiz.creatorName}
            creatorCharacterId={quiz.creatorCharacterId}
            friendName={friendName}
            friendCharacterId={selectedCharacterId}
            compact
          />

          {/* Progress bar and counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-600">
              <span className="flex items-center gap-1 text-pink-600">
                <span>السؤال {currentIndex + 1} من {totalQuestions}</span>
              </span>
              <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
            </div>
            <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Cute mascot cheerer */}
          <div className="flex items-center justify-center pt-2 pb-1">
            <CharacterAvatar
              characterId={selectedCharacterId}
              size="lg"
              expression={mascotExpression}
              bubbleText={mascotBubble}
            />
          </div>

          {/* Question Card */}
          <div className="text-center bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-6 rounded-3xl border-2 border-pink-200/80">
            <span className="text-3xl mb-2 inline-block animate-bounce">{currentQuestion.emoji}</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 font-['Cairo',sans-serif] leading-relaxed">
              {currentQuestion.questionText}
            </h3>
            <p className="text-xs text-purple-700 mt-1 font-bold">
              ماذا تظن أن {quiz.creatorName} قد اختار؟
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt: Option) => {
              const isSelected = selectedAnswers[currentQuestion.questionId] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={(e) => handleSelectOption(opt.id, e)}
                  className={`p-4 rounded-2xl border-2 font-bold text-sm text-right flex items-center justify-between gap-2 transition cursor-pointer ${
                    isSelected
                      ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg ring-2 ring-pink-300 scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50/50 text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-xl">{opt.emoji}</span>
                    <span>{opt.text}</span>
                  </span>
                  {isSelected && <Check className="w-5 h-5 shrink-0 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className={`px-7 py-3 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition cursor-pointer shadow-md ${
                isCurrentAnswered
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-200 hover:shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'إنهاء التحدي ورؤية النتيجة! 🏆' : 'السؤال التالي'}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SUBMITTING LOADING STATE */}
      {gameState === 'submitting' && (
        <div className="bg-white rounded-3xl p-10 border-2 border-pink-200 shadow-xl text-center space-y-4 animate-scale-up">
          <CharacterAvatar characterId={quiz.creatorCharacterId} size="xl" expression="celebrating" />
          <h3 className="text-xl font-black text-pink-600">جارٍ فحص إجاباتك ومقارنتها... ✨</h3>
          <p className="text-sm text-slate-500">سنرى الآن هل أنت توأم روح {quiz.creatorName} أم تحتاج لتركز أكثر! 🐾</p>
          <div className="w-32 mx-auto bg-pink-100 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-pink-500 animate-pulse w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};
