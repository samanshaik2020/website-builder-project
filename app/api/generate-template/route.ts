import { NextRequest, NextResponse } from 'next/server';

type ReqBody = { 
  templateSlug: string; 
  seedText: string;
  theme?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ReqBody;
    const { templateSlug, seedText, theme } = body;

    console.log('🤖 AI Generation Request:', { templateSlug, seedText: seedText.substring(0, 50) + '...', theme });

    if (!templateSlug || !seedText) {
      return NextResponse.json(
        { error: 'templateSlug and seedText required' },
        { status: 400 }
      );
    }

    // Build the LLM prompt
    const prompt = buildPromptForTemplate(templateSlug, seedText, theme);

    // Get API key from environment (supports both GOOGLE_API_KEY and GEMINI_API_KEY)
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ API key not found in environment variables');
      return NextResponse.json(
        { error: 'Google/Gemini API key not configured. Please add GOOGLE_API_KEY or GEMINI_API_KEY to your .env.local file' },
        { status: 500 }
      );
    }

    console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'AI provider error', detail: errorText, status: response.status },
        { status: 502 }
      );
    }

    console.log('✅ Gemini API response received');
    const data = await response.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!raw) {
      console.error('❌ No content in AI response:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: 'No content from AI', response: data },
        { status: 502 }
      );
    }

    console.log('✅ AI content extracted, parsing JSON...');

    // Parse JSON robustly (AI sometimes adds markdown code blocks)
    let generatedJson;
    try {
      // Remove markdown code blocks if present
      const cleanedRaw = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      generatedJson = JSON.parse(cleanedRaw);
      console.log('✅ JSON parsed successfully');
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      // Try to extract JSON from the response
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          generatedJson = JSON.parse(jsonMatch[0]);
          console.log('✅ JSON extracted and parsed from text');
        } catch (e) {
          console.error('❌ Failed to parse extracted JSON:', e);
          return NextResponse.json(
            { error: 'Could not parse JSON from AI response', raw: raw.substring(0, 500) },
            { status: 400 }
          );
        }
      } else {
        console.error('❌ No JSON found in response');
        return NextResponse.json(
          { error: 'Could not parse JSON from AI response', raw: raw.substring(0, 500) },
          { status: 400 }
        );
      }
    }

    // Basic validation
    if (!generatedJson || typeof generatedJson !== 'object') {
      console.error('❌ Invalid JSON structure:', generatedJson);
      return NextResponse.json(
        { error: 'Generated JSON is invalid', sample: generatedJson },
        { status: 400 }
      );
    }

    console.log('✅ Content generation successful!');
    return NextResponse.json({ data: generatedJson });
  } catch (err: any) {
    console.error('❌ generate-template error:', err);
    console.error('Error stack:', err.stack);
    return NextResponse.json(
      { error: err.message || String(err), stack: err.stack },
      { status: 500 }
    );
  }
}

// Prompt builder for different templates
function buildPromptForTemplate(templateSlug: string, seedText: string, theme?: string) {
  // Agency template has its own comprehensive structure
  if (templateSlug === 'agency') {
    return buildAgencyPrompt(seedText, theme);
  }

  // AI Photo Studio template has its own structure
  if (templateSlug === 'ai-photo-studio') {
    return buildAIPhotoStudioPrompt(seedText, theme);
  }

  // Cat Food template has its own structure
  if (templateSlug === 'cat-food') {
    return buildCatFoodPrompt(seedText, theme);
  }

  // Grocery Delivery template has its own structure
  if (templateSlug === 'grocery-delivery') {
    return buildGroceryDeliveryPrompt(seedText, theme);
  }

  // Loan Landing template has its own structure
  if (templateSlug === 'loan-landing') {
    return buildLoanLandingPrompt(seedText, theme);
  }

  // Samsung Product template has its own structure
  if (templateSlug === 'samsung-product') {
    return buildSamsungProductPrompt(seedText, theme);
  }

  // Furniture Store template has its own structure
  if (templateSlug === 'furniture-store') {
    return buildFurnitureStorePrompt(seedText, theme);
  }

  // Meditation App template has its own structure
  if (templateSlug === 'meditation-app') {
    return buildMeditationAppPrompt(seedText, theme);
  }

  // SaaS Vibrant Gradient template has its own structure
  if (templateSlug === 'saas-vibrant-gradient') {
    return buildSaasVibrantGradientPrompt(seedText, theme);
  }

  const baseInstructions = `You are a professional web content generator. Generate content for a ${templateSlug} template based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must follow this exact structure with ALL fields:

{
  "nav_logo": "Brand name (1-2 words)",
  "hero_headline": "Main headline (6-10 words)",
  "hero_subheadline": "Supporting text (15-25 words)",
  "stat_1_number": "Stat 1 number (e.g., 50K+, 99.9%)",
  "stat_1_label": "Stat 1 label (2-3 words)",
  "stat_2_number": "Stat 2 number",
  "stat_2_label": "Stat 2 label (2-3 words)",
  "stat_3_number": "Stat 3 number",
  "stat_3_label": "Stat 3 label (2-3 words)",
  "stat_4_number": "Stat 4 number",
  "stat_4_label": "Stat 4 label (2-3 words)",
  "features_heading": "Features section title (4-6 words)",
  "features_subheading": "Features section subtitle (10-15 words)",
  "feature_1_title": "Feature 1 title (3-5 words)",
  "feature_1_description": "Feature 1 description (10-20 words)",
  "feature_2_title": "Feature 2 title (3-5 words)",
  "feature_2_description": "Feature 2 description (10-20 words)",
  "feature_3_title": "Feature 3 title (3-5 words)",
  "feature_3_description": "Feature 3 description (10-20 words)",
  "testimonials_heading": "Testimonials section title (3-5 words)",
  "testimonials_subheading": "Testimonials subtitle (8-12 words)",
  "testimonial_1_quote": "Customer testimonial 1 (20-30 words)",
  "testimonial_1_name": "Customer 1 name",
  "testimonial_1_title": "Customer 1 job title and company",
  "testimonial_2_quote": "Customer testimonial 2 (20-30 words)",
  "testimonial_2_name": "Customer 2 name",
  "testimonial_2_title": "Customer 2 job title and company",
  "testimonial_3_quote": "Customer testimonial 3 (20-30 words)",
  "testimonial_3_name": "Customer 3 name",
  "testimonial_3_title": "Customer 3 job title and company",
  "pricing_heading": "Pricing section title (3-5 words)",
  "pricing_subheading": "Pricing subtitle (8-12 words)",
  "pricing_plan_name": "Plan name (1-2 words)",
  "pricing_plan_description": "Plan description (4-6 words)",
  "pricing_plan_price": "Price (e.g., $49, $99)",
  "pricing_feature_1": "Pricing feature 1 (2-4 words)",
  "pricing_feature_2": "Pricing feature 2 (2-4 words)",
  "pricing_feature_3": "Pricing feature 3 (2-4 words)",
  "pricing_feature_4": "Pricing feature 4 (2-4 words)",
  "cta_heading": "Final CTA heading (5-8 words)",
  "cta_description": "Final CTA description (10-15 words)",
  "footer_brand": "Brand name (same as nav_logo)",
  "footer_tagline": "Brand tagline (8-12 words)"
}`;

  const templateSpecificInstructions: Record<string, string> = {
    'saas-landing': `
Create compelling SaaS landing page content that:
- Highlights the product's main value proposition in the hero
- Focuses on key benefits and features
- Uses action-oriented language
- Includes social proof elements
- Has a strong call-to-action

Make the tone professional, modern, and benefit-focused.`,
    
    'portfolio': `
Create professional portfolio content that:
- Showcases expertise and skills
- Highlights key projects or achievements
- Uses confident but approachable language
- Emphasizes unique value proposition

Make the tone professional yet personal.`
  };

  const specificInstructions = templateSpecificInstructions[templateSlug] || 
    'Create professional, engaging content appropriate for this template type.';

  return `${baseInstructions}

${specificInstructions}

Important:
- Keep all text concise and impactful
- Use active voice
- Focus on benefits, not just features
- Ensure all text is safe, professional, and non-harmful
- Return ONLY the JSON object, nothing else`;
}

// Comprehensive prompt builder for Agency template (60 editable fields)
function buildAgencyPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a creative agency landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL 60 fields below:

{
  "nav_logo": "Agency brand name (1-3 words)",
  "hero_badge": "Badge text (2-4 words, e.g., 'Award-Winning Agency')",
  "hero_headline": "Main headline (4-8 words)",
  "hero_tagline": "Supporting tagline (10-20 words)",
  "hero_cta_primary": "Primary CTA button text (2-3 words)",
  "hero_cta_secondary": "Secondary CTA button text (2-3 words)",
  "services_heading": "Services section title (2-4 words)",
  "service_1_title": "Service 1 name (2-3 words)",
  "service_1_description": "Service 1 description (15-25 words)",
  "service_2_title": "Service 2 name (2-3 words)",
  "service_2_description": "Service 2 description (15-25 words)",
  "service_3_title": "Service 3 name (2-3 words)",
  "service_3_description": "Service 3 description (15-25 words)",
  "service_4_title": "Service 4 name (2-3 words)",
  "service_4_description": "Service 4 description (15-25 words)",
  "portfolio_heading": "Portfolio section title (2-4 words)",
  "portfolio_1_title": "Project 1 name (2-4 words)",
  "portfolio_2_title": "Project 2 name (2-4 words)",
  "portfolio_3_title": "Project 3 name (2-4 words)",
  "team_heading": "Team section title (2-4 words)",
  "team_description": "Team section description (15-25 words)",
  "team_1_name": "Team member 1 full name",
  "team_1_role": "Team member 1 job title",
  "team_1_bio": "Team member 1 bio (15-25 words)",
  "team_2_name": "Team member 2 full name",
  "team_2_role": "Team member 2 job title",
  "team_2_bio": "Team member 2 bio (15-25 words)",
  "team_3_name": "Team member 3 full name",
  "team_3_role": "Team member 3 job title",
  "team_3_bio": "Team member 3 bio (15-25 words)",
  "testimonials_heading": "Testimonials section title (2-4 words)",
  "testimonial_1_text": "Client testimonial 1 (20-35 words)",
  "testimonial_1_name": "Client 1 full name",
  "testimonial_1_company": "Client 1 company and title",
  "testimonial_2_text": "Client testimonial 2 (20-35 words)",
  "testimonial_2_name": "Client 2 full name",
  "testimonial_2_company": "Client 2 company and title",
  "testimonial_3_text": "Client testimonial 3 (20-35 words)",
  "testimonial_3_name": "Client 3 full name",
  "testimonial_3_company": "Client 3 company and title",
  "contact_heading": "Contact section title (3-6 words)",
  "contact_subheading": "Contact section subtitle (10-20 words)",
  "contact_email_label": "Email label (1 word, e.g., 'Email')",
  "contact_email": "Email address",
  "contact_phone_label": "Phone label (1 word, e.g., 'Phone')",
  "contact_phone": "Phone number",
  "contact_location_label": "Location label (1 word, e.g., 'Location')",
  "contact_location": "Office location (city, state/country)",
  "contact_cta_primary": "Contact primary CTA button text (2-3 words)",
  "contact_cta_secondary": "Contact secondary CTA button text (2-3 words)",
  "footer_brand": "Footer brand name (same as nav_logo)",
  "footer_tagline": "Footer tagline (8-15 words)",
  "footer_services_title": "Footer services column title (1 word, e.g., 'Services')",
  "footer_service_1": "Footer service link 1 (2-3 words)",
  "footer_service_2": "Footer service link 2 (2-3 words)",
  "footer_service_3": "Footer service link 3 (2-3 words)",
  "footer_service_4": "Footer service link 4 (2-3 words)",
  "footer_company_title": "Footer company column title (1 word, e.g., 'Company')",
  "footer_link_1": "Footer company link 1 (1-2 words)",
  "footer_link_2": "Footer company link 2 (1-2 words)",
  "footer_link_3": "Footer company link 3 (1-2 words)",
  "footer_link_4": "Footer company link 4 (1-2 words)",
  "footer_social_title": "Footer social column title (1-2 words, e.g., 'Follow Us')",
  "footer_copyright": "Copyright text (e.g., '© 2024 Agency Name. All rights reserved.')"
}

Create compelling agency landing page content that:
- Emphasizes expertise, creativity, and proven results
- Highlights diverse services and capabilities
- Uses confident, professional, and inspiring language
- Showcases team expertise and client success stories
- Includes clear contact information
- Makes the tone authoritative yet approachable

Important:
- Keep all text concise, impactful, and professional
- Use active voice and benefit-focused language
- Make testimonials specific and credible
- Ensure team bios highlight relevant expertise
- Use realistic contact information format
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for AI Photo Studio template
function buildAIPhotoStudioPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for an AI Photo Studio & Modelling Agency landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL fields below:

{
  "nav_logo": "Brand name (1-3 words)",
  "nav_link_1": "Navigation link text (1-2 words, e.g., 'Pricing')",
  "hero_badge": "Trust badge text (3-5 words, e.g., 'TRUSTED BY 1M+ USERS')",
  "hero_title_1": "Hero title line 1 (2-4 words, e.g., 'AI Photo Studio')",
  "hero_title_2": "Hero title line 2 (2-4 words, e.g., 'Modelling Agency')",
  "hero_description": "Hero description (25-40 words about AI photo transformation)",
  "hero_rating_text": "Rating text (3-5 words, e.g., 'Loved by 1M+ creators')",
  "hero_rating_score": "Rating score (e.g., '4.9/5')",
  "features_title": "Features section title (8-12 words)",
  "feature_1_title": "Feature 1 title (2-3 words, e.g., 'Virtual Twin')",
  "feature_1_description": "Feature 1 description (20-30 words about creating AI twin)",
  "feature_2_title": "Feature 2 title (2-3 words, e.g., 'Hire AI-models')",
  "feature_2_description": "Feature 2 description (20-30 words about using AI models)",
  "studio_title": "Studio section title (6-10 words)",
  "studio_subtitle": "Studio subtitle (6-10 words)",
  "faq_title": "FAQ section title (3-5 words)",
  "faq_subtitle": "FAQ subtitle (10-15 words)",
  "faq_question_1": "FAQ question 1 (5-10 words about photo usage)",
  "faq_answer_1": "FAQ answer 1 (20-30 words)",
  "faq_question_2": "FAQ question 2 (5-10 words about pricing)",
  "faq_answer_2": "FAQ answer 2 (20-30 words)",
  "faq_question_3": "FAQ question 3 (5-10 words about photo quality)",
  "faq_answer_3": "FAQ answer 3 (20-30 words)",
  "faq_question_4": "FAQ question 4 (5-10 words about AI models)",
  "faq_answer_4": "FAQ answer 4 (20-30 words)",
  "faq_question_5": "FAQ question 5 (5-10 words about turnaround time)",
  "faq_answer_5": "FAQ answer 5 (20-30 words)",
  "faq_question_6": "FAQ question 6 (5-10 words about refunds)",
  "faq_answer_6": "FAQ answer 6 (20-30 words)",
  "cta_title": "CTA title (5-8 words)",
  "cta_description": "CTA description (8-12 words)",
  "footer_logo": "Footer brand name (same as nav_logo)",
  "footer_description": "Footer description (12-20 words)",
  "footer_col_1_title": "Footer column 1 title (1 word, e.g., 'Studio')",
  "footer_col_1_link_1": "Footer link 1 (1-2 words)",
  "footer_col_1_link_2": "Footer link 2 (1-2 words)",
  "footer_col_1_link_3": "Footer link 3 (1-2 words)",
  "footer_col_2_title": "Footer column 2 title (1 word, e.g., 'Legal')",
  "footer_col_2_link_1": "Footer link 1 (1-2 words)",
  "footer_col_2_link_2": "Footer link 2 (1-2 words)",
  "footer_col_2_link_3": "Footer link 3 (1-2 words)",
  "footer_col_3_title": "Footer column 3 title (1 word, e.g., 'Support')",
  "footer_col_3_link_1": "Footer link 1 (1-2 words)",
  "footer_col_3_link_2": "Footer link 2 (1-2 words)",
  "footer_copyright": "Copyright text (e.g., '© 2024 Brand Name. All rights reserved.')"
}

Create compelling AI photo studio content that:
- Emphasizes AI-powered photo transformation and generation
- Highlights the ease of creating professional photos without physical studios
- Uses modern, tech-forward, and accessible language
- Focuses on benefits like cost savings, convenience, and quality
- Includes realistic FAQ questions about privacy, pricing, and quality
- Makes the tone innovative, trustworthy, and user-friendly

Important:
- Keep all text concise, impactful, and professional
- Use active voice and benefit-focused language
- Make FAQ answers informative and reassuring
- Emphasize AI technology benefits
- Use realistic and credible statistics
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for Cat Food template
function buildCatFoodPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a product landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL fields below:

{
  "logo": "Brand name (1-2 words)",
  "hero_title": "Hero title (4-8 words, all caps, catchy and attention-grabbing)",
  "hero_subtitle": "Hero subtitle (15-25 words describing the product/service)",
  "press_logo_1": "Press outlet/partner 1 (e.g., 'TechCrunch', 'Forbes', 'Wired')",
  "press_logo_2": "Press outlet/partner 2",
  "press_logo_3": "Press outlet/partner 3",
  "press_logo_4": "Press outlet/partner 4",
  "press_logo_5": "Press outlet/partner 5",
  "how_it_works_title": "How it works section title (3-5 words, all caps)",
  "step_1_icon": "Step 1 emoji icon (single emoji relevant to the step)",
  "step_1_title": "Step 1 title (3-5 words)",
  "step_1_description": "Step 1 description (15-25 words explaining the first step)",
  "step_2_icon": "Step 2 emoji icon (single emoji relevant to the step)",
  "step_2_title": "Step 2 title (3-5 words)",
  "step_2_description": "Step 2 description (15-25 words explaining the second step)",
  "step_3_icon": "Step 3 emoji icon (single emoji relevant to the step)",
  "step_3_title": "Step 3 title (3-5 words)",
  "step_3_description": "Step 3 description (15-25 words explaining the third step)",
  "health_title": "Main value proposition title (5-8 words)",
  "health_description": "Value proposition description (30-50 words explaining key benefits)",
  "fresh_title": "Primary product/option title (2-3 words, all caps)",
  "fresh_description": "Primary product description (20-35 words)",
  "dry_title": "Secondary product/option title (2-3 words, all caps)",
  "dry_description": "Secondary product description (20-35 words)",
  "benefits_title": "Benefits section title (1-2 words, all caps)",
  "benefit_1_icon": "Benefit 1 emoji icon (single emoji)",
  "benefit_1_title": "Benefit 1 title (5-10 words)",
  "benefit_1_description": "Benefit 1 description (15-25 words)",
  "benefit_2_icon": "Benefit 2 emoji icon (single emoji)",
  "benefit_2_title": "Benefit 2 title (5-10 words)",
  "benefit_2_description": "Benefit 2 description (15-25 words)",
  "benefit_3_icon": "Benefit 3 emoji icon (single emoji)",
  "benefit_3_title": "Benefit 3 title (5-10 words)",
  "benefit_3_description": "Benefit 3 description (15-25 words)",
  "testimonials_title": "Testimonials section title (3-5 words, all caps)",
  "testimonial_1_quote": "Customer testimonial 1 (20-30 words, authentic and specific)",
  "testimonial_1_name": "Customer 1 name (e.g., '- Sarah M.', '- John D.')",
  "testimonial_2_quote": "Customer testimonial 2 (20-30 words, authentic and specific)",
  "testimonial_2_name": "Customer 2 name",
  "testimonial_3_quote": "Customer testimonial 3 (20-30 words, authentic and specific)",
  "testimonial_3_name": "Customer 3 name",
  "guarantee_title": "Guarantee/Trust title (3-5 words, all caps)",
  "guarantee_description": "Guarantee description (15-25 words about satisfaction/money-back guarantee)",
  "footer_col_1_title": "Footer column 1 title (1 word, e.g., 'Company', 'About')",
  "footer_col_1_link_1": "Footer link 1 (1-2 words)",
  "footer_col_1_link_2": "Footer link 2 (1-2 words)",
  "footer_col_1_link_3": "Footer link 3 (1-2 words)",
  "footer_col_2_title": "Footer column 2 title (1 word, e.g., 'Support', 'Help')",
  "footer_col_2_link_1": "Footer link 1 (1-2 words)",
  "footer_col_2_link_2": "Footer link 2 (1-2 words)",
  "footer_col_2_link_3": "Footer link 3 (1-2 words)",
  "footer_col_3_title": "Footer column 3 title (1 word, e.g., 'Legal', 'Resources')",
  "footer_col_3_link_1": "Footer link 1 (2-3 words)",
  "footer_col_3_link_2": "Footer link 2 (2-3 words)",
  "footer_col_4_title": "Footer column 4 title (2 words, e.g., 'Follow Us', 'Connect')"
}

Create compelling product landing page content that:
- Matches the tone and style appropriate for the product/service described
- Emphasizes key benefits and value propositions
- Uses clear, persuasive, and benefit-focused language
- Includes realistic and specific testimonials
- Highlights unique selling points
- Creates urgency and trust
- Uses appropriate industry terminology

Important:
- Keep all text concise, impactful, and benefit-focused
- Use active voice and emotional appeal where appropriate
- Make testimonials specific and authentic
- Adapt the tone to match the product (professional, playful, luxurious, etc.)
- Use realistic press outlet or partner names relevant to the industry
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for Grocery Delivery template
function buildGroceryDeliveryPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a grocery/food delivery service landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL fields below:

{
  "hero_title": "Hero title (8-15 words, compelling offer or value proposition)",
  "hero_subtitle": "Hero subtitle (10-15 words, fine print or additional details)",
  "feature_1_title": "Feature 1 title (5-10 words)",
  "feature_1_description": "Feature 1 description (30-50 words about convenience/selection)",
  "feature_2_title": "Feature 2 title (5-10 words)",
  "feature_2_description": "Feature 2 description (30-50 words about sourcing/quality)",
  "feature_3_title": "Feature 3 title (5-10 words)",
  "feature_3_description": "Feature 3 description (30-50 words about service/support)",
  "testimonials_title": "Testimonials section title (3-5 words, all caps)",
  "testimonial_1_quote": "Customer testimonial 1 (40-60 words, detailed and authentic)",
  "testimonial_1_name": "Customer 1 name (all caps, e.g., 'JULIA T.')",
  "testimonial_1_location": "Customer 1 location (city name)",
  "testimonial_2_quote": "Customer testimonial 2 (40-60 words, detailed and authentic)",
  "testimonial_2_name": "Customer 2 name (all caps)",
  "testimonial_2_location": "Customer 2 location (city name)",
  "testimonial_3_quote": "Customer testimonial 3 (40-60 words, detailed and authentic)",
  "testimonial_3_name": "Customer 3 name (all caps)",
  "testimonial_3_location": "Customer 3 location (city name)",
  "footer_col_1_title": "Footer column 1 title (1 word, e.g., 'Shop')",
  "footer_col_1_link_1": "Footer link 1 (1-2 words)",
  "footer_col_1_link_2": "Footer link 2 (1-2 words)",
  "footer_col_1_link_3": "Footer link 3 (1-2 words)",
  "footer_col_2_title": "Footer column 2 title (1 word, e.g., 'About')",
  "footer_col_2_link_1": "Footer link 1 (1-2 words)",
  "footer_col_2_link_2": "Footer link 2 (1-2 words)",
  "footer_col_2_link_3": "Footer link 3 (1-2 words)",
  "footer_col_3_title": "Footer column 3 title (1 word, e.g., 'Support')",
  "footer_col_3_link_1": "Footer link 1 (1-2 words)",
  "footer_col_3_link_2": "Footer link 2 (1-2 words)",
  "footer_col_3_link_3": "Footer link 3 (1-2 words)",
  "footer_col_4_title": "Footer column 4 title (1 word, e.g., 'Connect')",
  "footer_copyright": "Copyright text (e.g., '© 2024 Company Name. All rights reserved.')"
}

Create compelling grocery/food delivery content that:
- Emphasizes convenience, quality, and same-day delivery
- Highlights fresh, local, and curated product selection
- Uses warm, trustworthy, and community-focused language
- Focuses on benefits like time savings, quality ingredients, no subscription required
- Includes detailed, authentic testimonials from real customers
- Makes the tone friendly, reliable, and service-oriented

Important:
- Keep all text concise, impactful, and benefit-focused
- Use active voice and emotional appeal
- Make testimonials long, detailed, and authentic (40-60 words each)
- Emphasize quality, convenience, and customer satisfaction
- Use realistic customer names and locations
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for Loan Landing template
function buildLoanLandingPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a loan and financial services landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL 26 fields below:

{
  "nav_brand": "Brand name (1-3 words, e.g., 'HOMELOANGURUS', 'QUICKLOAN')",
  "hero_headline": "Hero headline (6-12 words, compelling offer or value proposition)",
  "hero_description": "Hero description (20-35 words about loan benefits and ease)",
  "hero_cta": "Hero CTA button text (2-4 words, e.g., 'Get Pre-Qualified', 'Apply Now')",
  "feature1_title": "Feature 1 title (3-6 words, e.g., 'Low Down Payment')",
  "feature1_description": "Feature 1 description (15-25 words about this benefit)",
  "feature2_title": "Feature 2 title (3-6 words, e.g., 'Fast Response')",
  "feature2_description": "Feature 2 description (15-25 words about this benefit)",
  "feature3_title": "Feature 3 title (3-6 words, e.g., 'No Cost to Apply')",
  "feature3_description": "Feature 3 description (15-25 words about this benefit)",
  "how_it_works_title": "How it works section title (3-5 words, e.g., 'How It Works')",
  "step1_title": "Step 1 title (2-4 words, e.g., 'Apply Online')",
  "step1_description": "Step 1 description (15-25 words explaining the first step)",
  "step2_title": "Step 2 title (2-4 words, e.g., 'Get Approved')",
  "step2_description": "Step 2 description (15-25 words explaining the second step)",
  "step3_title": "Step 3 title (2-4 words, e.g., 'Close Your Loan')",
  "step3_description": "Step 3 description (15-25 words explaining the third step)",
  "cta_title": "CTA section title (5-10 words, compelling call-to-action)",
  "cta_description": "CTA description (15-25 words encouraging action)",
  "cta_button": "CTA button text (2-4 words, e.g., 'Start Application', 'Get Started')",
  "footer_brand": "Footer brand name (same as nav_brand)",
  "footer_address": "Footer address (full address with street, city, state, zip)",
  "footer_privacy_title": "Privacy section title (1-2 words, e.g., 'Privacy', 'Legal')",
  "footer_about_title": "About section title (1-2 words, e.g., 'About Us', 'Company')",
  "footer_about_text": "About text (20-35 words describing the company mission)",
  "footer_copyright": "Copyright text (e.g., '© 2024 Company Name. All rights reserved.')"
}

Create compelling loan landing page content that:
- Emphasizes trust, speed, and ease of the loan process
- Highlights competitive rates, low fees, and fast approval
- Uses professional, trustworthy, and reassuring language
- Focuses on benefits like low down payment, no hidden fees, quick response
- Includes clear step-by-step process explanation
- Makes the tone authoritative yet approachable and helpful
- Emphasizes security and customer satisfaction

Important:
- Keep all text concise, impactful, and professional
- Use active voice and benefit-focused language
- Emphasize trust factors (licensed, secure, transparent)
- Make the process sound simple and stress-free
- Use realistic company information
- Adapt tone to the specific loan type (home loan, personal loan, business loan, etc.)
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for Samsung Product template
function buildSamsungProductPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a modern product landing page inspired by Samsung's design based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL 58 fields below:

{
  "nav_brand": "Brand name (1-2 words, all caps, e.g., 'SAMSUNG', 'APPLE')",
  "nav_link_1": "Navigation link 1 (1-2 words, e.g., 'Mobile', 'Products')",
  "nav_link_2": "Navigation link 2 (1-2 words, e.g., 'TV & AV', 'Services')",
  "nav_link_3": "Navigation link 3 (1-2 words, e.g., 'Home Appliances', 'Support')",
  "nav_cta": "Nav CTA button text (2-3 words, e.g., 'Buy Now', 'Shop')",
  "hero_badge": "Hero badge text (2-4 words, all caps, e.g., 'NEW ARRIVAL', 'EXCLUSIVE')",
  "hero_title": "Product name/title (2-5 words, e.g., 'Galaxy S24 Ultra', 'iPhone 15 Pro')",
  "hero_subtitle": "Hero subtitle (15-25 words describing the product value)",
  "hero_cta_primary": "Primary CTA button (2-4 words, e.g., 'Pre-order now', 'Buy Now')",
  "hero_cta_secondary": "Secondary CTA button (2-3 words, e.g., 'Learn more', 'Explore')",
  "features_title": "Features section title (2-4 words, e.g., 'Key Features', 'What's New')",
  "feature_1_title": "Feature 1 title (3-6 words about display/screen)",
  "feature_1_description": "Feature 1 description (25-40 words about display technology)",
  "feature_2_title": "Feature 2 title (3-6 words about camera/photography)",
  "feature_2_description": "Feature 2 description (25-40 words about camera capabilities)",
  "feature_3_title": "Feature 3 title (3-6 words about battery/performance)",
  "feature_3_description": "Feature 3 description (25-40 words about battery/power)",
  "specs_title": "Specifications section title (2-4 words, e.g., 'Technical Specifications', 'Tech Specs')",
  "spec_1_label": "Spec 1 label (1-2 words, e.g., 'Processor', 'Chip')",
  "spec_1_value": "Spec 1 value (processor name, e.g., 'Snapdragon 8 Gen 3', 'A17 Pro')",
  "spec_2_label": "Spec 2 label (1-2 words, e.g., 'Memory', 'Storage')",
  "spec_2_value": "Spec 2 value (RAM/storage, e.g., '12GB RAM / 512GB Storage')",
  "spec_3_label": "Spec 3 label (1-2 words, e.g., 'Display', 'Screen')",
  "spec_3_value": "Spec 3 value (display specs, e.g., '6.8\" Dynamic AMOLED 2X')",
  "spec_4_label": "Spec 4 label (1-2 words, e.g., 'Camera', 'Cameras')",
  "spec_4_value": "Spec 4 value (camera specs, e.g., '200MP + 12MP + 10MP + 10MP')",
  "gallery_title": "Gallery section title (3-5 words, e.g., 'See It In Action')",
  "pricing_title": "Pricing title (3-6 words, e.g., 'Get Yours Today', 'Available Now')",
  "pricing_subtitle": "Pricing subtitle (8-15 words about availability/options)",
  "pricing_label": "Pricing label (2-3 words, e.g., 'Starting at', 'From')",
  "pricing_amount": "Price (e.g., '$1,199', '$999', '€1,299')",
  "pricing_description": "Payment option (8-15 words, e.g., 'or $49.95/mo. for 24 months')",
  "pricing_cta": "Pricing CTA button (2-3 words, e.g., 'Buy Now', 'Order Now')",
  "pricing_note": "Pricing note (8-15 words about shipping/returns/trade-in)",
  "footer_col_1_title": "Footer column 1 title (1 word, e.g., 'Products', 'Shop')",
  "footer_col_1_link_1": "Footer link 1 (1-2 words, e.g., 'Smartphones', 'Phones')",
  "footer_col_1_link_2": "Footer link 2 (1-2 words, e.g., 'Tablets', 'Watches')",
  "footer_col_1_link_3": "Footer link 3 (1-2 words, e.g., 'Wearables', 'Audio')",
  "footer_col_2_title": "Footer column 2 title (1 word, e.g., 'Support', 'Help')",
  "footer_col_2_link_1": "Footer link 1 (1-2 words, e.g., 'Contact Us')",
  "footer_col_2_link_2": "Footer link 2 (1-2 words, e.g., 'FAQs', 'Help Center')",
  "footer_col_2_link_3": "Footer link 3 (1-2 words, e.g., 'Warranty', 'Repairs')",
  "footer_col_3_title": "Footer column 3 title (1 word, e.g., 'Company', 'About')",
  "footer_col_3_link_1": "Footer link 1 (1-2 words, e.g., 'About Us')",
  "footer_col_3_link_2": "Footer link 2 (1-2 words, e.g., 'Careers', 'Jobs')",
  "footer_col_3_link_3": "Footer link 3 (1-2 words, e.g., 'Press', 'News')",
  "footer_col_4_title": "Footer column 4 title (1-2 words, e.g., 'Follow Us', 'Social')",
  "footer_social_1": "Social link 1 (1 word, e.g., 'Facebook', 'Twitter')",
  "footer_social_2": "Social link 2 (1 word, e.g., 'Twitter', 'Instagram')",
  "footer_social_3": "Social link 3 (1 word, e.g., 'Instagram', 'YouTube')",
  "footer_copyright": "Copyright text (e.g., '© 2024 Samsung Electronics. All rights reserved.')"
}

Create compelling product page content that:
- Emphasizes premium quality, innovation, and cutting-edge technology
- Highlights key product features and specifications clearly
- Uses modern, sleek, and professional language
- Focuses on benefits and user experience
- Creates desire and urgency to purchase
- Makes the tone aspirational yet accessible
- Emphasizes brand prestige and product excellence

Important:
- Keep all text concise, impactful, and benefit-focused
- Use active voice and emotional appeal
- Make specifications accurate and impressive
- Emphasize premium features and innovation
- Use realistic pricing for the product category
- Adapt to the specific product type (phone, laptop, TV, appliance, etc.)
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for Furniture Store template
function buildFurnitureStorePrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a modern furniture and bedding e-commerce store based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL fields below:

{
  "nav_brand": "Store brand name (1-2 words, e.g., 'cocoVillage', 'DreamBeds')",
  "nav_link1": "Nav link 1 (1 word, e.g., 'Home', 'Shop')",
  "nav_link2": "Nav link 2 (1 word, e.g., 'Products', 'Catalog')",
  "nav_link3": "Nav link 3 (1 word, e.g., 'About', 'Story')",
  "nav_link4": "Nav link 4 (1 word, e.g., 'Contact', 'Support')",
  "hero_badge": "Hero badge (1-2 words, all caps, e.g., 'GET', 'SAVE')",
  "hero_discount": "Discount percentage (e.g., '50%', '30%')",
  "hero_discount_text": "Discount text (1 word, all caps, e.g., 'OFF', 'DISCOUNT')",
  "hero_title": "Hero title (3-6 words, all caps, e.g., 'BEDS AND BEDDING SETS!')",
  "hero_description": "Hero description (15-25 words about the product collection)",
  "beds_title": "Beds section title (1 word, all caps, e.g., 'BEDS', 'FURNITURE')",
  "beds_description": "Beds description (20-35 words about bed collection and quality)",
  "bed1_title": "Bed 1 name (2-3 words, all caps, e.g., 'HOUSE BEDS', 'LOFT BED')",
  "bed1_price": "Bed 1 price (e.g., 'Starting at $299', '$399')",
  "bed2_title": "Bed 2 name (2-3 words, all caps)",
  "bed2_price": "Bed 2 price",
  "bed3_title": "Bed 3 name (2-3 words, all caps)",
  "bed3_price": "Bed 3 price",
  "bed4_title": "Bed 4 name (2-3 words, all caps)",
  "bed4_price": "Bed 4 price (with original and sale price, e.g., '$2,800.00 $2,520')",
  "bed5_title": "Bed 5 name (2-3 words, all caps)",
  "bed5_price": "Bed 5 price (with original and sale price)",
  "bed6_title": "Bed 6 name (2-3 words, all caps)",
  "bed6_price": "Bed 6 price (with original and sale price)",
  "bedding_title": "Bedding section title (2-3 words, all caps, e.g., 'BEDDING SETS', 'BED LINENS')",
  "bedding_description": "Bedding description (20-35 words about bedding quality and comfort)",
  "bedding1_title": "Bedding 1 name (2-4 words, all caps, creative names like 'WAVES OF OCEAN')",
  "bedding1_price": "Bedding 1 price (e.g., '$89.99', '$79.99')",
  "bedding2_title": "Bedding 2 name (2-4 words, all caps, creative name)",
  "bedding2_price": "Bedding 2 price",
  "bedding3_title": "Bedding 3 name (2-4 words, all caps, creative name)",
  "bedding3_price": "Bedding 3 price",
  "bedding4_title": "Bedding 4 name (2-4 words, all caps, creative name)",
  "bedding4_price": "Bedding 4 price",
  "pillows_title": "Pillows section title (3-5 words, all caps, e.g., 'AND MANY FUN PILLOWS')",
  "pillows_subtitle": "Pillows pricing (e.g., 'AT $29.99 $20', 'FROM $15')",
  "instagram1_handle": "Instagram handle (e.g., '@cocovillage', '@yourbrand')",
  "instagram2_handle": "Instagram handle (same as above)",
  "instagram3_handle": "Instagram handle (same as above)",
  "about_title": "About section title (2-4 words, all caps, e.g., 'ABOUT COCO VILLAGE')",
  "about_description": "About description (30-50 words about brand mission and values)",
  "footer_brand": "Footer brand name (same as nav_brand)",
  "footer_copyright": "Copyright text (e.g., '© 2025 cocoVillage. All rights reserved.')"
}

Create compelling furniture store content that:
- Emphasizes comfort, quality, and beautiful design
- Highlights family-friendly and child-safe features if applicable
- Uses warm, inviting, and trustworthy language
- Focuses on creating cozy, inspiring spaces
- Makes pricing attractive with clear value
- Creates emotional connection to home and comfort
- Emphasizes craftsmanship and durability
- Uses creative, memorable product names for bedding sets

Important:
- Keep all text warm, welcoming, and family-oriented
- Use descriptive, sensory language for comfort products
- Make product names creative and memorable
- Show clear pricing with discounts where appropriate
- Emphasize safety, quality, and design
- Adapt to the specific furniture type (kids furniture, adult beds, etc.)
- Return ONLY the JSON object, nothing else`;
}

// Prompt builder for Meditation App template
function buildMeditationAppPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a meditation and sleep app landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL fields below:

{
  "hero_brand": "App brand name (1-2 words, e.g., 'Calm', 'Headspace')",
  "hero_title": "Hero title (8-15 words about app benefits, e.g., 'Meet Calm, the #1 app for sleep and meditation')",
  "hero_description": "Hero description (15-25 words about user benefits and reach)",
  "features_title": "Features section title (3-5 words, e.g., 'What do you get?')",
  "feature1_title": "Feature 1 title (2-3 words, e.g., 'Sleep Stories', 'Guided Sessions')",
  "feature1_description": "Feature 1 description (15-25 words about sleep/relaxation content)",
  "feature2_title": "Feature 2 title (2-3 words, e.g., 'Guided Meditations', 'Daily Calm')",
  "feature2_description": "Feature 2 description (15-25 words about meditation benefits)",
  "feature3_title": "Feature 3 title (2-3 words, e.g., 'Calm Music', 'Soundscapes')",
  "feature3_description": "Feature 3 description (15-25 words about music and sounds)",
  "feature4_title": "Feature 4 title (2-3 words, e.g., 'Mindfulness', 'Breathing')",
  "feature4_description": "Feature 4 description (15-25 words about mindfulness practices)",
  "stories_title": "Sleep stories section title (4-7 words, e.g., 'Drift off with Sleep Stories')",
  "stories_subtitle": "Stories subtitle (3-5 words, e.g., 'narrated by iconic voices')",
  "story_category": "Story category label (2 words, all caps, e.g., 'SLEEP STORY', 'BEDTIME TALE')",
  "story_author": "Story title/author (3-6 words, e.g., 'Serene Me Sleepy Train')",
  "story_description": "Story description (20-35 words about the story content)",
  "story_narrator": "Narrator name (2-3 words, e.g., 'David Walliams', 'Matthew McConaughey')",
  "testimonials_title": "Testimonials section title (2-4 words, e.g., 'What others say')",
  "testimonial1_logo": "Publication 1 name (1-2 words, all caps, e.g., 'WIRED', 'FORBES')",
  "testimonial1_text": "Testimonial 1 quote (25-40 words praising the app)",
  "testimonial2_logo": "Publication 2 name (2-4 words, e.g., 'Los Angeles Times', 'TechCrunch')",
  "testimonial2_text": "Testimonial 2 quote (25-40 words about app benefits)",
  "testimonial3_logo": "Publication 3 name (1-2 words, all caps, e.g., 'REFINERY29', 'VOGUE')",
  "testimonial3_text": "Testimonial 3 quote (25-40 words about user experience)",
  "footer_col1_title": "Footer column 1 title (1 word, e.g., 'Company', 'About')",
  "footer_col1_link1": "Footer link 1 (1-2 words, e.g., 'About', 'Our Story')",
  "footer_col1_link2": "Footer link 2 (1-2 words, e.g., 'Careers', 'Jobs')",
  "footer_col1_link3": "Footer link 3 (1-2 words, e.g., 'Press', 'News')",
  "footer_col1_link4": "Footer link 4 (2-3 words, e.g., 'Meditation 101', 'Resources')",
  "footer_col2_title": "Footer column 2 title (2-3 words, e.g., 'Get the App', 'Download')",
  "footer_col2_link1": "Footer link 1 (2 words, e.g., 'iOS App', 'iPhone')",
  "footer_col2_link2": "Footer link 2 (2 words, e.g., 'Android App', 'Google Play')",
  "footer_col2_link3": "Footer link 3 (2 words, e.g., 'Kindle Fire', 'Web App')",
  "footer_col2_link4": "Footer link 4 (2 words, e.g., 'Learn More', 'Features')",
  "footer_col3_title": "Footer column 3 title (1 word, e.g., 'Help', 'Support')",
  "footer_col3_link1": "Footer link 1 (1-2 words, e.g., 'FAQ', 'Help Center')",
  "footer_col3_link2": "Footer link 2 (2 words, e.g., 'Contact Us', 'Support')",
  "footer_col3_link3": "Footer link 3 (1 word, e.g., 'Terms', 'Privacy')",
  "footer_copyright": "Copyright text (e.g., '© Calm.com Inc. All rights reserved.')"
}

Create compelling meditation app content that:
- Emphasizes peace, relaxation, and mental wellness
- Highlights sleep improvement and stress reduction
- Uses calm, soothing, and reassuring language
- Focuses on scientifically-backed benefits
- Creates trust through testimonials and social proof
- Makes the app feel accessible and easy to use
- Emphasizes quality content and expert narrators
- Uses aspirational yet achievable tone

Important:
- Keep all text calming, peaceful, and wellness-focused
- Use gentle, encouraging language
- Emphasize proven results and user satisfaction
- Make features sound valuable and transformative
- Include credible publication names for testimonials
- Adapt to the specific meditation/wellness focus (sleep, anxiety, mindfulness, etc.)

Return ONLY the JSON object, nothing else.`;
}

// Prompt builder for SaaS Vibrant Gradient template
function buildSaasVibrantGradientPrompt(seedText: string, theme?: string) {
  return `You are a professional web content generator. Generate content for a modern SaaS landing page based on the following description: "${seedText}"${theme ? ` using the ${theme} theme style` : ''}.

Return ONLY valid JSON (no markdown, no code blocks, no comments). The JSON must include ALL fields below:

{
  "nav_logo": "Brand name (1-2 words, modern and memorable)",
  "hero_badge": "Badge text with emoji (e.g., '🚀 New: AI-Powered Features')",
  "hero_title": "Main headline (8-12 words, bold and transformative)",
  "hero_description": "Hero description (20-30 words, compelling value proposition)",
  "stat1_number": "Stat 1 number (e.g., '10K+', '99%', '24/7')",
  "stat1_label": "Stat 1 label (2-3 words, e.g., 'Active Users', 'Satisfaction')",
  "stat2_number": "Stat 2 number",
  "stat2_label": "Stat 2 label (2-3 words)",
  "stat3_number": "Stat 3 number",
  "stat3_label": "Stat 3 label (2-3 words)",
  "stat4_number": "Stat 4 number",
  "stat4_label": "Stat 4 label (2-3 words)",
  "features_title": "Features section title (3-5 words)",
  "features_subtitle": "Features subtitle (12-18 words)",
  "feature1_title": "Feature 1 title (2-4 words)",
  "feature1_description": "Feature 1 description (15-25 words)",
  "feature2_title": "Feature 2 title (2-4 words)",
  "feature2_description": "Feature 2 description (15-25 words)",
  "feature3_title": "Feature 3 title (2-4 words)",
  "feature3_description": "Feature 3 description (15-25 words)",
  "feature4_title": "Feature 4 title (2-4 words)",
  "feature4_description": "Feature 4 description (15-25 words)",
  "feature5_title": "Feature 5 title (2-4 words)",
  "feature5_description": "Feature 5 description (15-25 words)",
  "feature6_title": "Feature 6 title (2-4 words)",
  "feature6_description": "Feature 6 description (15-25 words)",
  "pricing_title": "Pricing section title (3-5 words)",
  "pricing_subtitle": "Pricing subtitle (8-12 words)",
  "plan1_name": "Plan 1 name (1-2 words, e.g., 'Starter', 'Basic')",
  "plan1_price": "Plan 1 price (e.g., '$29', '$49')",
  "plan1_description": "Plan 1 description (8-15 words)",
  "plan2_name": "Plan 2 name (1-2 words, e.g., 'Professional', 'Pro')",
  "plan2_price": "Plan 2 price (e.g., '$79', '$99')",
  "plan2_description": "Plan 2 description (8-15 words)",
  "plan3_name": "Plan 3 name (1-2 words, e.g., 'Enterprise', 'Business')",
  "plan3_price": "Plan 3 price (e.g., '$199', '$299')",
  "plan3_description": "Plan 3 description (8-15 words)",
  "testimonials_title": "Testimonials section title (3-5 words)",
  "testimonial1_text": "Testimonial 1 quote (20-35 words, enthusiastic)",
  "testimonial1_name": "Customer 1 name (2-3 words)",
  "testimonial1_role": "Customer 1 role (3-5 words, e.g., 'CEO, Tech Startup')",
  "testimonial2_text": "Testimonial 2 quote (20-35 words, positive)",
  "testimonial2_name": "Customer 2 name (2-3 words)",
  "testimonial2_role": "Customer 2 role (3-5 words)",
  "testimonial3_text": "Testimonial 3 quote (20-35 words, impactful)",
  "testimonial3_name": "Customer 3 name (2-3 words)",
  "testimonial3_role": "Customer 3 role (3-5 words)",
  "cta_title": "CTA section title (4-7 words, action-oriented)",
  "cta_description": "CTA description (15-25 words, compelling)",
  "footer_text": "Footer copyright text (e.g., '© 2025 Brand Name. All rights reserved.')"
}

Create compelling SaaS content that:
- Emphasizes transformation, growth, and efficiency
- Highlights modern technology and innovation
- Uses energetic, confident, and aspirational language
- Focuses on business value and ROI
- Creates urgency with social proof and statistics
- Makes the product feel cutting-edge and essential
- Emphasizes ease of use and quick results
- Uses professional yet approachable tone

Important:
- Keep all text modern, energetic, and business-focused
- Use action-oriented, results-driven language
- Emphasize speed, efficiency, and transformation
- Make features sound powerful and game-changing
- Include realistic company roles for testimonials
- Adapt to the specific SaaS type (productivity, analytics, marketing, etc.)
- Use impressive but believable statistics
- Create a sense of momentum and success

Return ONLY the JSON object, nothing else.`;
}
