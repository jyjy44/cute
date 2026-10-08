import React from 'react';
import { Sparkles, Swords, Zap, Shield, Heart } from 'lucide-react';
import { CharacterAvatar } from './CharacterAvatar';
import { getCharacterById } from '../data/characters';

interface Props {
  creatorName: string;
  creatorCharacterId: string;
  friendName: string;
  friendCharacterId: string;
  className?: string;
  compact?: boolean;
}

export const CharacterBattleCard: React.FC<Props> = ({
  creatorName,
  creatorCharacterId,
  friendName,
  friendCharacterId,
  className = '',
  compact = false,
}) => {
  const creatorChar = getCharacterById(creatorCharacterId);
  const friendChar = getCharacterById(friendCharacterId);

  if (compact) {
    return (
      <div className={`bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-3 rounded-2xl border-2 border-pink-200 flex items-center justify-between gap-2 ${className}`}>
        {/* Creator Mascot */}
        <div className="flex items-center gap-2">
          <CharacterAvatar characterId={creatorCharacterId} size="sm" expression="happy" />
          <div>
            <span className="text-[10px] text-pink-500 font-bold block">المُتحدَى (صاحب التحدي)</span>
            <span className="font-black text-xs text-slate-800">{creatorName} ({creatorChar.name})</span>
          </div>
        </div>

        {/* VS Badge */}
        <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-xs shadow-xs flex items-center gap-1 shrink-0">
          <Zap className="w-3 h-3 text-amber-300 animate-pulse" />
          <span>ضد</span>
        </div>

        {/* Friend Mascot */}
        <div className="flex items-center gap-2 flex-row-reverse text-left">
          <CharacterAvatar characterId={friendCharacterId} size="sm" expression="celebrating" />
          <div>
            <span className="text-[10px] text-purple-500 font-bold block">المتحدي</span>
            <span className="font-black text-xs text-slate-800">{friendName} ({friendChar.name})</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-pink-100/70 via-purple-50 to-amber-50 rounded-3xl p-5 sm:p-6 border-3 border-pink-300 shadow-md relative overflow-hidden text-center space-y-4 ${className}`}>
      {/* Duel Banner Title */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-purple-200 text-purple-800 text-xs font-black shadow-xs">
        <Swords className="w-4 h-4 text-purple-600" />
        <span>مواجهة الشخصيات الكرتونية الكيوت! 🐾</span>
      </div>

      <div className="grid grid-cols-2 gap-3 items-center relative">
        {/* VS Floating Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            ضد
          </div>
        </div>

        {/* Creator Fighter Card */}
        <div className="bg-white/90 rounded-2xl p-3.5 border-2 border-pink-200 shadow-xs flex flex-col items-center gap-2 relative">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 self-start">
            صاحب التحدي 🛡️
          </span>

          <CharacterAvatar characterId={creatorCharacterId} size="lg" expression="happy" />

          <div>
            <h4 className="font-black text-sm text-slate-800 font-['Cairo',sans-serif]">{creatorName}</h4>
            <p className="text-xs text-pink-600 font-bold">{creatorChar.name}</p>
            <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{creatorChar.superpower}</p>
          </div>
        </div>

        {/* Friend Fighter Card */}
        <div className="bg-white/90 rounded-2xl p-3.5 border-2 border-purple-200 shadow-xs flex flex-col items-center gap-2 relative">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 self-end">
            المتحدي ⚔️
          </span>

          <CharacterAvatar characterId={friendCharacterId} size="lg" expression="celebrating" />

          <div>
            <h4 className="font-black text-sm text-slate-800 font-['Cairo',sans-serif]">{friendName}</h4>
            <p className="text-xs text-purple-600 font-bold">{friendChar.name}</p>
            <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{friendChar.superpower}</p>
          </div>
        </div>
      </div>

      {/* Battle Cries Exchange */}
      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
        <div className="bg-pink-50 p-2 rounded-xl text-pink-800 font-medium italic border border-pink-200">
          "{creatorChar.battleCry}"
        </div>
        <div className="bg-purple-50 p-2 rounded-xl text-purple-800 font-medium italic border border-purple-200">
          "{friendChar.battleCry}"
        </div>
      </div>
    </div>
  );
};
