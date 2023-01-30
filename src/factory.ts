import type {
    HorizontalRuleMarkdownElement,
    ImageMarkdownElement,
    LinkMarkdownElement,
    MarkdownElement,
    ParagraphMarkdownElement,
    TextMarkdownElement,
} from "./element";

export interface MarkdownElementsFactory<ReturnType> {
    createLink: (element: LinkMarkdownElement) => ReturnType;
    createImg: (element: ImageMarkdownElement) => ReturnType;
    createTxt: (element: TextMarkdownElement) => ReturnType;
    createHRule: (element: HorizontalRuleMarkdownElement) => ReturnType;
    createParagraph: (element: ParagraphMarkdownElement) => ReturnType;
}

/* prettier-ignore */
export class DefaultMarkdownElementsFactory implements MarkdownElementsFactory<MarkdownElement> {
    createLink(element: LinkMarkdownElement) { return element; }
    createImg(element: ImageMarkdownElement) { return element; }
    createTxt(element: TextMarkdownElement) { return element; }
    createHRule(element: HorizontalRuleMarkdownElement) { return element; }
    createParagraph(element: ParagraphMarkdownElement) { return element; }
}
/* prettier-ignore-end */
