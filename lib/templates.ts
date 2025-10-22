import { PortfolioTemplate, portfolioConfig } from '@/components/templates/portfolio';
import LoanLandingTemplate from '@/components/templates/loan-landing';
import { loanLandingConfig } from '@/components/templates/loan-landing';
import { AgencyTemplate, agencyConfig } from '@/components/templates/agency';
import { AIPhotoStudioTemplate, aiPhotoStudioConfig } from '@/components/templates/ai-photo-studio';
import { CatFoodTemplate, catFoodConfig } from '@/components/templates/cat-food';
import { GroceryDeliveryTemplate, groceryDeliveryConfig } from '@/components/templates/grocery-delivery';
import { SaasLandingTemplate, saasLandingConfig } from '@/components/templates/saas-landing';

export const templates = {
  portfolio: {
    component: PortfolioTemplate,
    config: portfolioConfig,
  },
  'saas-landing': {
    component: SaasLandingTemplate,
    config: saasLandingConfig,
  },
  agency: {
    component: AgencyTemplate,
    config: agencyConfig,
  },
  'ai-photo-studio': {
    component: AIPhotoStudioTemplate,
    config: aiPhotoStudioConfig,
  },
  'cat-food': {
    component: CatFoodTemplate,
    config: catFoodConfig,
  },
  'grocery-delivery': {
    component: GroceryDeliveryTemplate,
    config: groceryDeliveryConfig,
  },
  'loan-landing': {
    component: LoanLandingTemplate,
    config: loanLandingConfig,
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
