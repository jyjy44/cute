import React, { useState } from 'react';
import { Copy, Check, Share2, MessageCircle, Send, Trophy, Sparkles, X } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../utils/sound';
import { buildShareUrl } from '../utils/api';

interface Props {
  quizId: string;
  quizCode?: string;
  creatorName: string;
  creatorCharacterId: string;
  questionCount: number;
  onClose: () => void;
  onViewResults: () => void;
}

export const ShareModal: React.FC<Props> = ({
  quizId,
  quizCode,
  creatorName,
  creatorCharacterId,
  questionCount,
  onClose,
  onViewResults,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const actualCode = quizCode || quizId.replace('quiz_', '');
  const shareUrl = buildShareUrl(quizId);

  const inviteText = `🎉 مرحباً يا صديقي! دخلت تحدي الصداقة الكيوت الخاص بـ (${creatorName})! 🐾\n🔑 كود التحدي الخاص بي: ${actualCode}\n\nابحث بهذا الكود في الصفحة الرئيسية أو اضغط على الرابط المباشر:\n${shareUrl}`;

  const handleCopyCode = () => {
    sound.playCorrect();
    navigator.clipboard.writeText(actualCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyLink = () => {
    sound.playCorrect();
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyFullInvite = () => {
    sound.playCorrect();
    navigator.clipboard.writeText(inviteText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    sound.playPop();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteText)}`;
    window.open(url, '_blank');
  };

  const handleTelegramShare = () => {
    sound.playPop();
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
      `🎉 تحدي الصداقة الكيوت مع ${creatorName}! من يعرفني أكثر؟ 💖`
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border-4 border-pink-200 shadow-2xl p-6 relative overflow-hidden animate-scale-up">
        {/* Background cute blobs */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-pink-100 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-100 rounded-full blur-xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Mascot */}
        <div className="text-center mb-5">
          <div className="inline-block relative">
            <CharacterAvatar characterId={creatorCharacterId} size="lg" expression="celebrating" />
            <span className="absolute -top-1 -right-2 text-2xl animate-spin">🌟</span>
          </div>
          <h2 className="text-2xl font-black text-pink-600 mt-2 font-['Cairo',sans-serif]">
            تم تجهيز تحديك بنجاح! 🎉
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            شارك الرابط مع أصدقائك ليدخلوا التحدي ويخمنوا إجاباتك!
          </p>
        </div>

        {/* Challenge Preview Card */}
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 border-2 border-pink-200/80 rounded-2xl p-4 mb-5 text-center">
          <div className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-1">
            بطاقة التحدي الرسمية 💌
          </div>
          <p className="font-extrabold text-slate-800 text-base">
            تحدي صداقة <span className="text-pink-600 font-black">{creatorName}</span>
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            يحتوي على {questionCount} أسئلة ممتعة وغير متوقعة!
          </p>
        </div>

        {/* PROMINENT CHALLENGE CODE BOX */}
        <div className="bg-gradient-to-r from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-300 rounded-2xl p-4 text-center shadow-xs mb-5">
          <span className="text-xs font-black text-amber-900 block mb-1">
            كود التحدي الخاص بك للبحث والمشاركة 🔑
          </span>
          <div className="flex items-center justify-center gap-2">
            <div className="px-5 py-2.5 bg-white rounded-xl border-2 border-amber-400 font-mono text-2xl font-black text-amber-900 tracking-widest shadow-xs select-all">
              {actualCode}
            </div>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
            </button>
          </div>
          <p className="text-[11px] text-amber-800/80 mt-2 font-medium">
            أرسل هذا الكود لأصدقائك ليبحثوا به في التطبيق ويفتحوا تحديك مباشرة! 🚀
          </p>
        </div>

        {/* Link Input & Copy */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>أو شارك عبر الرابط المباشر:</span>
            {copiedLink && <span className="text-emerald-600 font-bold flex items-center gap-1">تم النسخ بنجاح! ✨</span>}
          </label>
          <div className="flex items-center gap-2 bg-slate-50 border-2 border-pink-200 rounded-2xl p-1.5 focus-within:border-pink-400 transition">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent px-3 py-1 text-xs sm:text-sm text-slate-700 font-mono outline-hidden select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'منسوخ' : 'نسخ'}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>مشاركة عبر واتساب</span>
          </button>

          <button
            onClick={handleTelegramShare}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>مشاركة عبر تيليجرام</span>
          </button>

          <button
            onClick={handleCopyFullInvite}
            className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs sm:text-sm transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>نسخ نص الدعوة الكامل مع الرابط 💌</span>
          </button>
        </div>

        {/* View Results Dashboard CTA */}
        <div className="border-t border-slate-100 pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onViewResults();
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Trophy className="w-5 h-5 text-amber-900" />
            <span>متابعة إجابات الأصدقاء والنتائج مباشرة! 🏆</span>
          </button>
        </div>
      </div>
    </div>
  );
};
