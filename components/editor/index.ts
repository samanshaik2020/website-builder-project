// Editor Components
// This file exports all editor components for easy importing

// Tiptap-based editors (Recommended - Modern Rich Text Editing)
export { TiptapEditableText } from './tiptap-editable-text';
export { TiptapRichText } from './tiptap-rich-text';

// Legacy Slate-based editor (Deprecated - Use TiptapEditableText instead)
export { SlateEditableText } from './slate-editable-text';

// Other editor components
export { EditableImage } from './editable-image';
export { EditableButton } from './editable-button';
export { EditableLink } from './editable-link';
export { ImageSidebar } from './image-sidebar';
export { default as AIButton } from './ai-button';
