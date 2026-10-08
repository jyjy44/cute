import { PERSONALITY_CHALLENGES, PersonalityChallengeTemplate } from './personalityChallenges';
import { COUPLE_CHALLENGES, CoupleChallengeTemplate } from './couplesChallenges';
import { Question } from '../types';

export interface UnifiedChallenge {
  id: string;
  sourceType: 'personality' | 'couples';
  number: number;
  title: string;
  tagline: string;
  emoji: string;
  categoryGroup: 'couples' | 'personality';
  categoryGroupLabel: string;
  category: string;
  categoryLabel: string;
  gradient: string;
  badgeColor: string;
  questions: Question[];
}

export const ALL_PREMADE_CHALLENGES: UnifiedChallenge[] = [
  // 30 Couples & Relationship Challenges first
  ...COUPLE_CHALLENGES.map((ch) => ({
    id: ch.id,
    sourceType: 'couples' as const,
    number: ch.number,
    title: ch.title,
    tagline: ch.tagline,
    emoji: ch.emoji,
    categoryGroup: 'couples' as const,
    categoryGroupLabel: 'تحديات الكابلز والحب ❤️',
    category: ch.category,
    categoryLabel: ch.categoryLabel,
    gradient: ch.gradient,
    badgeColor: ch.badgeColor,
    questions: ch.questions,
  })),

  // 20 Psychological & Personality Challenges
  ...PERSONALITY_CHALLENGES.map((ch) => ({
    id: ch.id,
    sourceType: 'personality' as const,
    number: ch.number,
    title: ch.title,
    tagline: ch.tagline,
    emoji: ch.emoji,
    categoryGroup: 'personality' as const,
    categoryGroupLabel: 'تحديات النفسية والشخصية 🧠',
    category: ch.category,
    categoryLabel: ch.categoryLabel,
    gradient: ch.gradient,
    badgeColor: ch.badgeColor,
    questions: ch.questions,
  })),
];

export function getUnifiedChallengeById(id: string): UnifiedChallenge | undefined {
  return ALL_PREMADE_CHALLENGES.find((ch) => ch.id === id);
}
