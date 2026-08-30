export type TabType = 
  | 'home'
  | 'basics'
  | 'elements'
  | 'forms'
  | 'get-post'
  | 'playground'
  | 'predict'
  | 'debug'
  | 'quiz'
  | 'challenge'
  | 'group-activity'
  | 'mistakes-tips'
  | 'progress';

export interface UserProgress {
  basicsCompleted: boolean;
  structurePuzzleSolved: boolean;
  elementsExplored: string[];
  formBuilderCompleted: boolean;
  getPostSimulated: boolean;
  playgroundTasksCompleted: number[];
  predictCompleted: number[];
  debugChallengesSolved: number[];
  quizScore: number | null;
  quizTotal: number;
  challengeCompleted: boolean;
  studentName?: string;
  studentMatrix?: string;
  collegeName?: string;
}

export interface HtmlElementInfo {
  tag: string;
  name: string;
  category: 'text' | 'structural' | 'media' | 'data' | 'nav';
  description: string;
  syntax: string;
  example: string;
  outputPreview: string;
  explanation: string;
}

export interface DebugChallenge {
  id: number;
  title: string;
  errorType: string;
  initialCode: string;
  targetCriteria: (code: string) => boolean;
  hint: string;
  solution: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  type: 'mcq' | 'tf' | 'identify' | 'predict' | 'error';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FormComponentItem {
  id: string;
  type: 'text' | 'radio' | 'select' | 'textarea' | 'password' | 'button';
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
}
