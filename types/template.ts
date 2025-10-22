// Shared type definitions for templates

export interface ButtonData {
  text: string;
  url: string;
}

export interface ContentData {
  text?: string;
  button?: ButtonData;
  image?: string;
}

export type TemplateData = Record<string, ContentData>;

export interface BaseTemplateProps {
  editable?: boolean;
  data?: TemplateData;
  onContentChange?: (eid: string, content: unknown) => void;
}
