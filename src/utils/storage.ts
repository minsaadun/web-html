import { UserProgress } from '../types';

const STORAGE_KEY = 'htmllab_student_progress_stm21673';

export const DEFAULT_PROGRESS: UserProgress = {
  basicsCompleted: false,
  structurePuzzleSolved: false,
  elementsExplored: [],
  formBuilderCompleted: false,
  getPostSimulated: false,
  playgroundTasksCompleted: [],
  predictCompleted: [],
  debugChallengesSolved: [],
  quizScore: null,
  quizTotal: 10,
  challengeCompleted: false,
  studentName: '',
  studentMatrix: '',
  collegeName: 'Kolej Komuniti'
};

export function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
  } catch (err) {
    console.error('Failed to load progress from localStorage', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear progress', err);
  }
}

export function resetProgress(): UserProgress {
  clearProgress();
  return DEFAULT_PROGRESS;
}
