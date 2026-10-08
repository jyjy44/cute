import React, { useState } from 'react';
import { X, Sparkles, Check, Palette, User, Heart, Star, Edit3, Globe, Phone, Calendar } from 'lucide-react';
import { UserProfile } from '../types';
import { CHARACTERS, getCharacterById } from '../data/characters';
import { PROFILE_BACKGROUNDS, getProfileBackgroundById } from '../data/profileBackgrounds';
import { CharacterAvatar } from './CharacterAvatar';
import { getUserLevel } from '../data/achievements';
import { sound } from '../utils/sound';

interface Props {
  profile: UserProfile;
  onSave: (data: {
    name: string;
    characterId: string;
    bio: string;
    profileBackground: string;
    age: string;
    country: string;
    phoneNumber: string;
  }) => void;
  onClose: () => void;
}

const POPULAR_COUNTRIES = [
  'مصر 🇪🇬',
  'السعودية 🇸🇦',
  'الإمارات 🇦🇪',
  'المغرب 🇲🇦',
  'الأردن 🇯🇴',
  'العراق 🇮🇶',
  'الجزائر 🇩🇿',
  'تونس 🇹🇳',
  'الكويت 🇰🇼',
  'قطر 🇶🇦',
  'سلطنة عمان 🇴🇲',
  'فلسطين 🇵🇸',
  'لبنان 🇱🇧',
  'سوريا 🇸🇾',
  'اليمن 🇾🇪',
  'السودان 🇸🇩',
  'أخرى 🌍',
];

export const EditProfileModal: React.FC<Props> = ({ profile, onSave, onClose }) => {
  const [name, setName] = useState(profile.name || 'صديق جديد');
  const [characterId, setCharacterId] = useState(profile.characterId || 'basbous');
  const [bio, setBio] = useState(profile.bio || 'مستعد دائماً لتحديات الصداقة والمرح! 🐾✨');
  const [bgId, setBgId] = useState(profile.profileBackground || 'candy_pink');
  const [age, setAge] = useState(String(profile.age || '20'));
  const [country, setCountry] = useState(profile.country || 'مصر 🇪🇬');
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '');

  const selectedBg = getProfileBackgroundById(bgId);
  const selectedChar = getCharacterById(characterId);
  const levelInfo = getUserLevel(profile.points);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      sound.playWrong();
      alert('الرجاء كتابة اسمك!');
      return;
    }
    sound.playVictory();
    onSave({
      name: name.trim(),
      characterId,
      bio: bio.trim(),
      profileBackground: bgId,
      age: age.trim() || '20',
      country: country.trim() || 'مصر 🇪🇬',
      phoneNumber: phoneNumber.trim(),
    });
    onClose();
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
      <div className="bg-white rounded-3xl max-w-xl w-full border-4 border-pink-200 shadow-2xl p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto space-y-6">
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
        <div className="text-center space-y-1">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 inline-block">
            الملف الشخصي المتكامل 👤✨
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-['Cairo',sans-serif]">
            بيانات ملفك الشخصي وبطاقتك
          </h3>
          <p className="text-xs text-slate-500">
            حدد اسمك وعمرك وبلدك ورقم هاتفك ونبذتك ليظهر بروفايلك بأبهى حلة أمام الأصدقاء!
          </p>
        </div>

        {/* LIVE CARD PREVIEW */}
        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-700 block">
            معاينة بطاقتك الشخصية كما يراها أصدقاؤك:
          </label>
          <div
            className={`rounded-3xl p-5 sm:p-6 ${selectedBg.classes} shadow-lg border-2 border-white/80 text-center relative overflow-hidden transition-all duration-300`}
          >
            {/* Mascot & Name */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="relative">
                <CharacterAvatar characterId={characterId} size="lg" expression="celebrating" />
                <span className="absolute -bottom-1 -right-1 text-xl">{levelInfo.badge}</span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap">
                  <h4 className="text-xl font-black text-slate-900 drop-shadow-xs font-['Cairo',sans-serif]">
                    {name || 'اسمك الجميل'}
                  </h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/80 text-slate-800 border border-white">
                    مستوى {levelInfo.level}
                  </span>
                </div>

                {/* Extra info pills: Age, Country, Phone */}
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap text-[11px] font-bold text-slate-800/90 pt-0.5">
                  <span className="bg-white/70 px-2.5 py-0.5 rounded-full">
                    🎂 {age ? `${age} سنة` : 'العمر غير محدد'}
                  </span>
                  <span className="bg-white/70 px-2.5 py-0.5 rounded-full">
                    🌍 {country || 'البلد غير محدد'}
                  </span>
                  {phoneNumber && (
                    <span className="bg-white/70 px-2.5 py-0.5 rounded-full font-mono text-[10px]">
                      📱 {phoneNumber}
                    </span>
                  )}
                </div>

                {/* Short Bio */}
                <p className="text-xs bg-white/90 backdrop-blur-xs text-slate-800 px-3 py-1.5 rounded-xl font-medium mt-1 shadow-xs border border-white inline-block max-w-sm">
                  "{bio || 'لا توجد نبذة بعد...'}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM CONTROLS */}
        <form onSubmit={handleSubmit} className="space-y-4 text-right">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-700 block">
              الاسم الكامل أو اللقب المفضل: <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسمك هنا..."
              maxLength={25}
              required
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 font-bold text-sm outline-hidden transition"
            />
          </div>

          {/* Age & Country Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Age */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                <span>العمر (بالسنوات):</span>
              </label>
              <input
                type="number"
                min="5"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="مثال: 22"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 font-bold text-sm outline-hidden transition"
              />
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-700 block flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-purple-500" />
                <span>البلد أو الدولة:</span>
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 font-bold text-sm outline-hidden transition cursor-pointer"
              >
                {POPULAR_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-700 block flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>رقم الهاتف (للتواصل ومشاركة التحدي):</span>
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="مثال: +201012345678 أو 0501234567"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 font-bold text-sm outline-hidden transition text-left font-mono"
            />
          </div>

          {/* Short Bio Input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-700 block">
                نبذة تعريفية قصيرة (Bio):
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {bio.length}/80 حرف
              </span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="مثال: أحب القطط والبيتزا 🐱🍕، صديق مخلص ومستعد لأي تحدٍ!"
              maxLength={80}
              rows={2}
              className="w-full px-4 py-2 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-pink-500 font-medium text-xs sm:text-sm outline-hidden transition resize-none"
            />
          </div>

          {/* COLORFUL BACKGROUND SELECTION */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 flex items-center justify-between">
              <span>اختر خلفيتك الملونة المفضلة:</span>
              <span className="text-pink-600 font-bold text-[11px]">{selectedBg.name}</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PROFILE_BACKGROUNDS.map((bg) => {
                const isSelected = bg.id === bgId;
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setBgId(bg.id);
                    }}
                    className={`h-11 rounded-2xl ${bg.classes} border-2 flex items-center justify-center transition cursor-pointer relative shadow-xs hover:scale-105 active:scale-95 ${
                      isSelected ? 'border-slate-900 ring-2 ring-pink-400 scale-105' : 'border-white'
                    }`}
                    title={bg.name}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 text-slate-900 drop-shadow-sm stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CHARACTER SELECTION */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 block">
              اختر شخصيتك الكرتونية المرافقة:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {CHARACTERS.map((char) => {
                const isSelected = char.id === characterId;
                return (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setCharacterId(char.id);
                    }}
                    className={`p-1 rounded-2xl border-2 flex flex-col items-center gap-0.5 transition cursor-pointer ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-300'
                        : 'border-slate-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    <CharacterAvatar characterId={char.id} size="sm" expression={isSelected ? 'happy' : 'idle'} />
                    <span className="text-[9px] font-black text-slate-700 truncate w-full text-center">
                      {char.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>حفظ الملف الشخصي وتحديث بياناتي ✨</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
