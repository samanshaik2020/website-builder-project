export const photofolioConfig = {
    id: 'photofolio',
    name: 'PhotoFolio - with quiz',
    category: 'Portfolio',
    description: 'A photography portfolio with an interactive quiz feature.',
    thumbnail: '/PhotoFolio.png',
    editableFields: [
        // Navigation
        { id: 'nav_logo', type: 'text', label: 'Logo Text', section: 'Navigation' },
        { id: 'nav_link_1', type: 'text', label: 'Nav Link 1', section: 'Navigation' },
        { id: 'nav_link_2', type: 'text', label: 'Nav Link 2', section: 'Navigation' },
        { id: 'nav_link_3', type: 'text', label: 'Nav Link 3', section: 'Navigation' },
        { id: 'nav_link_4', type: 'text', label: 'Nav Link 4', section: 'Navigation' },
        { id: 'nav_cta', type: 'button', label: 'Nav Button', section: 'Navigation' },

        // Hero
        { id: 'hero_title', type: 'text', label: 'Hero Title', section: 'Hero' },
        { id: 'hero_description', type: 'text', label: 'Hero Description', section: 'Hero' },
        { id: 'hero_cta', type: 'button', label: 'Start Button', section: 'Hero' },

        // Main Content
        { id: 'about_text_1', type: 'text', label: 'Intro Paragraph', section: 'Content' },
        { id: 'about_text_2', type: 'text', label: 'Detail Paragraph', section: 'Content' },

        // Footer
        { id: 'footer_copyright', type: 'text', label: 'Copyright', section: 'Footer' },

        // Quiz Questions (1-5)
        { id: 'quiz_heading', type: 'text', label: 'Quiz Heading', section: 'Quiz' },

        // Question 1
        { id: 'question_1', type: 'text', label: 'Question 1', section: 'Quiz Q1' },
        { id: 'q1_opt1', type: 'text', label: 'Option 1', section: 'Quiz Q1' },
        { id: 'q1_opt2', type: 'text', label: 'Option 2', section: 'Quiz Q1' },
        { id: 'q1_opt3', type: 'text', label: 'Option 3', section: 'Quiz Q1' },
        { id: 'q1_opt4', type: 'text', label: 'Option 4', section: 'Quiz Q1' },

        // Question 2
        { id: 'question_2', type: 'text', label: 'Question 2', section: 'Quiz Q2' },
        { id: 'q2_opt1', type: 'text', label: 'Option 1', section: 'Quiz Q2' },
        { id: 'q2_opt2', type: 'text', label: 'Option 2', section: 'Quiz Q2' },
        { id: 'q2_opt3', type: 'text', label: 'Option 3', section: 'Quiz Q2' },
        { id: 'q2_opt4', type: 'text', label: 'Option 4', section: 'Quiz Q2' },

        // Question 3
        { id: 'question_3', type: 'text', label: 'Question 3', section: 'Quiz Q3' },
        { id: 'q3_opt1', type: 'text', label: 'Option 1', section: 'Quiz Q3' },
        { id: 'q3_opt2', type: 'text', label: 'Option 2', section: 'Quiz Q3' },
        { id: 'q3_opt3', type: 'text', label: 'Option 3', section: 'Quiz Q3' },
        { id: 'q3_opt4', type: 'text', label: 'Option 4', section: 'Quiz Q3' },

        // Question 4
        { id: 'question_4', type: 'text', label: 'Question 4', section: 'Quiz Q4' },
        { id: 'q4_opt1', type: 'text', label: 'Option 1', section: 'Quiz Q4' },
        { id: 'q4_opt2', type: 'text', label: 'Option 2', section: 'Quiz Q4' },
        { id: 'q4_opt3', type: 'text', label: 'Option 3', section: 'Quiz Q4' },
        { id: 'q4_opt4', type: 'text', label: 'Option 4', section: 'Quiz Q4' },

        // Question 5
        { id: 'question_5', type: 'text', label: 'Question 5', section: 'Quiz Q5' },
        { id: 'q5_opt1', type: 'text', label: 'Option 1', section: 'Quiz Q5' },
        { id: 'q5_opt2', type: 'text', label: 'Option 2', section: 'Quiz Q5' },
        { id: 'q5_opt3', type: 'text', label: 'Option 3', section: 'Quiz Q5' },
        { id: 'q5_opt4', type: 'text', label: 'Option 4', section: 'Quiz Q5' },

        // Result
        { id: 'result_title', type: 'text', label: 'Result Title', section: 'Result' },
        { id: 'result_text', type: 'text', label: 'Result Message', section: 'Result' },
        { id: 'result_subtext', type: 'text', label: 'Result Subtext', section: 'Result' },
        { id: 'result_image', type: 'image', label: 'Result Image', section: 'Result' },
        { id: 'result_btn', type: 'button', label: 'Result Button', section: 'Result' },
    ],
} as const;
