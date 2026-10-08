import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Data storage file
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'quizzes.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredQuiz {
  id: string;
  code: string;
  creatorName: string;
  creatorCharacterId: string;
  title: string;
  questions: {
    questionId: string;
    questionText: string;
    emoji: string;
    options: { id: string; text: string; emoji: string }[];
    correctOptionId: string;
  }[];
  createdAt: string;
  submissions: {
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
  }[];
  themeColor?: string;
}

function loadQuizzes(): Record<string, StoredQuiz> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading quizzes data file:', err);
  }
  return {};
}

function saveQuizzes(quizzes: Record<string, StoredQuiz>) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(quizzes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving quizzes data file:', err);
  }
}

// In-memory cache synced with disk
let quizzesDb = loadQuizzes();

function findQuizByIdOrCode(query: string): StoredQuiz | undefined {
  if (!query) return undefined;
  const clean = query.trim().toLowerCase();

  // 1. Direct key match
  if (quizzesDb[clean]) return quizzesDb[clean];
  if (quizzesDb[query.trim()]) return quizzesDb[query.trim()];

  // 2. Iterate and match code or id
  const all = Object.values(quizzesDb);
  return all.find((q) => {
    if (q.code && q.code.toLowerCase() === clean) return true;
    if (q.id && q.id.toLowerCase() === clean) return true;
    // Strip quiz_ prefix
    const cleanNoPrefix = clean.replace(/^quiz_/, '');
    if (q.code && q.code.toLowerCase() === cleanNoPrefix) return true;
    if (q.id && q.id.toLowerCase().replace(/^quiz_/, '') === cleanNoPrefix) return true;
    return false;
  });
}

// API Endpoints
// 1. Create a Quiz
app.post('/api/quizzes', (req, res) => {
  try {
    const { creatorName, creatorCharacterId, title, questions, themeColor } = req.body;

    if (!creatorName || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'بيانات التحدي غير مكتملة' });
    }

    // Generate cute 5-digit numeric Challenge Code e.g. "74921"
    const code = String(Math.floor(10000 + Math.random() * 90000));
    const id = `quiz_${code}`;

    const newQuiz: StoredQuiz = {
      id,
      code,
      creatorName: creatorName.trim(),
      creatorCharacterId: creatorCharacterId || 'basbous',
      title: title || `تحدي صداقة ${creatorName}`,
      questions,
      createdAt: new Date().toISOString(),
      submissions: [],
      themeColor: themeColor || '#ec4899',
    };

    quizzesDb[id] = newQuiz;
    saveQuizzes(quizzesDb);

    return res.json({ success: true, quiz: newQuiz });
  } catch (err) {
    console.error('Error creating quiz:', err);
    return res.status(500).json({ error: 'حدث خطأ أثناء حفظ التحدي' });
  }
});

// Search challenge by code (returns preview info)
app.get('/api/quizzes/search/:code', (req, res) => {
  const quiz = findQuizByIdOrCode(req.params.code);
  if (!quiz) {
    return res.status(404).json({ error: 'لم يتم العثور على تحدٍ بهذا الكود' });
  }

  return res.json({
    found: true,
    quiz: {
      id: quiz.id,
      code: quiz.code || quiz.id.replace('quiz_', ''),
      creatorName: quiz.creatorName,
      creatorCharacterId: quiz.creatorCharacterId,
      title: quiz.title,
      totalQuestions: quiz.questions.length,
      createdAt: quiz.createdAt,
    },
  });
});

// 2. Get Quiz for Playing (friend gets questions without revealing correct answers in advance)
app.get('/api/quizzes/:id', (req, res) => {
  const quiz = findQuizByIdOrCode(req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: 'لم يتم العثور على هذا التحدي' });
  }

  // If creator requested full quiz (e.g. with view=creator)
  const isCreator = req.query.role === 'creator';

  if (isCreator) {
    return res.json({ quiz });
  }

  // For friends, remove correctOptionId so they can't cheat by looking at network payload
  const sanitizedQuestions = quiz.questions.map((q) => ({
    questionId: q.questionId,
    questionText: q.questionText,
    emoji: q.emoji,
    options: q.options,
  }));

  return res.json({
    quiz: {
      id: quiz.id,
      code: quiz.code || quiz.id.replace('quiz_', ''),
      creatorName: quiz.creatorName,
      creatorCharacterId: quiz.creatorCharacterId,
      title: quiz.title,
      questions: sanitizedQuestions,
      createdAt: quiz.createdAt,
      totalQuestions: quiz.questions.length,
      themeColor: quiz.themeColor,
    },
  });
});

// 3. Submit Friend's Answers
app.post('/api/quizzes/:id/submit', (req, res) => {
  try {
    const quiz = findQuizByIdOrCode(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'لم يتم العثور على هذا التحدي' });
    }

    const { friendName, characterId, answers, friendComment } = req.body;
    if (!friendName || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'بيانات الإجابة غير مكتملة' });
    }

    // Evaluate answers
    let score = 0;
    const evaluatedAnswers = answers.map((ans: { questionId: string; selectedOptionId: string }) => {
      const originalQ = quiz.questions.find((q) => q.questionId === ans.questionId);
      const isCorrect = originalQ ? originalQ.correctOptionId === ans.selectedOptionId : false;
      if (isCorrect) score++;

      return {
        questionId: ans.questionId,
        selectedOptionId: ans.selectedOptionId,
        correctOptionId: originalQ?.correctOptionId,
        isCorrect,
      };
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const submission = {
      id: submissionId,
      friendName: friendName.trim(),
      characterId: characterId || 'arnoub',
      score,
      totalQuestions,
      percentage,
      answers: evaluatedAnswers,
      completedAt: new Date().toISOString(),
      friendComment: friendComment ? friendComment.trim() : undefined,
    };

    quiz.submissions.unshift(submission);
    quizzesDb[quiz.id] = quiz;
    saveQuizzes(quizzesDb);

    return res.json({
      success: true,
      submission,
      quizDetails: {
        creatorName: quiz.creatorName,
        creatorCharacterId: quiz.creatorCharacterId,
        questions: quiz.questions, // return questions with correct answers for review screen
      },
    });
  } catch (err) {
    console.error('Error submitting quiz answers:', err);
    return res.status(500).json({ error: 'حدث خطأ أثناء معالجة النتيجة' });
  }
});

// 4. Get Quiz Results / Leaderboard (for Creator & Friends)
app.get('/api/quizzes/:id/results', (req, res) => {
  const quiz = findQuizByIdOrCode(req.params.id);
  if (!quiz) {
    return res.status(404).json({ error: 'لم يتم العثور على هذا التحدي' });
  }

  return res.json({
    quizId: quiz.id,
    creatorName: quiz.creatorName,
    creatorCharacterId: quiz.creatorCharacterId,
    title: quiz.title,
    questions: quiz.questions,
    submissions: quiz.submissions,
    totalQuestions: quiz.questions.length,
  });
});

// 5. Delete or reset a submission if creator wants to clean up
app.delete('/api/quizzes/:id/submissions/:subId', (req, res) => {
  const quiz = quizzesDb[req.params.id];
  if (!quiz) {
    return res.status(404).json({ error: 'لم يتم العثور على التحدي' });
  }
  quiz.submissions = quiz.submissions.filter((s) => s.id !== req.params.subId);
  saveQuizzes(quizzesDb);
  return res.json({ success: true });
});

// Start server with Vite middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
