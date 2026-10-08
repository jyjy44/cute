export interface Option {
  id: string;
  text: string;
  emoji: string;
}

export interface Question {
  id: string;
  category: string;
  question: string;
  emoji: string;
  options: Option[];
}

export interface QuizQuestionItem {
  questionId: string;
  questionText: string;
  emoji: string;
  options: Option[];
  correctOptionId: string;
}

export interface CartoonCharacter {
  id: string;
  name: string;
  title: string;
  avatarColor: string;
  bgGradient: string;
  quote: string;
  superpower: string;
  battleCry: string;
  emoji: string;
  svgType: 'cat' | 'bunny' | 'panda' | 'penguin' | 'bear' | 'shiba' | 'fox' | 'hamster';
}

export interface FriendSubmission {
  id: string;
  friendName: string;
  characterId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
  completedAt: string;
  friendComment?: string;
  friendBio?: string;
  friendBackground?: string;
  friendAge?: number | string;
  friendCountry?: string;
  friendPhone?: string;
}

export interface Quiz {
  id: string;
  code: string;
  creatorName: string;
  creatorCharacterId: string;
  creatorBio?: string;
  creatorBackground?: string;
  creatorAge?: number | string;
  creatorCountry?: string;
  creatorPhone?: string;
  title: string;
  questions: QuizQuestionItem[];
  createdAt: string;
  submissions: FriendSubmission[];
  themeColor?: string;
}

export interface UserStats {
  quizzesCreated: number;
  quizzesPlayed: number;
  totalCorrectAnswers: number;
  perfectScoresCount: number;
  passAndPlayGames: number;
  customQuestionsCreated: number;
}

export interface UserProfile {
  name: string;
  characterId: string;
  bio?: string;
  profileBackground?: string;
  age?: number | string;
  country?: string;
  phoneNumber?: string;
  points: number; // Starts strictly at 0
  unlockedAchievements: string[]; // List of achievement IDs
  stats: UserStats;
  history: {
    id: string;
    description: string;
    points: number;
    timestamp: string;
    type: 'quiz_created' | 'quiz_played' | 'achievement_unlocked' | 'correct_answer' | 'perfect_score' | 'pass_and_play';
  }[];
}

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  badgeEmoji: string;
  pointsReward: number;
  category: 'بدايات' | 'احتراف' | 'اجتماعي' | 'مميز';
  targetCount: number;
  getStatValue: (stats: UserStats) => number;
}

