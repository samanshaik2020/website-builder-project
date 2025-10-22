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
