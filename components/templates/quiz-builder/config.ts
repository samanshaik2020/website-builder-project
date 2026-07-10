export const quizBuilderConfig = {
  id: 'quiz-builder',
  name: 'Qualification Quiz',
  category: 'Interactive',
  description: 'Build a branded multi-step quiz with questions, results, and offer cards.',
  thumbnail: '/quiz-builder-preview.svg',
  editableFields: [],
} as const;

export type QuizBuilderConfig = typeof quizBuilderConfig;
