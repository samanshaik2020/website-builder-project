import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini API
// Note: In production, move this to a server-side API route for security
const API_KEY = "AIzaSyDvN7OkIaHqzY34B3HdKFvowLk_tO6I2mk"
const genAI = new GoogleGenerativeAI(API_KEY)

export interface ElementContent {
  id: string
  content: string
}

export interface GeneratedContent {
  elements: ElementContent[]
}

/**
 * Generate content for SaaS Pro template using Gemini AI
 */
export async function generateSaaSProContent(
  topic: string,
  theme: { name: string; tone: string }
): Promise<GeneratedContent> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const prompt = `You are a professional marketing copywriter creating content for a SaaS landing page.

TOPIC: ${topic}
THEME: ${theme.name}
TONE: ${theme.tone}

Generate compelling, conversion-focused copy for a complete SaaS landing page. The tone should be ${theme.tone}.

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "brand": "Company/Product Name",
  "nav_1": "Features",
  "nav_2": "Solutions", 
  "nav_3": "Pricing",
  "nav_4": "Resources",
  "nav_5": "Company",
  "hero_badge": "Announcement badge text (e.g., ✨ New: AI-Powered Analytics)",
  "hero_headline": "Main headline (45-65 characters, compelling and specific)",
  "hero_subheadline": "Supporting text (120-180 characters, explain the value proposition)",
  "hero_cta_primary": "Primary CTA button text (2-4 words)",
  "hero_cta_secondary": "Secondary CTA button text (2-4 words)",
  "hero_note": "Small note under CTAs (e.g., No credit card required)",
  "logos_heading": "Trusted by companies text",
  "features_eyebrow": "Small text above features section",
  "features_headline": "Features section headline",
  "features_subheadline": "Features section description",
  "feature_1_icon": "Single emoji for feature 1",
  "feature_1_title": "Feature 1 title (3-5 words)",
  "feature_1_description": "Feature 1 description (80-120 characters)",
  "feature_2_icon": "Single emoji for feature 2",
  "feature_2_title": "Feature 2 title (3-5 words)",
  "feature_2_description": "Feature 2 description (80-120 characters)",
  "feature_3_icon": "Single emoji for feature 3",
  "feature_3_title": "Feature 3 title (3-5 words)",
  "feature_3_description": "Feature 3 description (80-120 characters)",
  "feature_4_icon": "Single emoji for feature 4",
  "feature_4_title": "Feature 4 title (3-5 words)",
  "feature_4_description": "Feature 4 description (80-120 characters)",
  "feature_5_icon": "Single emoji for feature 5",
  "feature_5_title": "Feature 5 title (3-5 words)",
  "feature_5_description": "Feature 5 description (80-120 characters)",
  "feature_6_icon": "Single emoji for feature 6",
  "feature_6_title": "Feature 6 title (3-5 words)",
  "feature_6_description": "Feature 6 description (80-120 characters)",
  "stats_headline": "Stats section headline",
  "stats_subheadline": "Stats section description",
  "stat_1_number": "Metric 1 (e.g., 10K+)",
  "stat_1_label": "Metric 1 label",
  "stat_2_number": "Metric 2 (e.g., 99.9%)",
  "stat_2_label": "Metric 2 label",
  "stat_3_number": "Metric 3 (e.g., 4.9/5)",
  "stat_3_label": "Metric 3 label",
  "stat_4_number": "Metric 4 (e.g., 24/7)",
  "stat_4_label": "Metric 4 label",
  "testimonials_eyebrow": "Small text above testimonials",
  "testimonials_headline": "Testimonials section headline",
  "testimonial_1_quote": "Customer testimonial 1 (100-150 characters)",
  "testimonial_1_name": "Customer 1 name",
  "testimonial_1_title": "Customer 1 job title",
  "testimonial_2_quote": "Customer testimonial 2 (100-150 characters)",
  "testimonial_2_name": "Customer 2 name",
  "testimonial_2_title": "Customer 2 job title",
  "testimonial_3_quote": "Customer testimonial 3 (100-150 characters)",
  "testimonial_3_name": "Customer 3 name",
  "testimonial_3_title": "Customer 3 job title",
  "pricing_eyebrow": "Small text above pricing",
  "pricing_headline": "Pricing section headline",
  "pricing_subheadline": "Pricing section description",
  "pricing_1_name": "Starter",
  "pricing_1_price": "$29",
  "pricing_1_description": "Plan 1 description",
  "pricing_2_badge": "Most Popular",
  "pricing_2_name": "Professional",
  "pricing_2_price": "$79",
  "pricing_2_description": "Plan 2 description",
  "pricing_3_name": "Enterprise",
  "pricing_3_price": "$199",
  "pricing_3_description": "Plan 3 description",
  "cta_headline": "Final CTA headline",
  "cta_subheadline": "Final CTA description",
  "cta_primary": "Primary CTA button",
  "cta_secondary": "Secondary CTA button",
  "footer_tagline": "Company tagline for footer"
}

Make sure all content is relevant to: ${topic}
Use a ${theme.tone} tone throughout.
Be creative, specific, and conversion-focused.`

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Clean the response - remove markdown code blocks if present
    let cleanedText = responseText.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/```\n?/g, "")
    }

    const data = JSON.parse(cleanedText)

    // Map the data to element IDs
    const elements: ElementContent[] = [
      { id: "saas_pro_brand", content: data.brand },
      { id: "saas_pro_nav_1", content: data.nav_1 },
      { id: "saas_pro_nav_2", content: data.nav_2 },
      { id: "saas_pro_nav_3", content: data.nav_3 },
      { id: "saas_pro_nav_4", content: data.nav_4 },
      { id: "saas_pro_nav_5", content: data.nav_5 },
      { id: "saas_pro_nav_signin", content: "Sign In" },
      { id: "saas_pro_nav_cta", content: "Get Started Free" },
      { id: "saas_pro_hero_badge", content: data.hero_badge },
      { id: "saas_pro_hero_headline", content: data.hero_headline },
      { id: "saas_pro_hero_subheadline", content: data.hero_subheadline },
      { id: "saas_pro_hero_cta_primary", content: data.hero_cta_primary },
      { id: "saas_pro_hero_cta_secondary", content: data.hero_cta_secondary },
      { id: "saas_pro_hero_note", content: data.hero_note },
      { id: "saas_pro_logos_heading", content: data.logos_heading },
      { id: "saas_pro_features_eyebrow", content: data.features_eyebrow },
      { id: "saas_pro_features_headline", content: data.features_headline },
      { id: "saas_pro_features_subheadline", content: data.features_subheadline },
      { id: "saas_pro_feature_1_icon", content: data.feature_1_icon },
      { id: "saas_pro_feature_1_title", content: data.feature_1_title },
      { id: "saas_pro_feature_1_description", content: data.feature_1_description },
      { id: "saas_pro_feature_2_icon", content: data.feature_2_icon },
      { id: "saas_pro_feature_2_title", content: data.feature_2_title },
      { id: "saas_pro_feature_2_description", content: data.feature_2_description },
      { id: "saas_pro_feature_3_icon", content: data.feature_3_icon },
      { id: "saas_pro_feature_3_title", content: data.feature_3_title },
      { id: "saas_pro_feature_3_description", content: data.feature_3_description },
      { id: "saas_pro_feature_4_icon", content: data.feature_4_icon },
      { id: "saas_pro_feature_4_title", content: data.feature_4_title },
      { id: "saas_pro_feature_4_description", content: data.feature_4_description },
      { id: "saas_pro_feature_5_icon", content: data.feature_5_icon },
      { id: "saas_pro_feature_5_title", content: data.feature_5_title },
      { id: "saas_pro_feature_5_description", content: data.feature_5_description },
      { id: "saas_pro_feature_6_icon", content: data.feature_6_icon },
      { id: "saas_pro_feature_6_title", content: data.feature_6_title },
      { id: "saas_pro_feature_6_description", content: data.feature_6_description },
      { id: "saas_pro_stats_headline", content: data.stats_headline },
      { id: "saas_pro_stats_subheadline", content: data.stats_subheadline },
      { id: "saas_pro_stat_1_number", content: data.stat_1_number },
      { id: "saas_pro_stat_1_label", content: data.stat_1_label },
      { id: "saas_pro_stat_2_number", content: data.stat_2_number },
      { id: "saas_pro_stat_2_label", content: data.stat_2_label },
      { id: "saas_pro_stat_3_number", content: data.stat_3_number },
      { id: "saas_pro_stat_3_label", content: data.stat_3_label },
      { id: "saas_pro_stat_4_number", content: data.stat_4_number },
      { id: "saas_pro_stat_4_label", content: data.stat_4_label },
      { id: "saas_pro_testimonials_eyebrow", content: data.testimonials_eyebrow },
      { id: "saas_pro_testimonials_headline", content: data.testimonials_headline },
      { id: "saas_pro_testimonial_1_rating", content: "⭐⭐⭐⭐⭐" },
      { id: "saas_pro_testimonial_1_quote", content: data.testimonial_1_quote },
      { id: "saas_pro_testimonial_1_name", content: data.testimonial_1_name },
      { id: "saas_pro_testimonial_1_title", content: data.testimonial_1_title },
      { id: "saas_pro_testimonial_2_rating", content: "⭐⭐⭐⭐⭐" },
      { id: "saas_pro_testimonial_2_quote", content: data.testimonial_2_quote },
      { id: "saas_pro_testimonial_2_name", content: data.testimonial_2_name },
      { id: "saas_pro_testimonial_2_title", content: data.testimonial_2_title },
      { id: "saas_pro_testimonial_3_rating", content: "⭐⭐⭐⭐⭐" },
      { id: "saas_pro_testimonial_3_quote", content: data.testimonial_3_quote },
      { id: "saas_pro_testimonial_3_name", content: data.testimonial_3_name },
      { id: "saas_pro_testimonial_3_title", content: data.testimonial_3_title },
      { id: "saas_pro_pricing_eyebrow", content: data.pricing_eyebrow },
      { id: "saas_pro_pricing_headline", content: data.pricing_headline },
      { id: "saas_pro_pricing_subheadline", content: data.pricing_subheadline },
      { id: "saas_pro_pricing_1_name", content: data.pricing_1_name },
      { id: "saas_pro_pricing_1_price", content: data.pricing_1_price },
      { id: "saas_pro_pricing_1_description", content: data.pricing_1_description },
      { id: "saas_pro_pricing_2_badge", content: data.pricing_2_badge },
      { id: "saas_pro_pricing_2_name", content: data.pricing_2_name },
      { id: "saas_pro_pricing_2_price", content: data.pricing_2_price },
      { id: "saas_pro_pricing_2_description", content: data.pricing_2_description },
      { id: "saas_pro_pricing_3_name", content: data.pricing_3_name },
      { id: "saas_pro_pricing_3_price", content: data.pricing_3_price },
      { id: "saas_pro_pricing_3_description", content: data.pricing_3_description },
      { id: "saas_pro_cta_headline", content: data.cta_headline },
      { id: "saas_pro_cta_subheadline", content: data.cta_subheadline },
      { id: "saas_pro_cta_primary", content: data.cta_primary },
      { id: "saas_pro_cta_secondary", content: data.cta_secondary },
      { id: "saas_pro_footer_brand", content: data.brand },
      { id: "saas_pro_footer_tagline", content: data.footer_tagline },
      { id: "saas_pro_footer_copyright", content: `© 2025 ${data.brand}. All rights reserved.` }
    ]

    return { elements }
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content. Please try again.")
  }
}

/**
 * Generate content for Portfolio Pro template using Gemini AI
 */
export async function generatePortfolioProContent(
  topic: string,
  theme: { name: string; tone: string; profession?: string }
): Promise<GeneratedContent> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const profession = theme.profession || "Designer"
  const prompt = `You are a professional copywriter creating content for a ${profession.toLowerCase()} portfolio website.

TOPIC: ${topic}
THEME: ${theme.name}
TONE: ${theme.tone}
PROFESSION: ${profession}

Generate compelling, professional copy for a complete portfolio website. The tone should be ${theme.tone} and appropriate for a ${profession.toLowerCase()}.

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "brand": "Professional Name (e.g., Alex Morgan, Sarah Kim)",
  "nav_1": "Work",
  "nav_2": "About", 
  "nav_3": "Services",
  "nav_4": "Blog",
  "nav_5": "Contact",
  "hero_greeting": "Greeting text (e.g., Hello, I'm, Welcome, Hi there)",
  "hero_title": "Professional Name (same as brand)",
  "hero_subtitle": "Professional title/role (e.g., Creative Designer & Developer)",
  "hero_description": "Professional description (150-200 characters, compelling and specific to the profession)",
  "hero_cta_primary": "Primary CTA button text (2-4 words)",
  "hero_cta_secondary": "Secondary CTA button text (2-4 words)",
  "work_title": "Portfolio section headline",
  "work_subtitle": "Portfolio section description (80-120 characters)",
  "project_1_title": "Project 1 name",
  "project_1_description": "Project 1 description (80-120 characters)",
  "project_2_title": "Project 2 name", 
  "project_2_description": "Project 2 description (80-120 characters)",
  "project_3_title": "Project 3 name",
  "project_3_description": "Project 3 description (80-120 characters)",
  "about_title": "About section headline",
  "about_description": "About description paragraph 1 (200-250 characters, personal and professional)",
  "about_description_2": "About description paragraph 2 (150-200 characters, interests and personality)",
  "stat_1_number": "Achievement 1 number (e.g., 150+, 5+, 100%)",
  "stat_1_label": "Achievement 1 label (e.g., Projects Completed, Years Experience)",
  "stat_2_number": "Achievement 2 number",
  "stat_2_label": "Achievement 2 label",
  "services_title": "Services section headline",
  "services_subtitle": "Services section description (80-120 characters)",
  "service_1_title": "Service 1 name (relevant to profession)",
  "service_1_description": "Service 1 description (80-120 characters)",
  "service_2_title": "Service 2 name (relevant to profession)",
  "service_2_description": "Service 2 description (80-120 characters)",
  "service_3_title": "Service 3 name (relevant to profession)",
  "service_3_description": "Service 3 description (80-120 characters)",
  "contact_title": "Contact section headline",
  "contact_description": "Contact section description (120-180 characters)",
  "contact_cta_primary": "Primary contact CTA (2-4 words)",
  "contact_cta_secondary": "Secondary contact CTA (2-4 words)",
  "footer_brand": "Professional Name (same as brand)",
  "footer_link_1": "Social link 1 (e.g., LinkedIn, Instagram, GitHub)",
  "footer_link_2": "Social link 2",
  "footer_link_3": "Social link 3", 
  "footer_link_4": "Social link 4",
  "footer_copyright": "Copyright text"
}

Make sure all content is relevant to: ${topic}
Use a ${theme.tone} tone throughout.
Make it specific to a ${profession.toLowerCase()} portfolio.
Be creative, professional, and authentic.`

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Clean the response - remove markdown code blocks if present
    let cleanedText = responseText.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/```\n?/g, "")
    }

    const data = JSON.parse(cleanedText)

    // Map the data to element IDs (using the common portfolio_pro prefix)
    const elements: ElementContent[] = [
      { id: "portfolio_pro_brand", content: data.brand },
      { id: "portfolio_pro_nav_1", content: data.nav_1 },
      { id: "portfolio_pro_nav_2", content: data.nav_2 },
      { id: "portfolio_pro_nav_3", content: data.nav_3 },
      { id: "portfolio_pro_nav_4", content: data.nav_4 },
      { id: "portfolio_pro_nav_5", content: data.nav_5 },
      { id: "portfolio_pro_nav_resume", content: "Resume" },
      { id: "portfolio_pro_nav_cta", content: "Hire Me" },
      { id: "portfolio_pro_hero_greeting", content: data.hero_greeting },
      { id: "portfolio_pro_hero_title", content: data.hero_title },
      { id: "portfolio_pro_hero_subtitle", content: data.hero_subtitle },
      { id: "portfolio_pro_hero_description", content: data.hero_description },
      { id: "portfolio_pro_hero_cta_primary", content: data.hero_cta_primary },
      { id: "portfolio_pro_hero_cta_secondary", content: data.hero_cta_secondary },
      { id: "portfolio_pro_work_title", content: data.work_title },
      { id: "portfolio_pro_work_subtitle", content: data.work_subtitle },
      { id: "portfolio_pro_project_1_title", content: data.project_1_title },
      { id: "portfolio_pro_project_1_description", content: data.project_1_description },
      { id: "portfolio_pro_project_1_cta", content: "View Project" },
      { id: "portfolio_pro_project_2_title", content: data.project_2_title },
      { id: "portfolio_pro_project_2_description", content: data.project_2_description },
      { id: "portfolio_pro_project_2_cta", content: "View Project" },
      { id: "portfolio_pro_project_3_title", content: data.project_3_title },
      { id: "portfolio_pro_project_3_description", content: data.project_3_description },
      { id: "portfolio_pro_project_3_cta", content: "View Project" },
      { id: "portfolio_pro_work_cta", content: "View All Projects" },
      { id: "portfolio_pro_about_title", content: data.about_title },
      { id: "portfolio_pro_about_description", content: data.about_description },
      { id: "portfolio_pro_about_description_2", content: data.about_description_2 },
      { id: "portfolio_pro_stat_1_number", content: data.stat_1_number },
      { id: "portfolio_pro_stat_1_label", content: data.stat_1_label },
      { id: "portfolio_pro_stat_2_number", content: data.stat_2_number },
      { id: "portfolio_pro_stat_2_label", content: data.stat_2_label },
      { id: "portfolio_pro_services_title", content: data.services_title },
      { id: "portfolio_pro_services_subtitle", content: data.services_subtitle },
      { id: "portfolio_pro_service_1_title", content: data.service_1_title },
      { id: "portfolio_pro_service_1_description", content: data.service_1_description },
      { id: "portfolio_pro_service_2_title", content: data.service_2_title },
      { id: "portfolio_pro_service_2_description", content: data.service_2_description },
      { id: "portfolio_pro_service_3_title", content: data.service_3_title },
      { id: "portfolio_pro_service_3_description", content: data.service_3_description },
      { id: "portfolio_pro_contact_title", content: data.contact_title },
      { id: "portfolio_pro_contact_description", content: data.contact_description },
      { id: "portfolio_pro_contact_cta_primary", content: data.contact_cta_primary },
      { id: "portfolio_pro_contact_cta_secondary", content: data.contact_cta_secondary },
      { id: "portfolio_pro_footer_brand", content: data.footer_brand },
      { id: "portfolio_pro_footer_link_1", content: data.footer_link_1 },
      { id: "portfolio_pro_footer_link_2", content: data.footer_link_2 },
      { id: "portfolio_pro_footer_link_3", content: data.footer_link_3 },
      { id: "portfolio_pro_footer_link_4", content: data.footer_link_4 },
      { id: "portfolio_pro_footer_copyright", content: data.footer_copyright }
    ]

    return { elements }
  } catch (error) {
    console.error("Error generating portfolio content:", error)
    throw new Error("Failed to generate portfolio content. Please try again.")
  }
}

/**
 * Generate theme-specific content for Portfolio Pro template
 */
export async function generatePortfolioProThemeContent(
  topic: string,
  themeId: string
): Promise<GeneratedContent> {
  // Define theme-specific configurations
  const themeConfigs = {
    "creative-artist": {
      name: "Creative Artist",
      tone: "vibrant, artistic, and passionate",
      profession: "Digital Artist"
    },
    "tech-minimal": {
      name: "Tech Minimal",
      tone: "clean, professional, and technical",
      profession: "Full Stack Developer"
    },
    "luxury-elegant": {
      name: "Luxury Elegant",
      tone: "sophisticated, elegant, and premium",
      profession: "Luxury Brand Designer"
    },
    "nature-organic": {
      name: "Nature Organic",
      tone: "warm, eco-friendly, and sustainable",
      profession: "Sustainable Designer"
    },
    "cyberpunk-futuristic": {
      name: "Cyberpunk Futuristic",
      tone: "edgy, high-tech, and futuristic",
      profession: "Cybersecurity Specialist"
    },
    "default": {
      name: "Professional Default",
      tone: "professional, clean, and approachable",
      profession: "Creative Professional"
    }
  }

  const theme = themeConfigs[themeId as keyof typeof themeConfigs] || themeConfigs.default

  return generatePortfolioProContent(topic, theme)
}

/**
 * Generate content for iPhone Pro template using Gemini AI
 */
export async function generateIPhoneProContent(
  topic: string,
  theme: { name: string; tone: string }
): Promise<GeneratedContent> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const prompt = `You are a professional product marketing copywriter creating content for a premium iPhone product landing page.

PRODUCT: ${topic}
THEME: ${theme.name}
TONE: ${theme.tone}

Generate compelling, conversion-focused copy for a complete iPhone product landing page. The tone should be ${theme.tone}.

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "brand": "Product/Brand Name (e.g., iPhone Pro)",
  "nav_0": "Overview",
  "nav_1": "Tech Specs",
  "nav_2": "Gallery",
  "nav_3": "Compare",
  "nav_preorder": "CTA button text (e.g., Pre-order Now)",
  "hero_badge": "Announcement badge (e.g., ✨ Introducing iPhone 15 Pro Max)",
  "hero_title": "Main headline (50-70 characters, bold and impactful)",
  "hero_subtitle": "Supporting text (150-200 characters, explain the innovation)",
  "hero_cta_primary": "Primary CTA (2-3 words)",
  "hero_cta_secondary": "Secondary CTA (2-3 words)",
  "hero_price": "Price text (e.g., From $1,199)",
  "hero_trade": "Payment option (e.g., or $49.95/mo. for 24 mo.)",
  "features_eyebrow": "Small text above features (e.g., Revolutionary Technology)",
  "features_title": "Features section headline",
  "features_subtitle": "Features section description",
  "feature_0_icon": "Single emoji for feature 1",
  "feature_0_title": "Feature 1 title (3-5 words)",
  "feature_0_desc": "Feature 1 description (80-120 characters)",
  "feature_1_icon": "Single emoji for feature 2",
  "feature_1_title": "Feature 2 title (3-5 words)",
  "feature_1_desc": "Feature 2 description (80-120 characters)",
  "feature_2_icon": "Single emoji for feature 3",
  "feature_2_title": "Feature 3 title (3-5 words)",
  "feature_2_desc": "Feature 3 description (80-120 characters)",
  "camera_eyebrow": "Small text above camera section",
  "camera_title": "Camera section headline",
  "camera_desc": "Camera description (120-180 characters)",
  "camera_feature_0": "Camera feature 1 (40-60 characters)",
  "camera_feature_1": "Camera feature 2 (40-60 characters)",
  "camera_feature_2": "Camera feature 3 (40-60 characters)",
  "camera_feature_3": "Camera feature 4 (40-60 characters)",
  "specs_title": "Tech specs section headline",
  "spec_0_label": "Spec 1 label (e.g., Display)",
  "spec_0_value": "Spec 1 value (e.g., 6.7″ Super Retina XDR)",
  "spec_0_detail": "Spec 1 detail (e.g., ProMotion 120Hz)",
  "spec_1_label": "Spec 2 label (e.g., Chip)",
  "spec_1_value": "Spec 2 value (e.g., A18 Pro)",
  "spec_1_detail": "Spec 2 detail (e.g., 6-core CPU, 6-core GPU)",
  "spec_2_label": "Spec 3 label (e.g., Storage)",
  "spec_2_value": "Spec 3 value (e.g., Up to 1TB)",
  "spec_2_detail": "Spec 3 detail (e.g., Choose your capacity)",
  "spec_3_label": "Spec 4 label (e.g., 5G)",
  "spec_3_value": "Spec 4 value (e.g., Superfast)",
  "spec_3_detail": "Spec 4 detail (e.g., Download. Stream. Game.)",
  "colors_title": "Color options headline",
  "colors_subtitle": "Color options description",
  "color_0": "Color 1 name (e.g., Natural Titanium)",
  "color_1": "Color 2 name (e.g., Blue Titanium)",
  "color_2": "Color 3 name (e.g., White Titanium)",
  "color_3": "Color 4 name (e.g., Black Titanium)",
  "cta_title": "Final CTA headline (40-60 characters)",
  "cta_subtitle": "Final CTA description (80-120 characters)",
  "cta_primary": "Final CTA button (2-4 words)",
  "cta_secondary": "Secondary CTA button (2-4 words)",
  "footer_col1_title": "Footer column 1 title",
  "footer_shop_1": "Shop link 1",
  "footer_shop_2": "Shop link 2",
  "footer_col2_title": "Footer column 2 title",
  "footer_learn_1": "Learn link 1",
  "footer_learn_2": "Learn link 2",
  "footer_col3_title": "Footer column 3 title",
  "footer_support_1": "Support link 1",
  "footer_support_2": "Support link 2",
  "footer_col4_title": "Footer column 4 title",
  "footer_company_1": "Company link 1",
  "footer_company_2": "Company link 2",
  "footer_copyright": "Copyright text"
}

Make the copy compelling, specific to ${topic}, and matching the ${theme.tone} tone.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    
    // Clean up the response - remove markdown code blocks if present
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const data = JSON.parse(cleanText)

    // Map the generated content to element IDs
    const elements: ElementContent[] = [
      { id: "iphone_pro_brand", content: data.brand },
      { id: "iphone_pro_nav_0", content: data.nav_0 },
      { id: "iphone_pro_nav_1", content: data.nav_1 },
      { id: "iphone_pro_nav_2", content: data.nav_2 },
      { id: "iphone_pro_nav_3", content: data.nav_3 },
      { id: "iphone_pro_nav_preorder", content: data.nav_preorder },
      { id: "iphone_pro_hero_badge", content: data.hero_badge },
      { id: "iphone_pro_hero_title", content: data.hero_title },
      { id: "iphone_pro_hero_subtitle", content: data.hero_subtitle },
      { id: "iphone_pro_hero_cta_primary", content: data.hero_cta_primary },
      { id: "iphone_pro_hero_cta_secondary", content: data.hero_cta_secondary },
      { id: "iphone_pro_hero_price", content: data.hero_price },
      { id: "iphone_pro_hero_trade", content: data.hero_trade },
      { id: "iphone_pro_features_eyebrow", content: data.features_eyebrow },
      { id: "iphone_pro_features_title", content: data.features_title },
      { id: "iphone_pro_features_subtitle", content: data.features_subtitle },
      { id: "iphone_pro_feature_0_icon", content: data.feature_0_icon },
      { id: "iphone_pro_feature_0_title", content: data.feature_0_title },
      { id: "iphone_pro_feature_0_desc", content: data.feature_0_desc },
      { id: "iphone_pro_feature_1_icon", content: data.feature_1_icon },
      { id: "iphone_pro_feature_1_title", content: data.feature_1_title },
      { id: "iphone_pro_feature_1_desc", content: data.feature_1_desc },
      { id: "iphone_pro_feature_2_icon", content: data.feature_2_icon },
      { id: "iphone_pro_feature_2_title", content: data.feature_2_title },
      { id: "iphone_pro_feature_2_desc", content: data.feature_2_desc },
      { id: "iphone_pro_camera_eyebrow", content: data.camera_eyebrow },
      { id: "iphone_pro_camera_title", content: data.camera_title },
      { id: "iphone_pro_camera_desc", content: data.camera_desc },
      { id: "iphone_pro_camera_feature_0", content: data.camera_feature_0 },
      { id: "iphone_pro_camera_feature_1", content: data.camera_feature_1 },
      { id: "iphone_pro_camera_feature_2", content: data.camera_feature_2 },
      { id: "iphone_pro_camera_feature_3", content: data.camera_feature_3 },
      { id: "iphone_pro_specs_title", content: data.specs_title },
      { id: "iphone_pro_spec_0_label", content: data.spec_0_label },
      { id: "iphone_pro_spec_0_value", content: data.spec_0_value },
      { id: "iphone_pro_spec_0_detail", content: data.spec_0_detail },
      { id: "iphone_pro_spec_1_label", content: data.spec_1_label },
      { id: "iphone_pro_spec_1_value", content: data.spec_1_value },
      { id: "iphone_pro_spec_1_detail", content: data.spec_1_detail },
      { id: "iphone_pro_spec_2_label", content: data.spec_2_label },
      { id: "iphone_pro_spec_2_value", content: data.spec_2_value },
      { id: "iphone_pro_spec_2_detail", content: data.spec_2_detail },
      { id: "iphone_pro_spec_3_label", content: data.spec_3_label },
      { id: "iphone_pro_spec_3_value", content: data.spec_3_value },
      { id: "iphone_pro_spec_3_detail", content: data.spec_3_detail },
      { id: "iphone_pro_colors_title", content: data.colors_title },
      { id: "iphone_pro_colors_subtitle", content: data.colors_subtitle },
      { id: "iphone_pro_color_0", content: data.color_0 },
      { id: "iphone_pro_color_1", content: data.color_1 },
      { id: "iphone_pro_color_2", content: data.color_2 },
      { id: "iphone_pro_color_3", content: data.color_3 },
      { id: "iphone_pro_cta_title", content: data.cta_title },
      { id: "iphone_pro_cta_subtitle", content: data.cta_subtitle },
      { id: "iphone_pro_cta_primary", content: data.cta_primary },
      { id: "iphone_pro_cta_secondary", content: data.cta_secondary },
      { id: "iphone_pro_footer_col1_title", content: data.footer_col1_title },
      { id: "iphone_pro_footer_shop_1", content: data.footer_shop_1 },
      { id: "iphone_pro_footer_shop_2", content: data.footer_shop_2 },
      { id: "iphone_pro_footer_col2_title", content: data.footer_col2_title },
      { id: "iphone_pro_footer_learn_1", content: data.footer_learn_1 },
      { id: "iphone_pro_footer_learn_2", content: data.footer_learn_2 },
      { id: "iphone_pro_footer_col3_title", content: data.footer_col3_title },
      { id: "iphone_pro_footer_support_1", content: data.footer_support_1 },
      { id: "iphone_pro_footer_support_2", content: data.footer_support_2 },
      { id: "iphone_pro_footer_col4_title", content: data.footer_col4_title },
      { id: "iphone_pro_footer_company_1", content: data.footer_company_1 },
      { id: "iphone_pro_footer_company_2", content: data.footer_company_2 },
      { id: "iphone_pro_footer_copyright", content: data.footer_copyright }
    ]

    return { elements }
  } catch (error) {
    console.error("Error generating iPhone Pro content:", error)
    throw new Error("Failed to generate iPhone Pro content. Please try again.")
  }
}

/**
 * Generate theme-specific content for iPhone Pro template
 */
export async function generateIPhoneProThemeContent(
  topic: string,
  themeId: string
): Promise<GeneratedContent> {
  // Define theme-specific configurations
  const themeConfigs = {
    "dark-gradient": {
      name: "Dark Gradient Premium",
      tone: "premium, sophisticated, and high-tech with gradient effects"
    },
    "light-elegant": {
      name: "Light Elegant",
      tone: "clean, minimal, and elegant with professional sophistication"
    },
    "neon-cyberpunk": {
      name: "Neon Cyberpunk",
      tone: "edgy, futuristic, and bold with cyberpunk vibes"
    },
    "luxury-gold": {
      name: "Luxury Gold",
      tone: "luxurious, refined, and premium with gold accents"
    },
    "minimalist-tech": {
      name: "Minimalist Tech",
      tone: "ultra-minimal, monochrome, and refined with technical precision"
    },
    "vibrant-gradient": {
      name: "Vibrant Gradient",
      tone: "colorful, energetic, and playful with vibrant gradients"
    },
    "default": {
      name: "Premium Default",
      tone: "professional, premium, and sophisticated"
    }
  }

  const theme = themeConfigs[themeId as keyof typeof themeConfigs] || themeConfigs.default

  return generateIPhoneProContent(topic, theme)
}

/**
 * Generate content for Agency Pro template using Gemini AI
 */
export async function generateAgencyProContent(
  topic: string,
  theme: { name: string; tone: string }
): Promise<GeneratedContent> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const prompt = `You are a professional creative agency copywriter creating content for a full-service agency website.

AGENCY FOCUS: ${topic}
THEME: ${theme.name}
TONE: ${theme.tone}

Generate compelling, professional copy for a complete creative agency landing page. The tone should be ${theme.tone}.

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "texts": {
    "agency_pro_brand": "Agency Name",
    "agency_pro_hero_headline": "Main headline about creating digital experiences",
    "agency_pro_hero_subheadline": "Subheadline describing agency expertise",
    "agency_pro_services_title": "Our Services",
    "agency_pro_services_subtitle": "Services description",
    "agency_pro_service_title_1": "Brand Identity",
    "agency_pro_service_desc_1": "Brand identity service description",
    "agency_pro_service_title_2": "Web Design",
    "agency_pro_service_desc_2": "Web design service description",
    "agency_pro_service_title_3": "Mobile Apps",
    "agency_pro_service_desc_3": "Mobile apps service description",
    "agency_pro_service_title_4": "Digital Marketing",
    "agency_pro_service_desc_4": "Digital marketing service description",
    "agency_pro_service_title_5": "SEO & Analytics",
    "agency_pro_service_desc_5": "SEO service description",
    "agency_pro_service_title_6": "Content Strategy",
    "agency_pro_service_desc_6": "Content strategy service description",
    "agency_pro_cases_title": "Featured Work",
    "agency_pro_cases_subtitle": "Case studies description",
    "agency_pro_case_title_1": "Project 1 name",
    "agency_pro_case_desc_1": "Project 1 description with results",
    "agency_pro_case_title_2": "Project 2 name",
    "agency_pro_case_desc_2": "Project 2 description with results",
    "agency_pro_case_title_3": "Project 3 name",
    "agency_pro_case_desc_3": "Project 3 description with results",
    "agency_pro_case_title_4": "Project 4 name",
    "agency_pro_case_desc_4": "Project 4 description with results",
    "agency_pro_testimonials_title": "What Our Clients Say",
    "agency_pro_testimonial_text_1": "Client testimonial 1",
    "agency_pro_testimonial_name_1": "Client name 1",
    "agency_pro_testimonial_role_1": "Client role 1",
    "agency_pro_testimonial_text_2": "Client testimonial 2",
    "agency_pro_testimonial_name_2": "Client name 2",
    "agency_pro_testimonial_role_2": "Client role 2",
    "agency_pro_testimonial_text_3": "Client testimonial 3",
    "agency_pro_testimonial_name_3": "Client name 3",
    "agency_pro_testimonial_role_3": "Client role 3",
    "agency_pro_team_title": "Meet Our Team",
    "agency_pro_team_subtitle": "Team description",
    "agency_pro_pricing_title": "Flexible Pricing",
    "agency_pro_pricing_subtitle": "Pricing description",
    "agency_pro_cta_title": "Ready to Start Your Project?",
    "agency_pro_cta_subtitle": "CTA description"
  },
  "buttons": {
    "agency_pro_nav_cta": { "text": "Get Started", "href": "#contact" },
    "agency_pro_hero_cta_primary": { "text": "View Our Work", "href": "#work" },
    "agency_pro_hero_cta_secondary": { "text": "Start a Project", "href": "#contact" },
    "agency_pro_cta_primary": { "text": "Schedule a Call", "href": "#contact" },
    "agency_pro_cta_secondary": { "text": "View Pricing", "href": "#pricing" }
  }
}`

  const result = await model.generateContent(prompt)
  const response = result.response.text()
  
  const cleanedResponse = response
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  try {
    return JSON.parse(cleanedResponse)
  } catch (error) {
    console.error("Failed to parse Gemini response:", error)
    throw new Error("Failed to generate valid content")
  }
}

/**
 * Generate themed content for Agency Pro template
 */
export async function generateAgencyProThemeContent(
  topic: string,
  themeId: string
): Promise<GeneratedContent> {
  // Define theme-specific configurations
  const themeConfigs = {
    "modern-creative": {
      name: "Modern Creative",
      tone: "modern, creative, and innovative with blue/purple gradients"
    },
    "bold-vibrant": {
      name: "Bold Vibrant",
      tone: "bold, energetic, and vibrant with orange/pink colors"
    },
    "elegant-minimal": {
      name: "Elegant Minimal",
      tone: "elegant, minimal, and sophisticated with clean design"
    },
    "tech-dark": {
      name: "Tech Dark",
      tone: "technical, futuristic, and premium with dark theme and cyan accents"
    },
    "nature-organic": {
      name: "Nature Organic",
      tone: "natural, organic, and eco-friendly with green tones"
    },
    "default": {
      name: "Professional Default",
      tone: "professional, trustworthy, and creative"
    }
  }

  const theme = themeConfigs[themeId as keyof typeof themeConfigs] || themeConfigs.default

  return generateAgencyProContent(topic, theme)
}

/**
 * Generate content for Ecommerce Pro template using Gemini AI
 */
export async function generateEcommerceProContent(
  topic: string,
  theme: { name: string; tone: string }
): Promise<GeneratedContent> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  const prompt = `You are a professional e-commerce copywriter creating content for a premium online store.

STORE FOCUS: ${topic}
THEME: ${theme.name}
TONE: ${theme.tone}

Generate compelling, conversion-focused copy for a complete e-commerce landing page. The tone should be ${theme.tone}.

Return ONLY a valid JSON object (no markdown, no code blocks) with this exact structure:
{
  "texts": {
    "ecommerce_pro_brand": "Store Name",
    "ecommerce_pro_hero_badge": "New Collection or Sale badge",
    "ecommerce_pro_hero_headline": "Main headline about products",
    "ecommerce_pro_hero_subheadline": "Subheadline with value proposition",
    "ecommerce_pro_feature_title_1": "Free Shipping",
    "ecommerce_pro_feature_desc_1": "Shipping description",
    "ecommerce_pro_feature_title_2": "Secure Payment",
    "ecommerce_pro_feature_desc_2": "Payment description",
    "ecommerce_pro_feature_title_3": "Easy Returns",
    "ecommerce_pro_feature_desc_3": "Returns description",
    "ecommerce_pro_feature_title_4": "24/7 Support",
    "ecommerce_pro_feature_desc_4": "Support description",
    "ecommerce_pro_featured_title": "Featured Products",
    "ecommerce_pro_featured_subtitle": "Products description",
    "ecommerce_pro_product_name_1": "Product 1 name",
    "ecommerce_pro_product_category_1": "Category",
    "ecommerce_pro_product_price_1": "$99.99",
    "ecommerce_pro_product_name_2": "Product 2 name",
    "ecommerce_pro_product_category_2": "Category",
    "ecommerce_pro_product_price_2": "$129.99",
    "ecommerce_pro_product_name_3": "Product 3 name",
    "ecommerce_pro_product_category_3": "Category",
    "ecommerce_pro_product_price_3": "$149.99",
    "ecommerce_pro_product_name_4": "Product 4 name",
    "ecommerce_pro_product_category_4": "Category",
    "ecommerce_pro_product_price_4": "$179.99",
    "ecommerce_pro_collections_title": "Shop by Collection",
    "ecommerce_pro_collections_subtitle": "Collections description",
    "ecommerce_pro_collection_name_1": "Collection 1 name",
    "ecommerce_pro_collection_desc_1": "Collection 1 description",
    "ecommerce_pro_collection_name_2": "Collection 2 name",
    "ecommerce_pro_collection_desc_2": "Collection 2 description",
    "ecommerce_pro_collection_name_3": "Collection 3 name",
    "ecommerce_pro_collection_desc_3": "Collection 3 description",
    "ecommerce_pro_testimonials_title": "What Our Customers Say",
    "ecommerce_pro_testimonial_text_1": "Customer testimonial 1",
    "ecommerce_pro_testimonial_name_1": "Customer name 1",
    "ecommerce_pro_testimonial_location_1": "Location 1",
    "ecommerce_pro_testimonial_text_2": "Customer testimonial 2",
    "ecommerce_pro_testimonial_name_2": "Customer name 2",
    "ecommerce_pro_testimonial_location_2": "Location 2",
    "ecommerce_pro_testimonial_text_3": "Customer testimonial 3",
    "ecommerce_pro_testimonial_name_3": "Customer name 3",
    "ecommerce_pro_testimonial_location_3": "Location 3",
    "ecommerce_pro_instagram_title": "Follow Us on Instagram",
    "ecommerce_pro_instagram_subtitle": "@storename - Tag us",
    "ecommerce_pro_newsletter_title": "Join Our Newsletter",
    "ecommerce_pro_newsletter_subtitle": "Newsletter description"
  },
  "buttons": {
    "ecommerce_pro_nav_cart": { "text": "Cart (0)", "href": "#cart" },
    "ecommerce_pro_hero_cta_primary": { "text": "Shop Now", "href": "#products" },
    "ecommerce_pro_hero_cta_secondary": { "text": "View Collections", "href": "#collections" },
    "ecommerce_pro_product_cta_1": { "text": "Add to Cart", "href": "#" },
    "ecommerce_pro_product_cta_2": { "text": "Add to Cart", "href": "#" },
    "ecommerce_pro_product_cta_3": { "text": "Add to Cart", "href": "#" },
    "ecommerce_pro_product_cta_4": { "text": "Add to Cart", "href": "#" },
    "ecommerce_pro_collection_cta_1": { "text": "Shop Collection", "href": "#" },
    "ecommerce_pro_collection_cta_2": { "text": "Shop Collection", "href": "#" },
    "ecommerce_pro_collection_cta_3": { "text": "Shop Collection", "href": "#" },
    "ecommerce_pro_newsletter_cta": { "text": "Subscribe Now", "href": "#subscribe" }
  }
}`

  const result = await model.generateContent(prompt)
  const response = result.response.text()
  
  const cleanedResponse = response
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim()

  try {
    return JSON.parse(cleanedResponse)
  } catch (error) {
    console.error("Failed to parse Gemini response:", error)
    throw new Error("Failed to generate valid content")
  }
}

/**
 * Generate themed content for Ecommerce Pro template
 */
export async function generateEcommerceProThemeContent(
  topic: string,
  themeId: string
): Promise<GeneratedContent> {
  // Define theme-specific configurations
  const themeConfigs = {
    "luxury-elegant": {
      name: "Luxury Elegant",
      tone: "luxurious, elegant, and premium with amber/gold tones"
    },
    "modern-minimal": {
      name: "Modern Minimal",
      tone: "modern, minimal, and clean with sophisticated simplicity"
    },
    "vibrant-colorful": {
      name: "Vibrant Colorful",
      tone: "vibrant, energetic, and playful with pink/purple gradients"
    },
    "dark-premium": {
      name: "Dark Premium",
      tone: "premium, sophisticated, and exclusive with dark theme and purple accents"
    },
    "eco-natural": {
      name: "Eco Natural",
      tone: "natural, eco-friendly, and sustainable with green tones"
    },
    "default": {
      name: "Professional Default",
      tone: "professional, trustworthy, and customer-focused"
    }
  }

  const theme = themeConfigs[themeId as keyof typeof themeConfigs] || themeConfigs.default

  return generateEcommerceProContent(topic, theme)
}

