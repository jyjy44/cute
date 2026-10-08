import { UserProfile, UserStats, AchievementDefinition } from '../types';
import { ACHIEVEMENTS, getUserLevel } from '../data/achievements';
import { sound } from './sound';

const PROFILE_STORAGE_KEY = 'cute_quiz_user_profile_v2';

const defaultStats: UserStats = {
  quizzesCreated: 0,
  quizzesPlayed: 0,
  totalCorrectAnswers: 0,
  perfectScoresCount: 0,
  passAndPlayGames: 0,
  customQuestionsCreated: 0,
};

const defaultProfile: UserProfile = {
  name: 'صديق جديد',
  characterId: 'basbous',
  bio: 'مستعد دائماً لتحديات الصداقة والمرح! 🐾✨',
  profileBackground: 'candy_pink',
  age: '20',
  country: 'مصر 🇪🇬',
  phoneNumber: '',
  points: 0, // Starts strictly at 0 points
  unlockedAchievements: [],
  stats: defaultStats,
  history: [],
};

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultProfile,
        ...parsed,
        stats: { ...defaultStats, ...(parsed.stats || {}) },
        history: parsed.history || [],
        unlockedAchievements: parsed.unlockedAchievements || [],
      };
    }
  } catch (err) {
    console.error('Failed to load profile:', err);
  }
  return defaultProfile;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
}

export function updateUserNameAndAvatar(name: string, characterId: string): UserProfile {
  const profile = getUserProfile();
  profile.name = name.trim() || profile.name;
  profile.characterId = characterId || profile.characterId;
  saveUserProfile(profile);
  return profile;
}

export function updateProfileCustomization(data: {
  name?: string;
  characterId?: string;
  bio?: string;
  profileBackground?: string;
  age?: number | string;
  country?: string;
  phoneNumber?: string;
}): UserProfile {
  const profile = getUserProfile();
  if (data.name !== undefined) profile.name = data.name.trim() || profile.name;
  if (data.characterId !== undefined) profile.characterId = data.characterId;
  if (data.bio !== undefined) profile.bio = data.bio.trim();
  if (data.profileBackground !== undefined) profile.profileBackground = data.profileBackground;
  if (data.age !== undefined) profile.age = data.age;
  if (data.country !== undefined) profile.country = data.country.trim();
  if (data.phoneNumber !== undefined) profile.phoneNumber = data.phoneNumber.trim();
  saveUserProfile(profile);
  return profile;
}

export interface AchievementUnlockEvent {
  achievement: AchievementDefinition;
  pointsAdded: number;
}

/**
 * Check and unlock any newly earned achievements based on current stats
 */
function evaluateAchievements(profile: UserProfile): AchievementUnlockEvent[] {
  const newUnlocks: AchievementUnlockEvent[] = [];

  for (const ach of ACHIEVEMENTS) {
    if (!profile.unlockedAchievements.includes(ach.id)) {
      const currentVal = ach.getStatValue(profile.stats);
      if (currentVal >= ach.targetCount) {
        profile.unlockedAchievements.push(ach.id);
        profile.points += ach.pointsReward;
        profile.history.unshift({
          id: `ach_${Date.now()}_${ach.id}`,
          description: `إنجاز جديد: ${ach.title} ${ach.badgeEmoji}`,
          points: ach.pointsReward,
          timestamp: new Date().toISOString(),
          type: 'achievement_unlocked',
        });
        newUnlocks.push({
          achievement: ach,
          pointsAdded: ach.pointsReward,
        });
      }
    }
  }

  return newUnlocks;
}

/**
 * Record event: Created a Quiz
 */
export function recordQuizCreated(hasCustomQuestion = false): {
  profile: UserProfile;
  newAchievements: AchievementUnlockEvent[];
  pointsEarned: number;
} {
  const profile = getUserProfile();
  const pointsEarned = 40; // Base points for creating challenge

  profile.points += pointsEarned;
  profile.stats.quizzesCreated += 1;
  if (hasCustomQuestion) {
    profile.stats.customQuestionsCreated += 1;
  }

  profile.history.unshift({
    id: `qc_${Date.now()}`,
    description: 'إنشاء وتجهيز تحدي صداقة جديد 💌',
    points: pointsEarned,
    timestamp: new Date().toISOString(),
    type: 'quiz_created',
  });

  const newAchievements = evaluateAchievements(profile);
  saveUserProfile(profile);

  return { profile, newAchievements, pointsEarned };
}

/**
 * Record event: Played a Friend's Quiz
 */
export function recordQuizCompleted(
  score: number,
  totalQuestions: number
): {
  profile: UserProfile;
  newAchievements: AchievementUnlockEvent[];
  pointsEarned: number;
} {
  const profile = getUserProfile();

  // Points breakdown:
  // +10 points for each correct answer
  // +20 points completion bonus
  // +50 points bonus if 100% perfect score
  const correctPoints = score * 10;
  const completionBonus = 20;
  const isPerfect = score === totalQuestions && totalQuestions > 0;
  const perfectBonus = isPerfect ? 50 : 0;

  const pointsEarned = correctPoints + completionBonus + perfectBonus;
  profile.points += pointsEarned;

  profile.stats.quizzesPlayed += 1;
  profile.stats.totalCorrectAnswers += score;
  if (isPerfect) {
    profile.stats.perfectScoresCount += 1;
  }

  profile.history.unshift({
    id: `qp_${Date.now()}`,
    description: `إكمال تحدي أصدقاء بنتيجة ${score}/${totalQuestions} ${isPerfect ? '🌟 (درجة كاملة!)' : '🐾'}`,
    points: pointsEarned,
    timestamp: new Date().toISOString(),
    type: isPerfect ? 'perfect_score' : 'quiz_played',
  });

  const newAchievements = evaluateAchievements(profile);
  saveUserProfile(profile);

  return { profile, newAchievements, pointsEarned };
}

/**
 * Record event: Completed a Pass & Play match
 */
export function recordPassAndPlayGame(): {
  profile: UserProfile;
  newAchievements: AchievementUnlockEvent[];
  pointsEarned: number;
} {
  const profile = getUserProfile();
  const pointsEarned = 25;

  profile.points += pointsEarned;
  profile.stats.passAndPlayGames += 1;

  profile.history.unshift({
    id: `pnp_${Date.now()}`,
    description: 'إكمال جولة تحدي وجهاً لوجه 👥',
    points: pointsEarned,
    timestamp: new Date().toISOString(),
    type: 'pass_and_play',
  });

  const newAchievements = evaluateAchievements(profile);
  saveUserProfile(profile);

  return { profile, newAchievements, pointsEarned };
}
