export const quizNewConfig = {
    id: 'quiz-new',
    name: 'Architecture Quiz',
    description: 'Interactive architecture photography quiz with score tracking',
    category: 'educational',
    thumbnail: '/quiz-new.png',
    editableFields: [
        // Navigation
        { id: 'brand_name', type: 'text', label: 'Brand Name', section: 'Navigation' },
        { id: 'nav_link1', type: 'text', label: 'Nav Link 1', section: 'Navigation' },
        { id: 'nav_link2', type: 'text', label: 'Nav Link 2', section: 'Navigation' },
        { id: 'nav_link3', type: 'text', label: 'Nav Link 3', section: 'Navigation' },
        { id: 'nav_cta', type: 'button', label: 'Subscribe Button', section: 'Navigation' },

        // Hero Section
        { id: 'hero_tag', type: 'text', label: 'Featured Tag', section: 'Hero' },
        { id: 'hero_title', type: 'text', label: 'Hero Title', section: 'Hero' },
        { id: 'hero_subtitle', type: 'text', label: 'Hero Subtitle', section: 'Hero' },
        { id: 'hero_image', type: 'image', label: 'Hero Main Image', section: 'Hero' },
        { id: 'image_location', type: 'text', label: 'Image Location', section: 'Hero' },

        // Meta Data
        { id: 'meta_date', type: 'text', label: 'Date', section: 'Story Info' },
        { id: 'meta_author', type: 'text', label: 'Author', section: 'Story Info' },
        { id: 'meta_camera', type: 'text', label: 'Camera Settings', section: 'Story Info' },

        // Story Section
        { id: 'story_p1', type: 'text', label: 'Story Paragraph 1', section: 'Story' },
        { id: 'story_p2', type: 'text', label: 'Story Paragraph 2', section: 'Story' },

        // Tags
        { id: 'tag1', type: 'text', label: 'Tag 1', section: 'Story' },
        { id: 'tag2', type: 'text', label: 'Tag 2', section: 'Story' },
        { id: 'tag3', type: 'text', label: 'Tag 3', section: 'Story' },

        // Quiz Section
        { id: 'quiz_title', type: 'text', label: 'Quiz Title', section: 'Quiz Header' },
        { id: 'quiz_subtitle', type: 'text', label: 'Quiz Subtitle', section: 'Quiz Header' },
        { id: 'quiz_hero_image', type: 'image', label: 'Hero Image', section: 'Quiz Hero' },
        { id: 'quiz_intro_title', type: 'text', label: 'Intro Title', section: 'Quiz Intro' },
        { id: 'quiz_intro_desc', type: 'text', label: 'Intro Description', section: 'Quiz Intro' },
        { id: 'quiz_intro_item1', type: 'text', label: 'Intro Item 1', section: 'Quiz Intro' },
        { id: 'quiz_intro_item2', type: 'text', label: 'Intro Item 2', section: 'Quiz Intro' },
        { id: 'quiz_intro_item3', type: 'text', label: 'Intro Item 3', section: 'Quiz Intro' },

        // Question 1
        { id: 'q1_question', type: 'text', label: 'Q1 Question', section: 'Question 1' },
        { id: 'q1_optA', type: 'text', label: 'Q1 Option A', section: 'Question 1' },
        { id: 'q1_optB', type: 'text', label: 'Q1 Option B', section: 'Question 1' },
        { id: 'q1_optC', type: 'text', label: 'Q1 Option C', section: 'Question 1' },
        { id: 'q1_optD', type: 'text', label: 'Q1 Option D', section: 'Question 1' },

        // Question 2
        { id: 'q2_question', type: 'text', label: 'Q2 Question', section: 'Question 2' },
        { id: 'q2_optA', type: 'text', label: 'Q2 Option A', section: 'Question 2' },
        { id: 'q2_optB', type: 'text', label: 'Q2 Option B', section: 'Question 2' },
        { id: 'q2_optC', type: 'text', label: 'Q2 Option C', section: 'Question 2' },
        { id: 'q2_optD', type: 'text', label: 'Q2 Option D', section: 'Question 2' },

        // Question 3
        { id: 'q3_question', type: 'text', label: 'Q3 Question', section: 'Question 3' },
        { id: 'q3_optA', type: 'text', label: 'Q3 Option A', section: 'Question 3' },
        { id: 'q3_optB', type: 'text', label: 'Q3 Option B', section: 'Question 3' },
        { id: 'q3_optC', type: 'text', label: 'Q3 Option C', section: 'Question 3' },
        { id: 'q3_optD', type: 'text', label: 'Q3 Option D', section: 'Question 3' },

        // Question 4
        { id: 'q4_question', type: 'text', label: 'Q4 Question', section: 'Question 4' },
        { id: 'q4_optA', type: 'text', label: 'Q4 Option A', section: 'Question 4' },
        { id: 'q4_optB', type: 'text', label: 'Q4 Option B', section: 'Question 4' },
        { id: 'q4_optC', type: 'text', label: 'Q4 Option C', section: 'Question 4' },
        { id: 'q4_optD', type: 'text', label: 'Q4 Option D', section: 'Question 4' },

        // Question 5
        { id: 'q5_question', type: 'text', label: 'Q5 Question', section: 'Question 5' },
        { id: 'q5_optA', type: 'text', label: 'Q5 Option A', section: 'Question 5' },
        { id: 'q5_optB', type: 'text', label: 'Q5 Option B', section: 'Question 5' },
        { id: 'q5_optC', type: 'text', label: 'Q5 Option C', section: 'Question 5' },
        { id: 'q5_optD', type: 'text', label: 'Q5 Option D', section: 'Question 5' },
    ],
};
