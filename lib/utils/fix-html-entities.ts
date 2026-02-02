/**
 * Utility to decode HTML entities that may have been double-encoded
 * This can happen when textContent is used instead of innerHTML
 */

/**
 * Decodes HTML entities in a string, handling double-encoding
 * @param text - The text that may contain encoded HTML entities
 * @returns The decoded text
 */
export function decodeHTMLEntities(text: string): string {
    if (typeof document === 'undefined') {
        // Server-side fallback - basic decoding
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, ' ');
    }

    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    let decoded = textarea.value;

    // Check if still contains encoded entities (double-encoding case)
    // Run multiple passes to handle triple or quadruple encoding
    let maxIterations = 5;
    while (maxIterations > 0 && (decoded.includes('&amp;') || decoded.includes('&lt;') || decoded.includes('&gt;'))) {
        textarea.innerHTML = decoded;
        const newDecoded = textarea.value;
        if (newDecoded === decoded) break; // No more decoding possible
        decoded = newDecoded;
        maxIterations--;
    }

    return decoded;
}

/**
 * Recursively decodes HTML entities in project data
 * @param data - The project data object
 * @returns Data with decoded HTML entities
 */
export function fixProjectData(data: Record<string, any>): Record<string, any> {
    const fixedData: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
        if (value && typeof value === 'object') {
            if ('text' in value && typeof value.text === 'string') {
                fixedData[key] = {
                    ...value,
                    text: decodeHTMLEntities(value.text)
                };
            } else if ('button' in value && value.button?.text) {
                fixedData[key] = {
                    ...value,
                    button: {
                        ...value.button,
                        text: decodeHTMLEntities(value.button.text)
                    }
                };
            } else {
                fixedData[key] = value;
            }
        } else {
            fixedData[key] = value;
        }
    }

    return fixedData;
}

/**
 * Checks if text contains HTML entity encoding
 * @param text - The text to check
 * @returns True if the text contains encoded HTML entities
 */
export function hasEncodedEntities(text: string): boolean {
    return /&(?:amp|lt|gt|quot|#39|nbsp);/.test(text);
}
