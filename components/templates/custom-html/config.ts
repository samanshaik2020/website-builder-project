export const customHtmlConfig = {
    id: 'custom-html',
    name: 'Custom HTML',
    category: 'Advanced',
    description: 'Write or paste your own custom HTML, CSS, and JS to create a fully custom page.',
    thumbnail: '/custom-html-preview.png',
    editableFields: [],
} as const;

export type CustomHtmlConfig = typeof customHtmlConfig;
