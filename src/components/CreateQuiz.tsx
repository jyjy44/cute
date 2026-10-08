import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Check, ChevronLeft, ChevronRight, Plus, Trash2, ArrowRight, Heart, Star, KeyRound } from 'lucide-react';
import { CHARACTERS, getCharacterById } from '../data/characters';
import { DEFAULT_QUESTIONS, CATEGORIES } from '../data/defaultQuestions';
import { CharacterAvatar } from './CharacterAvatar';
import { Quiz, Question, QuizQuestionItem } from '../types';
import { UnifiedChallenge } from '../data/allChallenges';
import { triggerStarBurst } from './FlyingStarsCanvas';
import { createQuiz } from '../utils/api';
import { recordQuizCreated } from '../utils/userProfile';
import { sound } from '../utils/sound';

interface Props {
  onQuizCreated: (quiz: Quiz) => void;
  onCancel: () => void;
  initialChallenge?: UnifiedChallenge | null;
}

export const CreateQuiz: React.FC<Props> = ({ onQuizCreated, onCancel, initialChallenge }) => {
  // Wizard steps: 1: Info & Character, 2: Choose Questions, 3: Answer Your Questions
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State
  const [creatorName, setCreatorName] = useState('');
  const [selectedCharacterId, setSelectedCharacterId] = useState('basbous');
  const [quizTitle, setQuizTitle] = useState(() => initialChallenge?.title || '');

  // Step 2 State (Selected questions pool)
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>(() => {
    if (initialChallenge && initialChallenge.questions.length > 0) {
      return initialChallenge.questions;
    }
    // Pick 5 fun default questions to start with
    return DEFAULT_QUESTIONS.slice(0, 6);
  });

  // Custom question modal/builder
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customQuestionText, setCustomQuestionText] = useState('');
  const [customEmoji, setCustomEmoji] = useState('✨');
  const [customOption1, setCustomOption1] = useState('');
  const [customOption2, setCustomOption2] = useState('');
  const [customOption3, setCustomOption3] = useState('');
  const [customOption4, setCustomOption4] = useState('');

  // Step 3 State (Creator's own answers)
  const [creatorAnswers, setCreatorAnswers] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Active character
  const activeChar = getCharacterById(selectedCharacterId);

  // Toggle question selection
  const handleToggleQuestion = (q: Question) => {
    sound.playPop();
    const exists = selectedQuestions.some((item) => item.id === q.id);
    if (exists) {
      if (selectedQuestions.length <= 3) {
        alert('يُفضل اختيار 3 أسئلة على الأقل ليكون التحدي ممتعاً!');
        return;
      }
      setSelectedQuestions(selectedQuestions.filter((item) => item.id !== q.id));
      // Remove answer if previously selected
      const updatedAnswers = { ...creatorAnswers };
      delete updatedAnswers[q.id];
      setCreatorAnswers(updatedAnswers);
    } else {
      setSelectedQuestions([...selectedQuestions, q]);
    }
  };

  // Add custom question
  const handleAddCustomQuestion = () => {
    if (!customQuestionText.trim() || !customOption1.trim() || !customOption2.trim()) {
      alert('الرجاء كتابة نص السؤال وخيارين على الأقل!');
      return;
    }

    const newQ: Question = {
      id: `custom_${Date.now()}`,
      category: 'custom',
      question: customQuestionText.trim(),
      emoji: customEmoji || '✨',
      options: [
        { id: 'opt_1', text: customOption1.trim(), emoji: '🌸' },
        { id: 'opt_2', text: customOption2.trim(), emoji: '⭐' },
        ...(customOption3.trim() ? [{ id: 'opt_3', text: customOption3.trim(), emoji: '🍀' }] : []),
        ...(customOption4.trim() ? [{ id: 'opt_4', text: customOption4.trim(), emoji: '💖' }] : []),
      ],
    };

    sound.playCorrect();
    setSelectedQuestions([...selectedQuestions, newQ]);
    setShowCustomModal(false);
    setCustomQuestionText('');
    setCustomOption1('');
    setCustomOption2('');
    setCustomOption3('');
    setCustomOption4('');
  };

  // Handle creator choosing their answer for a question
  const handleSelectAnswer = (questionId: string, optionId: string, e?: React.MouseEvent) => {
    sound.playPop();
    if (e) {
      triggerStarBurst(e.clientX, e.clientY, 16);
    } else {
      triggerStarBurst(undefined, undefined, 16);
    }
    setCreatorAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Check if step 3 is fully answered
  const allAnswered = selectedQuestions.every((q) => Boolean(creatorAnswers[q.id]));
  const answeredCount = selectedQuestions.filter((q) => Boolean(creatorAnswers[q.id])).length;

  // Final submit
  const handleFinishQuiz = async () => {
    if (!allAnswered) {
      alert('الرجاء الإجابة عن جميع الأسئلة لتكون إجاباتك الحقيقية واضحة لأصدقائك!');
      return;
    }

    setIsSaving(true);
    sound.playVictory();

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#a78bfa', '#38bdf8', '#fbbf24', '#34d399'],
      });
    } catch {
      // Ignored
    }

    const formattedQuestions: QuizQuestionItem[] = selectedQuestions.map((q) => ({
      questionId: q.id,
      questionText: q.question,
      emoji: q.emoji,
      options: q.options,
      correctOptionId: creatorAnswers[q.id],
    }));

    try {
      const created = await createQuiz({
        creatorName: creatorName.trim(),
        creatorCharacterId: selectedCharacterId,
        title: quizTitle.trim() || `تحدي صداقة ${creatorName}`,
        questions: formattedQuestions,
      });

      const hasCustom = selectedQuestions.some((q) => q.category === 'custom');
      recordQuizCreated(hasCustom);

      onQuizCreated(created);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إنشاء التحدي، يُرجى المحاولة ثانية');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-fade-in">
      {/* Progress Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-2 border-pink-200 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-pink-100 text-pink-600 font-bold text-xs">
              الخطوة {step} من 3
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 font-['Cairo',sans-serif]">
              {step === 1 && 'اختر شخصيتك واسمك الكيوت 🐾'}
              {step === 2 && 'اختر أسئلة التحدي الممتعة 🎲'}
              {step === 3 && 'حدد إجاباتك الحقيقية التي سيتوقعها أصدقاؤك! 🤫'}
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onCancel();
            }}
            className="text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1 transition cursor-pointer"
          >
            إلغاء
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="w-full bg-pink-100 h-2.5 rounded-full overflow-hidden flex">
          <div
            className={`h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 ${
              step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
            }`}
          ></div>
        </div>
      </div>

      {/* STEP 1: Basic Info & Cartoon Character */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-md space-y-6 animate-scale-up">
          {/* Initial Challenge Template Banner */}
          {initialChallenge && (
            <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 p-3.5 rounded-2xl border-2 border-pink-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{initialChallenge.emoji}</span>
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-200 text-pink-800">
                    قالب التحدي المختار ✨
                  </span>
                  <h4 className="font-black text-xs sm:text-sm text-slate-800 font-['Cairo',sans-serif]">
                    {initialChallenge.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {initialChallenge.questions.length} أسئلة جاهزة وممتعة
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Active Mascot Display with speech bubble */}
          <div className="flex flex-col items-center justify-center pt-3 pb-2 text-center">
            <CharacterAvatar
              characterId={selectedCharacterId}
              size="xl"
              expression="happy"
              bubbleText={creatorName ? `أهلاً بك يا ${creatorName}! مستعدون للتحدي! 💖` : activeChar.quote}
            />
            <p className="mt-4 text-xs sm:text-sm font-bold text-purple-600 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200">
              {activeChar.title}
            </p>
          </div>

          {/* Name input */}
          <div className="space-y-2">
            <label className="block text-sm font-black text-slate-800">
              ما هو اسمك الجميل أو لقبك المفضل بين أصدقائك؟ <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="مثال: ريم، أحمد، نونة، بودي..."
              maxLength={25}
              className="w-full px-4 py-3.5 rounded-2xl bg-pink-50/60 border-2 border-pink-200 focus:border-pink-500 focus:bg-white text-slate-800 font-bold text-base outline-hidden transition"
            />
          </div>

          {/* Custom Quiz Title (Optional) */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              عنوان التحدي (اختياري)
            </label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder={creatorName ? `تحدي صداقة ${creatorName} الكيوت 🌟` : 'من يعرفني أكثر؟ اختبار الصداقة الحقيقية 💖'}
              maxLength={40}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-purple-400 focus:bg-white text-slate-800 text-sm outline-hidden transition"
            />
          </div>

          {/* Character Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-black text-slate-800">
              اختر شخصيتك الكرتونية اللطيفة التي ستمثلك في التحدي:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CHARACTERS.map((char) => {
                const isSelected = char.id === selectedCharacterId;
                return (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedCharacterId(char.id);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition cursor-pointer text-center relative ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50/80 shadow-md ring-2 ring-pink-300'
                        : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-pink-50/30'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <CharacterAvatar characterId={char.id} size="md" expression={isSelected ? 'happy' : 'idle'} />
                    <div className="w-full">
                      <p className="font-extrabold text-xs text-slate-800 truncate">{char.name}</p>
                      <p className="text-[10px] text-purple-600 font-bold mt-0.5 truncate">{char.superpower.split(' ')[0]} {char.superpower.split(' ')[1] || ''}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                if (!creatorName.trim()) {
                  sound.playWrong();
                  alert('الرجاء كتابة اسمك أولاً لنبدأ التحدي!');
                  return;
                }
                sound.playCorrect();
                setStep(2);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>المتابعة لاختيار الأسئلة</span>
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Questions */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-md space-y-6 animate-scale-up">
          {/* Header info */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-pink-50 p-4 rounded-2xl border border-pink-200">
            <div>
              <p className="text-sm font-black text-slate-800">
                الأسئلة المختارة حالياً: <span className="text-pink-600 text-lg">{selectedQuestions.length}</span>
              </p>
              <p className="text-xs text-slate-600">
                (ننصح باختيار ما بين 5 إلى 10 أسئلة لتحقيق أفضل تفاعل مع أصدقائك!)
              </p>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                setShowCustomModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سؤال مخصص من عندك</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-700'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Questions Grid */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {DEFAULT_QUESTIONS.filter(
              (q) => selectedCategory === 'all' || q.category === selectedCategory
            ).map((q) => {
              const isSelected = selectedQuestions.some((item) => item.id === q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => handleToggleQuestion(q)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50/70 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{q.emoji}</span>
                    <div>
                      <p className="font-extrabold text-sm text-slate-800">{q.question}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {q.options.map((o) => o.text).join(' • ')}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                      isSelected
                        ? 'bg-pink-500 text-white'
                        : 'border-2 border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setStep(1);
              }}
              className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            <button
              onClick={() => {
                if (selectedQuestions.length < 3) {
                  sound.playWrong();
                  alert('الرجاء اختيار 3 أسئلة على الأقل للمتابعة!');
                  return;
                }
                sound.playCorrect();
                setStep(3);
              }}
              className="px-7 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>المتابعة لتحديد إجاباتك الحقيقية</span>
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Answer Your Questions (Specify Correct Answers) */}
      {step === 3 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-md space-y-6 animate-scale-up">
          {/* Header indicator */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CharacterAvatar characterId={selectedCharacterId} size="sm" expression="thinking" />
              <div>
                <p className="font-extrabold text-sm text-purple-950">
                  حدد إجابتك الحقيقية لكل سؤال 🤫
                </p>
                <p className="text-xs text-purple-700">
                  هذه هي الإجابات التي يجب أن يخمنها أصدقاؤك للحصول على النقاط!
                </p>
              </div>
            </div>
            <div className="text-xs font-black px-3 py-1 bg-white rounded-full text-pink-600 border border-pink-200">
              {answeredCount} / {selectedQuestions.length} مجابة
            </div>
          </div>

          {/* List of questions to answer */}
          <div className="space-y-6">
            {selectedQuestions.map((q, qIndex) => {
              const currentAnswer = creatorAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-3xl border-2 transition ${
                    currentAnswer
                      ? 'border-pink-300 bg-pink-50/20'
                      : 'border-amber-200 bg-amber-50/30'
                  }`}
                >
                  <div className="flex items-start gap-2.5 mb-3.5">
                    <span className="w-7 h-7 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
                        <span>{q.question}</span>
                        <span>{q.emoji}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        اختر ما ينطبق عليك في الواقع:
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt) => {
                      const isOptionSelected = currentAnswer === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={(e) => handleSelectAnswer(q.id, opt.id, e)}
                          className={`p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-right flex items-center justify-between gap-2 transition cursor-pointer ${
                            isOptionSelected
                              ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                              : 'border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{opt.emoji}</span>
                            <span>{opt.text}</span>
                          </span>
                          {isOptionSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Actions */}
          <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => {
                sound.playClick();
                setStep(2);
              }}
              className="px-5 py-2.5 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition cursor-pointer flex items-center gap-1.5"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الرجوع للأسئلة</span>
            </button>

            <div className="flex flex-col sm:items-end gap-1.5 w-full sm:w-auto">
              <button
                disabled={!allAnswered || isSaving}
                onClick={handleFinishQuiz}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition cursor-pointer shadow-lg w-full sm:w-auto ${
                  allAnswered && !isSaving
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-200 hover:shadow-xl'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                <KeyRound className="w-5 h-5 text-amber-200" />
                <span>
                  {isSaving ? 'جارٍ إنشاء كود التحدي وحفظ الإجابات... ⏳' : 'إنشاء كود التحدي ورابط المشاركة! 🔑🚀'}
                </span>
              </button>
              <p className="text-[11px] text-slate-500 text-center sm:text-left font-medium">
                بمجرد الإجابة، ستحصل فوراً على كود التحدي الخاص بك للبحث والمشاركة! 🐾
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Question Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-4 border-purple-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-purple-700 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>إضافة سؤالك الخاص والمميز</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                نص السؤال:
              </label>
              <input
                type="text"
                value={customQuestionText}
                onChange={(e) => setCustomQuestionText(e.target.value)}
                placeholder="مثال: ما هو أكثر شيء يضحكني في الجلسات؟"
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-purple-200 focus:border-purple-500 text-sm font-bold outline-hidden"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                الخيارات المتاحة (اكتب خيارين على الأقل):
              </label>
              <input
                type="text"
                value={customOption1}
                onChange={(e) => setCustomOption1(e.target.value)}
                placeholder="الخيار الأول *"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-hidden focus:border-purple-400"
              />
              <input
                type="text"
                value={customOption2}
                onChange={(e) => setCustomOption2(e.target.value)}
                placeholder="الخيار الثاني *"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-hidden focus:border-purple-400"
              />
              <input
                type="text"
                value={customOption3}
                onChange={(e) => setCustomOption3(e.target.value)}
                placeholder="الخيار الثالث (اختياري)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-hidden focus:border-purple-400"
              />
              <input
                type="text"
                value={customOption4}
                onChange={(e) => setCustomOption4(e.target.value)}
                placeholder="الخيار الرابع (اختياري)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium outline-hidden focus:border-purple-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddCustomQuestion}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                إضافة السؤال الآن ✨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
