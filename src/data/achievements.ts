import { AchievementDefinition, UserStats } from '../types';

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first_challenge',
    title: 'المتحدي الأول',
    description: 'إكمال أول تحدٍ بنجاح ضد أحد أصدقائك وتخمين إجاباته.',
    badgeEmoji: '🌱',
    pointsReward: 30,
    category: 'بدايات',
    targetCount: 1,
    getStatValue: (stats: UserStats) => stats.quizzesPlayed,
  },
  {
    id: 'quiz_creator',
    title: 'صانع البهجة',
    description: 'إنشاء أول تحدٍ خاص بك ومشاركته مع أصدقائك في التحدي.',
    badgeEmoji: '💌',
    pointsReward: 50,
    category: 'بدايات',
    targetCount: 1,
    getStatValue: (stats: UserStats) => stats.quizzesCreated,
  },
  {
    id: 'soulmate_100',
    title: 'توأم الروح الأسطوري',
    description: 'تحقيق نتيجة كاملة 100% في أحد التحديات دون أي خطأ!',
    badgeEmoji: '💖',
    pointsReward: 80,
    category: 'مميز',
    targetCount: 1,
    getStatValue: (stats: UserStats) => stats.perfectScoresCount,
  },
  {
    id: 'challenge_expert',
    title: 'خبير التحديات',
    description: 'خوض 5 تحديات مختلفة للأصدقاء وإثبات معرفتك العميقة بهم.',
    badgeEmoji: '🎓',
    pointsReward: 100,
    category: 'احتراف',
    targetCount: 5,
    getStatValue: (stats: UserStats) => stats.quizzesPlayed,
  },
  {
    id: 'sharp_mind',
    title: 'العقل الذكي',
    description: 'الإجابة بشكل صحيح عن 10 أسئلة إجمالاً عبر التحديات.',
    badgeEmoji: '🧠',
    pointsReward: 50,
    category: 'احتراف',
    targetCount: 10,
    getStatValue: (stats: UserStats) => stats.totalCorrectAnswers,
  },
  {
    id: 'face_to_face',
    title: 'بطل المواجهة المباشرة',
    description: 'إكمال جولة واحدة على الأقل في وضع اللعب المباشر "وجهاً لوجه".',
    badgeEmoji: '👥',
    pointsReward: 40,
    category: 'اجتماعي',
    targetCount: 1,
    getStatValue: (stats: UserStats) => stats.passAndPlayGames,
  },
  {
    id: 'creative_author',
    title: 'المؤلف المبتكر',
    description: 'تأليف وإضافة سؤال مخصص من عندك في أحد التحديات.',
    badgeEmoji: '🎨',
    pointsReward: 40,
    category: 'مميز',
    targetCount: 1,
    getStatValue: (stats: UserStats) => stats.customQuestionsCreated,
  },
  {
    id: 'knowledge_titan',
    title: 'الموسوعة الحية',
    description: 'الإجابة بشكل صحيح عن 25 سؤالاً عبر جميع التحديات.',
    badgeEmoji: '📚',
    pointsReward: 120,
    category: 'احتراف',
    targetCount: 25,
    getStatValue: (stats: UserStats) => stats.totalCorrectAnswers,
  },
  {
    id: 'master_challenger',
    title: 'أسطورة الصداقة الذهبية',
    description: 'خوض 10 تحديات للأصدقاء وصنع حضور لا يُنسى!',
    badgeEmoji: '👑',
    pointsReward: 150,
    category: 'احتراف',
    targetCount: 10,
    getStatValue: (stats: UserStats) => stats.quizzesPlayed,
  },
];

export interface UserLevelInfo {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  badge: string;
}

export const USER_LEVELS: UserLevelInfo[] = [
  { level: 1, title: 'برعم الصداقة', minPoints: 0, maxPoints: 99, badge: '🌱' },
  { level: 2, title: 'صديق نشيط', minPoints: 100, maxPoints: 249, badge: '🐾' },
  { level: 3, title: 'نجم التحديات', minPoints: 250, maxPoints: 499, badge: '⭐' },
  { level: 4, title: 'خبير القلوب', minPoints: 500, maxPoints: 999, badge: '💖' },
  { level: 5, title: 'أسطورة الصداقة الكيوت', minPoints: 1000, maxPoints: Infinity, badge: '👑' },
];

export function getUserLevel(points: number): UserLevelInfo {
  for (let i = USER_LEVELS.length - 1; i >= 0; i--) {
    if (points >= USER_LEVELS[i].minPoints) {
      return USER_LEVELS[i];
    }
  }
  return USER_LEVELS[0];
}
