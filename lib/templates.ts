
import { CatFoodTemplate, catFoodConfig } from '@/components/templates/cat-food';
import { GroceryDeliveryTemplate, groceryDeliveryConfig } from '@/components/templates/grocery-delivery';

import { SamsungProductTemplate, samsungProductConfig } from '@/components/templates/samsung-product';
import FurnitureStoreTemplate from '@/components/templates/furniture-store';
import { furnitureStoreConfig } from '@/components/templates/furniture-store';

import { PhoneFunTemplate, phoneFunConfig } from '@/components/templates/phone-fun';

import { FlashSaleTemplate, flashSaleConfig } from '@/components/templates/flash-sale';
import { MegaDiscountTemplate, megaDiscountConfig } from '@/components/templates/mega-discount';
import { FestivalSaleTemplate, festivalSaleConfig } from '@/components/templates/festival-sale';
import { MobileShopTemplate, mobileShopConfig } from '@/components/templates/mobile-shop';
import { GadgetDealsTemplate, gadgetDealsConfig } from '@/components/templates/gadget-deals';
import { GalaxyPhoneTemplate, galaxyPhoneConfig } from '@/components/templates/galaxy-phone';
import { GlassmorphismProductTemplate, glassmorphismProductConfig } from '@/components/templates/glassmorphism-product';
import { PhotoFolioTemplate, photofolioConfig } from '@/components/templates/photofolio';
import { QuizNewTemplate, quizNewConfig } from '@/components/templates/quiz-new';

import { CustomHtmlTemplate, customHtmlConfig } from '@/components/templates/custom-html';


export const templates = {
  'custom-html': {
    component: CustomHtmlTemplate,
    config: customHtmlConfig,
  },

  'cat-food': {
    component: CatFoodTemplate,
    config: catFoodConfig,
  },
  'grocery-delivery': {
    component: GroceryDeliveryTemplate,
    config: groceryDeliveryConfig,
  },

  'samsung-product': {
    component: SamsungProductTemplate,
    config: samsungProductConfig,
  },
  'furniture-store': {
    component: FurnitureStoreTemplate,
    config: furnitureStoreConfig,
  },

  'phone-fun': {
    component: PhoneFunTemplate,
    config: phoneFunConfig,
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
  photofolio: {
    component: PhotoFolioTemplate,
    config: photofolioConfig,
  },
  'quiz-new': {
    component: QuizNewTemplate,
    config: quizNewConfig,
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
