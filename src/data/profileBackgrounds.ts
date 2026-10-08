export interface ProfileBackground {
  id: string;
  name: string;
  emoji: string;
  classes: string; // Tailwind background gradient classes
  previewColor: string;
  textColor: string;
}

export const PROFILE_BACKGROUNDS: ProfileBackground[] = [
  {
    id: 'candy_pink',
    name: 'وردي كاندي',
    emoji: '🍬',
    classes: 'bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200',
    previewColor: '#f43f5e',
    textColor: 'text-rose-950',
  },
  {
    id: 'dreamy_purple',
    name: 'بنفسجي حالم',
    emoji: '💜',
    classes: 'bg-gradient-to-r from-purple-500 via-indigo-400 to-pink-400',
    previewColor: '#a855f7',
    textColor: 'text-purple-950',
  },
  {
    id: 'sunny_honey',
    name: 'عسل مشمس',
    emoji: '🍯',
    classes: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400',
    previewColor: '#f59e0b',
    textColor: 'text-amber-950',
  },
  {
    id: 'mint_fresh',
    name: 'نعناع منعش',
    emoji: '🍀',
    classes: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400',
    previewColor: '#10b981',
    textColor: 'text-emerald-950',
  },
  {
    id: 'ocean_sky',
    name: 'سماء زرقاء',
    emoji: '🌊',
    classes: 'bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400',
    previewColor: '#0ea5e9',
    textColor: 'text-sky-950',
  },
  {
    id: 'cotton_candy',
    name: 'غزل البنات',
    emoji: '🍡',
    classes: 'bg-gradient-to-r from-pink-300 via-purple-300 to-sky-300',
    previewColor: '#ec4899',
    textColor: 'text-pink-950',
  },
  {
    id: 'sunset_glow',
    name: 'غروب ذهبي',
    emoji: '🌅',
    classes: 'bg-gradient-to-r from-orange-500 via-rose-400 to-purple-500',
    previewColor: '#f97316',
    textColor: 'text-orange-950',
  },
  {
    id: 'cosmic_galaxy',
    name: 'مجرة النجوم',
    emoji: '✨',
    classes: 'bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500',
    previewColor: '#8b5cf6',
    textColor: 'text-white',
  },
];

export function getProfileBackgroundById(id?: string): ProfileBackground {
  if (!id) return PROFILE_BACKGROUNDS[0];
  return PROFILE_BACKGROUNDS.find((b) => b.id === id) || PROFILE_BACKGROUNDS[0];
}
