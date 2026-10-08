import React from 'react';
import { getCharacterById } from '../data/characters';

export type MascotExpression = 'idle' | 'happy' | 'thinking' | 'surprised' | 'sad' | 'celebrating';

interface Props {
  characterId: string;
  expression?: MascotExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  bubbleText?: string;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const CharacterAvatar: React.FC<Props> = ({
  characterId,
  expression = 'idle',
  size = 'md',
  bubbleText,
  className = '',
  onClick,
  interactive = false,
}) => {
  const character = getCharacterById(characterId);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
    '2xl': 'w-48 h-48',
  }[size];

  // Render character specific SVG
  const renderSVG = () => {
    switch (character.svgType) {
      case 'cat':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            <defs>
              <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
            {/* Ears */}
            <polygon points="25,45 15,10 50,28" fill="#ec4899" />
            <polygon points="28,40 20,18 45,30" fill="#fbcfe8" />
            <polygon points="95,45 105,10 70,28" fill="#ec4899" />
            <polygon points="92,40 100,18 75,30" fill="#fbcfe8" />
            {/* Head */}
            <ellipse cx="60" cy="65" rx="46" ry="42" fill="url(#catGrad)" />
            {/* Cheeks */}
            <ellipse cx="32" cy="74" rx="8" ry="5" fill="#f43f5e" opacity="0.4" />
            <ellipse cx="88" cy="74" rx="8" ry="5" fill="#f43f5e" opacity="0.4" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 36 60 Q 45 48 54 60" stroke="#831843" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 66 60 Q 75 48 84 60" stroke="#831843" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>
            ) : expression === 'sad' ? (
              <>
                <path d="M 36 56 Q 45 66 54 56" stroke="#831843" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 66 56 Q 75 66 84 56" stroke="#831843" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                {/* Tear */}
                <ellipse cx="35" cy="72" rx="3" ry="5" fill="#38bdf8" />
              </>
            ) : expression === 'surprised' ? (
              <>
                <circle cx="45" cy="58" r="7" fill="#831843" />
                <circle cx="75" cy="58" r="7" fill="#831843" />
                <circle cx="43" cy="56" r="2.5" fill="#ffffff" />
                <circle cx="73" cy="56" r="2.5" fill="#ffffff" />
              </>
            ) : (
              <>
                <circle cx="45" cy="60" r="6" fill="#831843" />
                <circle cx="75" cy="60" r="6" fill="#831843" />
                <circle cx="43" cy="58" r="2" fill="#ffffff" />
                <circle cx="73" cy="58" r="2" fill="#ffffff" />
              </>
            )}
            {/* Nose */}
            <polygon points="60,67 56,64 64,64" fill="#be185d" />
            {/* Mouth */}
            {expression === 'surprised' ? (
              <ellipse cx="60" cy="77" rx="5" ry="7" fill="#831843" />
            ) : expression === 'sad' ? (
              <path d="M 55 77 Q 60 72 65 77" stroke="#831843" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 53 72 Q 60 77 60 72 Q 60 77 67 72" stroke="#831843" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
            {/* Whiskers */}
            <line x1="20" y1="67" x2="35" y2="69" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="75" x2="33" y2="74" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
            <line x1="100" y1="67" x2="85" y2="69" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
            <line x1="102" y1="75" x2="87" y2="74" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'bunny':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            <defs>
              <linearGradient id="bunnyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ede9fe" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
            </defs>
            {/* Long Ears */}
            <ellipse cx="40" cy="28" rx="12" ry="26" fill="#c4b5fd" transform="rotate(-8 40 28)" />
            <ellipse cx="40" cy="28" rx="6" ry="20" fill="#f472b6" opacity="0.6" transform="rotate(-8 40 28)" />
            <ellipse cx="80" cy="28" rx="12" ry="26" fill="#c4b5fd" transform="rotate(8 80 28)" />
            <ellipse cx="80" cy="28" rx="6" ry="20" fill="#f472b6" opacity="0.6" transform="rotate(8 80 28)" />
            {/* Head */}
            <circle cx="60" cy="72" r="42" fill="url(#bunnyGrad)" />
            {/* Cheeks */}
            <ellipse cx="32" cy="78" rx="8" ry="5" fill="#f43f5e" opacity="0.4" />
            <ellipse cx="88" cy="78" rx="8" ry="5" fill="#f43f5e" opacity="0.4" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 38 65 Q 47 53 56 65" stroke="#4c1d95" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 64 65 Q 73 53 82 65" stroke="#4c1d95" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>
            ) : expression === 'sad' ? (
              <>
                <path d="M 38 61 Q 47 70 56 61" stroke="#4c1d95" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 64 61 Q 73 70 82 61" stroke="#4c1d95" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <ellipse cx="36" cy="76" rx="3" ry="5" fill="#38bdf8" />
              </>
            ) : (
              <>
                <circle cx="47" cy="65" r="5.5" fill="#4c1d95" />
                <circle cx="73" cy="65" r="5.5" fill="#4c1d95" />
                <circle cx="45" cy="63" r="2" fill="#ffffff" />
                <circle cx="71" cy="63" r="2" fill="#ffffff" />
              </>
            )}
            {/* Cute nose */}
            <polygon points="60,73 57,70 63,70" fill="#db2777" />
            {/* Smile / Teeth */}
            <path d="M 54 77 Q 60 82 66 77" stroke="#4c1d95" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="58" y="77" width="4" height="4" rx="1" fill="#ffffff" stroke="#4c1d95" strokeWidth="1" />
          </svg>
        );

      case 'panda':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            {/* Panda Ears */}
            <circle cx="28" cy="36" r="16" fill="#1e293b" />
            <circle cx="92" cy="36" r="16" fill="#1e293b" />
            {/* Head */}
            <circle cx="60" cy="66" r="44" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
            {/* Eye Patches */}
            <ellipse cx="40" cy="64" rx="12" ry="15" fill="#1e293b" transform="rotate(-15 40 64)" />
            <ellipse cx="80" cy="64" rx="12" ry="15" fill="#1e293b" transform="rotate(15 80 64)" />
            {/* Cheeks */}
            <ellipse cx="30" cy="80" rx="7" ry="5" fill="#fb7185" opacity="0.5" />
            <ellipse cx="90" cy="80" rx="7" ry="5" fill="#fb7185" opacity="0.5" />
            {/* Eyes inside patches */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 34 64 Q 40 57 46 64" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 74 64 Q 80 57 86 64" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="41" cy="64" r="4.5" fill="#ffffff" />
                <circle cx="79" cy="64" r="4.5" fill="#ffffff" />
                <circle cx="42" cy="64" r="2.5" fill="#0f172a" />
                <circle cx="80" cy="64" r="2.5" fill="#0f172a" />
              </>
            )}
            {/* Nose & Mouth */}
            <ellipse cx="60" cy="74" rx="5" ry="3.5" fill="#0f172a" />
            <path d="M 55 80 Q 60 84 65 80" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'penguin':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            {/* Body */}
            <ellipse cx="60" cy="65" rx="42" ry="46" fill="#0f172a" />
            {/* White belly */}
            <ellipse cx="60" cy="70" rx="28" ry="34" fill="#ffffff" />
            {/* Scarf */}
            <rect x="36" y="80" width="48" height="11" rx="5" fill="#f97316" />
            <rect x="68" y="86" width="10" height="18" rx="4" fill="#ea580c" />
            {/* Cheeks */}
            <ellipse cx="38" cy="64" rx="6" ry="4" fill="#f43f5e" opacity="0.4" />
            <ellipse cx="82" cy="64" rx="6" ry="4" fill="#f43f5e" opacity="0.4" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 44 54 Q 50 46 56 54" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 64 54 Q 70 46 76 54" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="50" cy="52" r="5" fill="#0f172a" />
                <circle cx="70" cy="52" r="5" fill="#0f172a" />
                <circle cx="48" cy="50" r="2" fill="#ffffff" />
                <circle cx="68" cy="50" r="2" fill="#ffffff" />
              </>
            )}
            {/* Beak */}
            <polygon points="60,67 52,58 68,58" fill="#f59e0b" />
          </svg>
        );

      case 'shiba':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            {/* Ears */}
            <polygon points="26,45 16,14 46,26" fill="#d97706" />
            <polygon points="28,40 22,22 43,28" fill="#fef3c7" />
            <polygon points="94,45 104,14 74,26" fill="#d97706" />
            <polygon points="92,40 98,22 77,28" fill="#fef3c7" />
            {/* Head */}
            <circle cx="60" cy="66" r="42" fill="#f59e0b" />
            {/* White face patches */}
            <ellipse cx="40" cy="74" rx="16" ry="18" fill="#fffbeb" />
            <ellipse cx="80" cy="74" rx="16" ry="18" fill="#fffbeb" />
            <ellipse cx="60" cy="78" rx="20" ry="16" fill="#fffbeb" />
            {/* Eyebrows (cute Shiba white dots) */}
            <circle cx="42" cy="48" r="4" fill="#fffbeb" />
            <circle cx="78" cy="48" r="4" fill="#fffbeb" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 38 60 Q 46 50 54 60" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 66 60 Q 74 50 82 60" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="46" cy="58" r="5" fill="#78350f" />
                <circle cx="74" cy="58" r="5" fill="#78350f" />
                <circle cx="44" cy="56" r="2" fill="#ffffff" />
                <circle cx="72" cy="56" r="2" fill="#ffffff" />
              </>
            )}
            {/* Nose */}
            <ellipse cx="60" cy="68" rx="5" ry="4" fill="#451a03" />
            {/* Mouth with cute tongue */}
            <path d="M 54 74 Q 60 78 66 74" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="60" cy="80" rx="3.5" ry="4" fill="#f43f5e" />
          </svg>
        );

      case 'fox':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            {/* Fox Ears */}
            <polygon points="26,45 12,12 48,25" fill="#ea580c" />
            <polygon points="28,40 18,20 44,28" fill="#fff7ed" />
            <polygon points="94,45 108,12 72,25" fill="#ea580c" />
            <polygon points="92,40 102,20 76,28" fill="#fff7ed" />
            {/* Head */}
            <circle cx="60" cy="66" r="42" fill="#f97316" />
            {/* White Cheek Tufts */}
            <polygon points="60,82 25,66 38,90" fill="#fff7ed" />
            <polygon points="60,82 95,66 82,90" fill="#fff7ed" />
            <circle cx="60" cy="74" r="22" fill="#fff7ed" />
            {/* Cheeks */}
            <ellipse cx="34" cy="74" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
            <ellipse cx="86" cy="74" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 38 60 Q 46 50 54 60" stroke="#7c2d12" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 66 60 Q 74 50 82 60" stroke="#7c2d12" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="46" cy="58" r="5" fill="#7c2d12" />
                <circle cx="74" cy="58" r="5" fill="#7c2d12" />
                <circle cx="44" cy="56" r="2" fill="#ffffff" />
                <circle cx="72" cy="56" r="2" fill="#ffffff" />
              </>
            )}
            {/* Nose & Mouth */}
            <ellipse cx="60" cy="72" rx="4.5" ry="3.5" fill="#431407" />
            <path d="M 55 77 Q 60 81 65 77" stroke="#431407" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'hamster':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            {/* Round Ears */}
            <circle cx="28" cy="38" r="14" fill="#f472b6" />
            <circle cx="28" cy="38" r="8" fill="#fdf2f8" />
            <circle cx="92" cy="38" r="14" fill="#f472b6" />
            <circle cx="92" cy="38" r="8" fill="#fdf2f8" />
            {/* Chubby Head */}
            <ellipse cx="60" cy="68" rx="46" ry="42" fill="#fbcfe8" />
            {/* Extra Chubby Cheeks */}
            <ellipse cx="26" cy="76" rx="14" ry="12" fill="#f472b6" opacity="0.3" />
            <ellipse cx="94" cy="76" rx="14" ry="12" fill="#f472b6" opacity="0.3" />
            <ellipse cx="28" cy="76" rx="8" ry="6" fill="#fb7185" opacity="0.5" />
            <ellipse cx="92" cy="76" rx="8" ry="6" fill="#fb7185" opacity="0.5" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 38 62 Q 46 52 54 62" stroke="#831843" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 66 62 Q 74 52 82 62" stroke="#831843" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="45" cy="60" r="5.5" fill="#831843" />
                <circle cx="75" cy="60" r="5.5" fill="#831843" />
                <circle cx="43" cy="58" r="2.5" fill="#ffffff" />
                <circle cx="73" cy="58" r="2.5" fill="#ffffff" />
              </>
            )}
            {/* Tiny Pink Nose & Teeth */}
            <polygon points="60,69 57,66 63,66" fill="#be185d" />
            <path d="M 55 73 Q 60 76 65 73" stroke="#831843" strokeWidth="2" fill="none" strokeLinecap="round" />
            <rect x="58.5" y="73" width="3" height="4" rx="1" fill="#ffffff" stroke="#831843" strokeWidth="0.8" />
          </svg>
        );

      case 'bear':
      default:
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none transition-transform duration-300">
            {/* Bear Ears */}
            <circle cx="30" cy="34" r="16" fill="#b45309" />
            <circle cx="30" cy="34" r="9" fill="#fde68a" />
            <circle cx="90" cy="34" r="16" fill="#b45309" />
            <circle cx="90" cy="34" r="9" fill="#fde68a" />
            {/* Head */}
            <circle cx="60" cy="66" r="44" fill="#d97706" />
            {/* Snout */}
            <ellipse cx="60" cy="74" rx="18" ry="14" fill="#fef3c7" />
            {/* Cheeks */}
            <ellipse cx="32" cy="74" rx="7" ry="5" fill="#f43f5e" opacity="0.4" />
            <ellipse cx="88" cy="74" rx="7" ry="5" fill="#f43f5e" opacity="0.4" />
            {/* Eyes */}
            {expression === 'happy' || expression === 'celebrating' ? (
              <>
                <path d="M 38 58 Q 46 48 54 58" stroke="#451a03" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 66 58 Q 74 48 82 58" stroke="#451a03" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="45" cy="56" r="5" fill="#451a03" />
                <circle cx="75" cy="56" r="5" fill="#451a03" />
                <circle cx="43" cy="54" r="2" fill="#ffffff" />
                <circle cx="73" cy="54" r="2" fill="#ffffff" />
              </>
            )}
            {/* Nose */}
            <ellipse cx="60" cy="70" rx="5" ry="4" fill="#451a03" />
            {/* Mouth */}
            <path d="M 54 77 Q 60 82 66 77" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Animated bounce or shake based on expression
  const animationClass = {
    idle: 'hover:scale-105 transition-transform duration-300',
    happy: 'animate-bounce',
    celebrating: 'animate-bounce drop-shadow-xl',
    surprised: 'scale-110 rotate-3 transition-transform',
    sad: 'opacity-90 translate-y-1',
    thinking: 'animate-pulse',
  }[expression];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech bubble if provided */}
      {bubbleText && (
        <div className="absolute -top-12 z-20 bg-white/95 backdrop-blur-sm border-2 border-pink-300 text-slate-800 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-2xl shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-pink-300 rotate-45"></div>
        </div>
      )}

      {/* Mascot Container */}
      <div
        onClick={onClick}
        className={`${sizeClasses} ${animationClass} ${
          interactive ? 'cursor-pointer hover:drop-shadow-lg' : ''
        } relative flex items-center justify-center`}
      >
        {renderSVG()}

        {/* Celebrating mini stars or hearts */}
        {expression === 'celebrating' && (
          <>
            <span className="absolute -top-2 -right-2 text-lg animate-ping">✨</span>
            <span className="absolute -bottom-1 -left-2 text-lg animate-bounce">💖</span>
          </>
        )}
      </div>
    </div>
  );
};
