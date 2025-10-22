import { PortfolioTemplate, portfolioConfig } from '@/components/templates/portfolio';
import LoanLandingTemplate from '@/components/templates/loan-landing';
import { loanLandingConfig } from '@/components/templates/loan-landing';
import { AgencyTemplate, agencyConfig } from '@/components/templates/agency';
import { AIPhotoStudioTemplate, aiPhotoStudioConfig } from '@/components/templates/ai-photo-studio';
import { CatFoodTemplate, catFoodConfig } from '@/components/templates/cat-food';
import { GroceryDeliveryTemplate, groceryDeliveryConfig } from '@/components/templates/grocery-delivery';
import { SaasLandingTemplate, saasLandingConfig } from '@/components/templates/saas-landing';
import { SamsungProductTemplate, samsungProductConfig } from '@/components/templates/samsung-product';
import FurnitureStoreTemplate from '@/components/templates/furniture-store';
import { furnitureStoreConfig } from '@/components/templates/furniture-store';
import MeditationAppTemplate from '@/components/templates/meditation-app';
import { meditationAppConfig } from '@/components/templates/meditation-app';

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
  'samsung-product': {
    component: SamsungProductTemplate,
    config: samsungProductConfig,
  },
  'furniture-store': {
    component: FurnitureStoreTemplate,
    config: furnitureStoreConfig,
  },
  'meditation-app': {
    component: MeditationAppTemplate,
    config: meditationAppConfig,
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
