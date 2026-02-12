// Script to replace all remaining contentEditable elements with TiptapEditableText
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components', 'templates', 'portfolio', 'default.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to match contentEditable elements
const patterns = [
    // Pattern for simple inline spans
    {
        regex: /<span\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\('([^']+)',\s*'([^']+)'\)\}\s*<\/span>/g,
        replacement: (match, eid, className, textKey, defaultText) => {
            return `<TiptapEditableText\n                eid="${eid}"\n                defaultText={getText('${textKey}', '${defaultText}')}\n                className="${className.replace(' whitespace-pre-wrap break-words', '')}"\n                editable={editable}\n                onChange={handleTextChange}\n                as="span"\n              />`;
        }
    },
    // Pattern for h2 elements
    {
        regex: /<h2\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\('([^']+)',\s*'([^']+)'\)\}\s*<\/h2>/g,
        replacement: (match, eid, className, textKey, defaultText) => {
            return `<TiptapEditableText\n              eid="${eid}"\n              defaultText={getText('${textKey}', '${defaultText}')}\n              className="${className.replace(' whitespace-pre-wrap break-words', '')}"\n              editable={editable}\n              onChange={handleTextChange}\n              as="h2"\n            />`;
        }
    },
    // Pattern for h3 elements
    {
        regex: /<h3\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\('([^']+)',\s*'([^']+)'\)\}\s*<\/h3>/g,
        replacement: (match, eid, className, textKey, defaultText) => {
            return `<TiptapEditableText\n                eid="${eid}"\n                defaultText={getText('${textKey}', '${defaultText}')}\n                className="${className.replace(' whitespace-pre-wrap break-words', '')}"\n                editable={editable}\n                onChange={handleTextChange}\n                as="h3"\n              />`;
        }
    },
    // Pattern for h4 elements
    {
        regex: /<h4\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\('([^']+)',\s*'([^']+)'\)\}\s*<\/h4>/g,
        replacement: (match, eid, className, textKey, defaultText) => {
            return `<TiptapEditableText\n                eid="${eid}"\n                defaultText={getText('${textKey}', '${defaultText}')}\n                className="${className.replace(' whitespace-pre-wrap break-words', '')}"\n                editable={editable}\n                onChange={handleTextChange}\n                as="h4"\n              />`;
        }
    },
    // Pattern for p elements
    {
        regex: /<p\s+data-eid="([^"]+)"\s+contentEditable=\{editable\}\s+suppressContentEditableWarning\s+className="([^"]+)"\s*>\s*\{getText\('([^']+)',\s*'([^']+)'\)\}\s*<\/p>/g,
        replacement: (match, eid, className, textKey, defaultText) => {
            return `<TiptapEditableText\n                eid="${eid}"\n                defaultText={getText('${textKey}', '${defaultText}')}\n                className="${className.replace(' whitespace-pre-wrap break-words', '')}"\n                editable={editable}\n                onChange={handleTextChange}\n                as="p"\n              />`;
        }
    }
];

// Apply all patterns
patterns.forEach(pattern => {
    content = content.replace(pattern.regex, pattern.replacement);
});

// Write back
fs.writeFileSync(filePath, content, 'utf8');
console.log('Replacement complete!');
