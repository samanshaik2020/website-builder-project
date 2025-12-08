import { PortfolioTemplate, PortfolioModernDark, portfolioConfig } from '@/components/templates/portfolio';
import LoanLandingTemplate from '@/components/templates/loan-landing';
import { loanLandingConfig } from '@/components/templates/loan-landing';
import { AgencyTemplate, agencyConfig } from '@/components/templates/agency';
import { AIPhotoStudioTemplate, aiPhotoStudioConfig } from '@/components/templates/ai-photo-studio';
import { CatFoodTemplate, catFoodConfig } from '@/components/templates/cat-food';
import { GroceryDeliveryTemplate, groceryDeliveryConfig } from '@/components/templates/grocery-delivery';
import { SaasLandingTemplate, SaasVibrantGradient, saasLandingConfig } from '@/components/templates/saas-landing';
import { SamsungProductTemplate, samsungProductConfig } from '@/components/templates/samsung-product';
import FurnitureStoreTemplate from '@/components/templates/furniture-store';
import { furnitureStoreConfig } from '@/components/templates/furniture-store';
import MeditationAppTemplate from '@/components/templates/meditation-app';
import { meditationAppConfig } from '@/components/templates/meditation-app';
import { PhoneFunTemplate, phoneFunConfig } from '@/components/templates/phone-fun';
import { CreativeCommunityTemplate, creativeCommunityConfig } from '@/components/templates/creative-community';
import { GeneralContentTemplate, generalContentConfig } from '@/components/templates/general-content';
import { SqupagePromoTemplate, squpagePromoConfig } from '@/components/templates/squpage-promo';
import { LegalCenterTemplate, legalCenterConfig } from '@/components/templates/legal-center';
import { FlashSaleTemplate, flashSaleConfig } from '@/components/templates/flash-sale';
import { MegaDiscountTemplate, megaDiscountConfig } from '@/components/templates/mega-discount';
import { FestivalSaleTemplate, festivalSaleConfig } from '@/components/templates/festival-sale';
import { MobileShopTemplate, mobileShopConfig } from '@/components/templates/mobile-shop';
import { GadgetDealsTemplate, gadgetDealsConfig } from '@/components/templates/gadget-deals';
import { GalaxyPhoneTemplate, galaxyPhoneConfig } from '@/components/templates/galaxy-phone';
import { GlassmorphismProductTemplate, glassmorphismProductConfig } from '@/components/templates/glassmorphism-product';

export const templates = {
  portfolio: {
    component: PortfolioTemplate,
    config: portfolioConfig,
  },
  'portfolio-modern-dark': {
    component: PortfolioModernDark,
    config: {
      ...portfolioConfig,
      id: 'portfolio-modern-dark',
      name: 'Portfolio - Modern Dark',
      description: 'A sleek, modern dark theme portfolio with cyan accents',
      thumbnail: '/Portfolio Modern Dark.png',
    },
  },
  'saas-landing': {
    component: SaasLandingTemplate,
    config: saasLandingConfig,
  },
  'saas-vibrant-gradient': {
    component: SaasVibrantGradient,
    config: {
      ...saasLandingConfig,
      id: 'saas-vibrant-gradient',
      name: 'SaaS - Vibrant Gradient',
      description: 'Modern SaaS landing page with vibrant pink, purple, and blue gradients',
      thumbnail: '/SaaS - Vibrant Gradient.png',
    },
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
  'phone-fun': {
    component: PhoneFunTemplate,
    config: phoneFunConfig,
  },
  'creative-community': {
    component: CreativeCommunityTemplate,
    config: creativeCommunityConfig,
  },
  'general-content': {
    component: GeneralContentTemplate,
    config: generalContentConfig,
  },
  'squpage-promo': {
    component: SqupagePromoTemplate,
    config: squpagePromoConfig,
  },
  'legal-center': {
    component: LegalCenterTemplate,
    config: legalCenterConfig,
  },
  'flash-sale': {
    component: FlashSaleTemplate,
    config: flashSaleConfig,
  },
  'mega-discount': {
    component: MegaDiscountTemplate,
    config: megaDiscountConfig,
  },
  'festival-sale': {
    component: FestivalSaleTemplate,
    config: festivalSaleConfig,
  },
  'mobile-shop': {
    component: MobileShopTemplate,
    config: mobileShopConfig,
  },
  'gadget-deals': {
    component: GadgetDealsTemplate,
    config: gadgetDealsConfig,
  },
  'galaxy-phone': {
    component: GalaxyPhoneTemplate,
    config: galaxyPhoneConfig,
  },
  'glassmorphism-product': {
    component: GlassmorphismProductTemplate,
    config: glassmorphismProductConfig,
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
