import React, { useState } from 'react';
import { X, Sparkles, Swords, Zap, Check, Heart, Shield, Star } from 'lucide-react';
import { CHARACTERS, getCharacterById } from '../data/characters';
import { CharacterAvatar } from './CharacterAvatar';
import { sound } from '../utils/sound';

interface Props {
  selectedCharacterId: string;
  onSelectCharacter: (id: string) => void;
  onClose: () => void;
}

export const CharactersRosterModal: React.FC<Props> = ({
  selectedCharacterId,
  onSelectCharacter,
  onClose,
}) => {
  const [activeTabCharId, setActiveTabCharId] = useState(selectedCharacterId);
  const activeChar = getCharacterById(activeTabCharId);

  const handlePickAndSave = (charId: string) => {
    sound.playVictory();
    onSelectCharacter(charId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border-4 border-pink-200 shadow-2xl p-5 sm:p-7 relative max-h-[90vh] overflow-y-auto space-y-5">
        {/* Prominent Exit Button (✕ خروج) */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          aria-label="الخروج"
          className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-2xl bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 border-2 border-rose-300 flex items-center gap-1.5 shadow-md hover:shadow-lg transition cursor-pointer font-black text-xs"
        >
          <X className="w-4 h-4 text-rose-600 stroke-[3]" />
          <span>خروج</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 inline-block">
            فريق شخصيات التحدي الكيوت 🐾
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-['Cairo',sans-serif]">
            اختر شخصيتك الكرتونية لتتحدى بها أصدقاءك!
          </h3>
          <p className="text-xs text-slate-500">
            لكل شخصية قوتها الخارقة، صيحتها الخاصة، وأسلوبها المرح في منافسة الأصدقاء!
          </p>
        </div>

        {/* ACTIVE CHARACTER SPOTLIGHT CARD */}
        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 rounded-3xl p-5 border-2 border-pink-200 text-center space-y-3 relative overflow-hidden">
          <div className="inline-block relative">
            <CharacterAvatar
              characterId={activeChar.id}
              size="xl"
              expression="celebrating"
              bubbleText={activeChar.quote}
            />
          </div>

          <div>
            <h4 className="text-xl font-black text-slate-800 font-['Cairo',sans-serif]">{activeChar.name}</h4>
            <p className="text-xs font-bold text-purple-600 mt-0.5">{activeChar.title}</p>
          </div>

          {/* Traits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-right max-w-md mx-auto text-xs">
            <div className="bg-white/80 p-2.5 rounded-xl border border-pink-200">
              <span className="text-[10px] text-pink-500 font-black block">القوة الصداقية الخارقة:</span>
              <span className="font-extrabold text-slate-800">{activeChar.superpower}</span>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-purple-200">
              <span className="text-[10px] text-purple-500 font-black block">صيحة التحدي:</span>
              <span className="font-extrabold text-purple-800 italic">"{activeChar.battleCry}"</span>
            </div>
          </div>

          {/* Set as active character button */}
          <button
            onClick={() => handlePickAndSave(activeChar.id)}
            className={`px-6 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-md ${
              selectedCharacterId === activeChar.id
                ? 'bg-emerald-500 text-white shadow-emerald-200'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200 hover:from-pink-600'
            }`}
          >
            {selectedCharacterId === activeChar.id ? (
              <>
                <Check className="w-4 h-4" />
                <span>هذه شخصيتك الحالية المختارة! ✨</span>
              </>
            ) : (
              <>
                <Star className="w-4 h-4" />
                <span>اختر {activeChar.name} كشخصيتك الرسمية في التحديات!</span>
              </>
            )}
          </button>
        </div>

        {/* CHARACTER GRID (8 Characters) */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 block">
            جميع الشخصيات الكرتونية المتاحة (8 شخصيات):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CHARACTERS.map((char) => {
              const isActive = activeTabCharId === char.id;
              const isSelectedMain = selectedCharacterId === char.id;

              return (
                <div
                  key={char.id}
                  onClick={() => {
                    sound.playPop();
                    setActiveTabCharId(char.id);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center gap-1.5 transition cursor-pointer relative ${
                    isActive
                      ? 'border-pink-500 bg-pink-50/80 shadow-md ring-2 ring-pink-300'
                      : 'border-slate-200 bg-white hover:border-pink-200 hover:bg-slate-50'
                  }`}
                >
                  {isSelectedMain && (
                    <span className="absolute top-1.5 right-1.5 text-xs" title="شخصيتك الحالية">
                      ⭐
                    </span>
                  )}
                  <CharacterAvatar characterId={char.id} size="md" expression={isActive ? 'happy' : 'idle'} />
                  <div>
                    <h5 className="font-black text-xs text-slate-800">{char.name}</h5>
                    <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{char.title.split(' ')[0]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
