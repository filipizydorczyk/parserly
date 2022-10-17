export type LinkMarkdownElement = {
    title: string;
    url: URL;
};

export type ImageMarkdownElement = {
    alt: string;
    url: URL;
};

export type TextMarkdownElement = {
    type:
        | "h1"
        | "h2"
        | "h3"
        | "bold"
        | "italic"
        | "code"
        | "normal"
        | "blockquote"
        | "strikethrough";
    content: string;
};

export type InlineMarkdownElement =
    | TextMarkdownElement
    | LinkMarkdownElement
    | ImageMarkdownElement;

export type ParagraphMarkdownElement = {
    content: InlineMarkdownElement[];
};

export type HorizontalRuleMarkdownElement = "---";

export type MarkdownElement =
    | LinkMarkdownElement
    | ImageMarkdownElement
    | TextMarkdownElement
    | HorizontalRuleMarkdownElement
    | ParagraphMarkdownElement;
