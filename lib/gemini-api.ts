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
