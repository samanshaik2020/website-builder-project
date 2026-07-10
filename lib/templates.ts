
import { CustomHtmlTemplate, customHtmlConfig } from '@/components/templates/custom-html';
import { QuizBuilderTemplate, quizBuilderConfig } from '@/components/templates/quiz-builder';


export const templates = {
  'custom-html': {
    component: CustomHtmlTemplate,
    config: customHtmlConfig,
  },
  'quiz-builder': {
    component: QuizBuilderTemplate,
    config: quizBuilderConfig,
  },

} as const;

export type TemplateId = keyof typeof templates;

export const getAllTemplates = () => {
  return Object.entries(templates).map(([templateId, template]) => ({
    ...template.config,
    id: templateId as TemplateId,
  }));
};

export const getTemplateById = (id: TemplateId) => {
  return templates[id];
};
