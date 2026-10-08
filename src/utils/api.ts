import { Quiz, FriendSubmission } from '../types';

export async function createQuiz(quizData: {
  creatorName: string;
  creatorCharacterId: string;
  title: string;
  questions: Quiz['questions'];
  themeColor?: string;
}): Promise<Quiz> {
  try {
    const res = await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData),
    });
    if (!res.ok) {
      throw new Error('فشل إنشاء التحدي من السيرفر');
    }
    const data = await res.json();
    // Also save in local creator history
    saveQuizLocally(data.quiz);
    return data.quiz;
  } catch (err) {
    console.warn('Backend unavailable, using fallback localStorage:', err);
    const code = String(Math.floor(10000 + Math.random() * 90000));
    const id = `quiz_${code}`;
    const localQuiz: Quiz = {
      id,
      code,
      creatorName: quizData.creatorName.trim(),
      creatorCharacterId: quizData.creatorCharacterId || 'basbous',
      title: quizData.title || `تحدي صداقة ${quizData.creatorName}`,
      questions: quizData.questions,
      createdAt: new Date().toISOString(),
      submissions: [],
      themeColor: quizData.themeColor,
    };
    saveQuizLocally(localQuiz);
    return localQuiz;
  }
}

export async function fetchQuizForPlay(idOrCode: string): Promise<Quiz | null> {
  const clean = idOrCode.trim();
  try {
    const res = await fetch(`/api/quizzes/${clean}`);
    if (res.ok) {
      const data = await res.json();
      return data.quiz;
    }
  } catch (err) {
    console.warn('Server fetch error:', err);
  }

  // Fallback to local storage if running in the same browser
  const localList = getLocalQuizzes();
  const cleanNoPrefix = clean.replace(/^quiz_/, '');
  const found = localList.find((q) => {
    return (
      q.id === clean ||
      q.code === clean ||
      q.code === cleanNoPrefix ||
      q.id.replace(/^quiz_/, '') === cleanNoPrefix
    );
  });
  return found || null;
}

export async function searchQuizByCode(code: string): Promise<{
  found: boolean;
  quiz?: {
    id: string;
    code: string;
    creatorName: string;
    creatorCharacterId: string;
    title: string;
    totalQuestions: number;
    createdAt?: string;
  };
} | null> {
  const clean = code.trim();
  try {
    const res = await fetch(`/api/quizzes/search/${clean}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Search code error:', err);
  }

  // Local fallback
  const localList = getLocalQuizzes();
  const cleanNoPrefix = clean.replace(/^quiz_/, '');
  const found = localList.find((q) => {
    return (
      q.code === clean ||
      q.id === clean ||
      q.code === cleanNoPrefix ||
      q.id.replace(/^quiz_/, '') === cleanNoPrefix
    );
  });

  if (found) {
    return {
      found: true,
      quiz: {
        id: found.id,
        code: found.code || found.id.replace('quiz_', ''),
        creatorName: found.creatorName,
        creatorCharacterId: found.creatorCharacterId,
        title: found.title,
        totalQuestions: found.questions.length,
        createdAt: found.createdAt,
      },
    };
  }

  return null;
}

export async function fetchQuizResults(quizId: string): Promise<{
  quizId: string;
  creatorName: string;
  creatorCharacterId: string;
  title: string;
  questions: Quiz['questions'];
  submissions: FriendSubmission[];
  totalQuestions: number;
} | null> {
  try {
    const res = await fetch(`/api/quizzes/${quizId}/results`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Server results fetch error:', err);
  }

  // Fallback to local
  const localList = getLocalQuizzes();
  const found = localList.find((q) => q.id === quizId);
  if (found) {
    return {
      quizId: found.id,
      creatorName: found.creatorName,
      creatorCharacterId: found.creatorCharacterId,
      title: found.title,
      questions: found.questions,
      submissions: found.submissions || [],
      totalQuestions: found.questions.length,
    };
  }
  return null;
}

export async function submitFriendAnswers(
  quizId: string,
  submissionData: {
    friendName: string;
    characterId: string;
    answers: { questionId: string; selectedOptionId: string }[];
    friendComment?: string;
  }
): Promise<{
  submission: FriendSubmission;
  quizDetails: {
    creatorName: string;
    creatorCharacterId: string;
    questions: Quiz['questions'];
  };
}> {
  try {
    const res = await fetch(`/api/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Server submission error:', err);
  }

  // Local fallback
  const localQuizzes = getLocalQuizzes();
  const quiz = localQuizzes.find((q) => q.id === quizId);
  if (!quiz) {
    throw new Error('لم يتم العثور على التحدي محلياً');
  }

  let score = 0;
  const evaluatedAnswers = submissionData.answers.map((ans) => {
    const q = quiz.questions.find((item) => item.questionId === ans.questionId);
    const isCorrect = q ? q.correctOptionId === ans.selectedOptionId : false;
    if (isCorrect) score++;
    return {
      questionId: ans.questionId,
      selectedOptionId: ans.selectedOptionId,
      isCorrect,
    };
  });

  const submission: FriendSubmission = {
    id: `sub_${Date.now()}`,
    friendName: submissionData.friendName,
    characterId: submissionData.characterId,
    score,
    totalQuestions: quiz.questions.length,
    percentage: Math.round((score / quiz.questions.length) * 100),
    answers: evaluatedAnswers,
    completedAt: new Date().toISOString(),
    friendComment: submissionData.friendComment,
  };

  quiz.submissions = [submission, ...(quiz.submissions || [])];
  saveQuizLocally(quiz);

  return {
    submission,
    quizDetails: {
      creatorName: quiz.creatorName,
      creatorCharacterId: quiz.creatorCharacterId,
      questions: quiz.questions,
    },
  };
}

// LocalStorage helpers for creator's history
const LOCAL_STORAGE_KEY = 'cute_quiz_created_quizzes';

export function getLocalQuizzes(): Quiz[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveQuizLocally(quiz: Quiz) {
  try {
    const list = getLocalQuizzes();
    const index = list.findIndex((q) => q.id === quiz.id);
    if (index >= 0) {
      list[index] = quiz;
    } else {
      list.unshift(quiz);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save quiz locally:', e);
  }
}

export function buildShareUrl(quizId: string): string {
  const origin = window.location.origin;
  return `${origin}/?quiz=${quizId}`;
}
