import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { CreateQuiz } from './components/CreateQuiz';
import { PlayQuiz } from './components/PlayQuiz';
import { QuizResults } from './components/QuizResults';
import { Leaderboard } from './components/Leaderboard';
import { ShareModal } from './components/ShareModal';
import { PassAndPlayModal } from './components/PassAndPlayModal';
import { AchievementsModal } from './components/AchievementsModal';
import { AchievementToast } from './components/AchievementToast';
import { CharactersRosterModal } from './components/CharactersRosterModal';
import { Quiz, UserProfile, AchievementDefinition } from './types';
import { UnifiedChallenge } from './data/allChallenges';
import { fetchQuizForPlay } from './utils/api';
import { getUserProfile, recordQuizCompleted, updateUserNameAndAvatar } from './utils/userProfile';
import { sound } from './utils/sound';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'play' | 'results' | 'leaderboard' | 'pass-and-play'>('home');

  // User Profile with Points (Starts with 0 points) and Achievements
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getUserProfile());

  // Currently loaded quiz for playing or viewing
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  // Friend submission result for results view
  const [latestResult, setLatestResult] = useState<{
    submission: any;
    quizDetails: any;
  } | null>(null);
  const [latestPointsEarned, setLatestPointsEarned] = useState<number>(0);

  // Modals state
  const [shareModalQuiz, setShareModalQuiz] = useState<Quiz | null>(null);
  const [isPassAndPlayOpen, setIsPassAndPlayOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);

  // Unlocked Achievement Toast
  const [activeToast, setActiveToast] = useState<{
    achievement: AchievementDefinition;
    points: number;
  } | null>(null);

  // Loading indicator for URL params
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Refresh profile state
  const refreshProfile = () => {
    setUserProfile(getUserProfile());
  };

  // Detect URL parameter (?quiz=xxx) on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizParam = params.get('quiz');

    if (quizParam) {
      loadQuizById(quizParam);
    }
  }, []);

  const loadQuizById = async (id: string) => {
    setIsLoadingQuiz(true);
    setLoadError(null);
    try {
      const loaded = await fetchQuizForPlay(id);
      if (loaded) {
        setActiveQuiz(loaded);
        setActiveQuizId(loaded.id);
        setCurrentView('play');
      } else {
        setLoadError('لم نتمكن من العثور على هذا التحدي. ربما انتهت صلاحيته أو الرابط غير صحيح.');
      }
    } catch {
      setLoadError('حدث خطأ أثناء تحميل التحدي.');
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  // When a creator finishes creating a quiz
  const handleQuizCreated = (newQuiz: Quiz) => {
    refreshProfile();
    setActiveQuiz(newQuiz);
    setActiveQuizId(newQuiz.id);
    setShareModalQuiz(newQuiz);
    setCurrentView('leaderboard');
  };

  // When a friend finishes answering
  const handleQuizFinished = (resultData: { submission: any; quizDetails: any }) => {
    const { submission } = resultData;
    // Award points and check achievements
    const { profile, newAchievements, pointsEarned } = recordQuizCompleted(
      submission.score,
      submission.totalQuestions
    );

    setUserProfile(profile);
    setLatestPointsEarned(pointsEarned);
    setLatestResult(resultData);
    setCurrentView('results');

    // Trigger toast if new achievement was unlocked
    if (newAchievements.length > 0) {
      setActiveToast({
        achievement: newAchievements[0].achievement,
        points: newAchievements[0].pointsAdded,
      });
    }
  };

  const handleSelectCharacter = (charId: string) => {
    const updated = updateUserNameAndAvatar(userProfile.name, charId);
    setUserProfile(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/70 via-purple-50/50 to-amber-50/60 flex flex-col font-['Tajawal',sans-serif]">
      {/* Header Bar with Points Badge */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'pass-and-play') {
            setIsPassAndPlayOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        activeQuizId={activeQuizId}
        userPoints={userProfile.points}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 sm:py-6">
        {/* Loading Spinner for Shared Quiz Link */}
        {isLoadingQuiz && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-base font-bold text-pink-700">جارٍ فتح تحدي الصداقة الكيوت... 🐾</p>
          </div>
        )}

        {/* Load Error */}
        {loadError && (
          <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-3xl border-2 border-rose-200 text-center space-y-4 shadow-lg animate-fade-in">
            <span className="text-4xl">😿</span>
            <h3 className="text-lg font-black text-rose-700 font-['Cairo',sans-serif]">عذراً!</h3>
            <p className="text-xs text-slate-600">{loadError}</p>
            <button
              onClick={() => {
                setLoadError(null);
                setCurrentView('home');
                window.history.replaceState({}, '', '/');
              }}
              className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs cursor-pointer"
            >
              الذهاب إلى الصفحة الرئيسية
            </button>
          </div>
        )}

        {/* VIEWS WITH CUTE ANIMATIONS */}
        {!isLoadingQuiz && !loadError && (
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                <Home
                  onStartCreate={() => setCurrentView('create')}
                  onOpenLeaderboard={() => setCurrentView('leaderboard')}
                  onOpenPassAndPlay={() => setIsPassAndPlayOpen(true)}
                  onEnterQuizCode={(code) => loadQuizById(code)}
                  userPoints={userProfile.points}
                  onOpenAchievements={() => setIsAchievementsOpen(true)}
                />
              </motion.div>
            )}

            {currentView === 'create' && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                <CreateQuiz
                  onQuizCreated={handleQuizCreated}
                  onCancel={() => setCurrentView('home')}
                />
              </motion.div>
            )}

            {currentView === 'play' && activeQuiz && (
              <motion.div
                key={`play_${activeQuiz.id}`}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                <PlayQuiz
                  quiz={activeQuiz}
                  onQuizFinished={handleQuizFinished}
                  onGoHome={() => setCurrentView('home')}
                />
              </motion.div>
            )}

            {currentView === 'results' && latestResult && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <QuizResults
                  submission={latestResult.submission}
                  quizDetails={latestResult.quizDetails}
                  pointsEarned={latestPointsEarned}
                  onCreateOwnQuiz={() => setCurrentView('create')}
                  onViewLeaderboard={() => {
                    if (activeQuizId) {
                      setCurrentView('leaderboard');
                    } else {
                      setCurrentView('home');
                    }
                  }}
                  onOpenAchievements={() => setIsAchievementsOpen(true)}
                />
              </motion.div>
            )}

            {currentView === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                <Leaderboard
                  initialQuizId={activeQuizId}
                  onOpenShareModal={(quiz) => setShareModalQuiz(quiz)}
                  onCreateNewQuiz={() => setCurrentView('create')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-100 py-6 text-center text-xs text-slate-500 bg-white/40">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-600">
            تحدي الأصدقاء الكيوت 🐾 - مصنوع باللغة العربية الفصحى للمرح والتنافس اللطيف بين الأصدقاء 💖
          </p>
          <button
            onClick={() => {
              sound.playPop();
              setIsRosterOpen(true);
            }}
            className="flex items-center gap-2 font-black text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 transition cursor-pointer mx-auto sm:mx-0"
          >
            <span>✨ استعراض شخصيات التحدي (8 شخصيات)</span>
          </button>
        </div>
      </footer>

      {/* Share Modal */}
      {shareModalQuiz && (
        <ShareModal
          quizId={shareModalQuiz.id}
          quizCode={shareModalQuiz.code || shareModalQuiz.id.replace('quiz_', '')}
          creatorName={shareModalQuiz.creatorName}
          creatorCharacterId={shareModalQuiz.creatorCharacterId}
          questionCount={shareModalQuiz.questions.length}
          onClose={() => setShareModalQuiz(null)}
          onViewResults={() => {
            setShareModalQuiz(null);
            setActiveQuizId(shareModalQuiz.id);
            setCurrentView('leaderboard');
          }}
        />
      )}

      {/* Pass and Play Modal */}
      {isPassAndPlayOpen && (
        <PassAndPlayModal
          onClose={() => setIsPassAndPlayOpen(false)}
          onGameFinished={({ pointsEarned, newAchievements }) => {
            refreshProfile();
            if (newAchievements.length > 0) {
              setActiveToast({
                achievement: newAchievements[0].achievement,
                points: newAchievements[0].pointsAdded,
              });
            }
          }}
        />
      )}

      {/* Achievements & Points Modal */}
      {isAchievementsOpen && (
        <AchievementsModal
          profile={userProfile}
          onClose={() => setIsAchievementsOpen(false)}
        />
      )}

      {/* Character Roster Locker Modal */}
      {isRosterOpen && (
        <CharactersRosterModal
          selectedCharacterId={userProfile.characterId}
          onSelectCharacter={handleSelectCharacter}
          onClose={() => setIsRosterOpen(false)}
        />
      )}

      {/* Unlocked Achievement Toast Notification */}
      {activeToast && (
        <AchievementToast
          achievement={activeToast.achievement}
          pointsEarned={activeToast.points}
          onDismiss={() => setActiveToast(null)}
          onOpenAchievements={() => {
            setActiveToast(null);
            setIsAchievementsOpen(true);
          }}
        />
      )}
    </div>
  );
}
