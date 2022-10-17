import {
    ImageMarkdownElement,
    InlineMarkdownElement,
    LinkMarkdownElement,
    MarkdownElement,
    ParagraphMarkdownElement,
    TextMarkdownElement,
} from "./element";
import {
    DefaultMarkdownElementsFactory,
    MarkdownElementsFactory,
} from "./factory";

const H1_REGEX = /(?<=(^#)\s).*/;
const H2_REGEX = /(?<=(^##)\s).*/;
const H3_REGEX = /(?<=(^###)\s).*/;
const HORIZONTAL_RULE_REGEX = /^(-|_){3,}$/;
const QUOTE_REGEX = /(?<=(^>)\s).*/;
const IMG_REGEX = /^!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)$/;

const INLINE_IMG_REGEX = /\s+!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/;
const LINK_REGEX = /\s+\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/;
const BOLD_REGEX = /^\*\*([^\s]*?)\*\*$/;
const ITALIC_REGEX = /^\*([^\s]*?)\*$/;
const CODE_REGEX = /\s+\`(.*)\`/;

export class MarkdownParser<CreateType = MarkdownElement> {
    private factory: MarkdownElementsFactory<CreateType>;

    public static defaultParser() {
        return new MarkdownParser<MarkdownElement>(
            new DefaultMarkdownElementsFactory()
        );
    }

    constructor(factory: MarkdownElementsFactory<CreateType>) {
        this.factory = factory;
    }

    public parse(markdown: string) {
        const response: CreateType[] = [];

        markdown.split("\n").forEach((line) => {
            if (H1_REGEX.test(line)) {
                response.push(this.parseHeader("h1", line));
                return;
            }
            if (H2_REGEX.test(line)) {
                response.push(this.parseHeader("h2", line));
                return;
            }
            if (H3_REGEX.test(line)) {
                response.push(this.parseHeader("h3", line));
                return;
            }
            if (HORIZONTAL_RULE_REGEX.test(line)) {
                response.push(this.factory.createHRule("---"));
                return;
            }
            if (QUOTE_REGEX.test(line)) {
                response.push(this.parseQuote(line));
                return;
            }
            if (IMG_REGEX.test(line.trim())) {
                response.push(this.factory.createImg(this.parseImg(line)));
                return;
            }
            if (line && line.trim().length > 0) {
                response.push(
                    this.factory.createParagraph(this.parseParagraph(line))
                );
                return;
            }
        });

        return response;
    }

    private parseParagraph(line: string) {
        const parts: InlineMarkdownElement[] = [];
        line.split(" ").forEach((part) => {
            if (BOLD_REGEX.test(part)) {
                // TODO figure wat to parse bolds with spaces inside
                // you can combine regexes with ()|() like: (\*\*([^\s]*?)\*\*)|(\*([^\s]*?)\*)|(\s+\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\))
                // and collect space before and after the match "(?<=[_]).*(?=[\.])". Then do split
                // https://www.regular-expressions.info/lookaround.html
                // parts.push(this.factory.createTxt(this.parseBoldText(part)));
                parts.push(this.parseBoldText(part));
                return;
            }
            if (ITALIC_REGEX.test(part)) {
                parts.push(this.parseItalicText(part));
                return;
            }
            if (part && part.trim().length > 0) {
                const element: TextMarkdownElement = {
                    type: "normal",
                    content: part.trim(),
                };
                parts.push(element);
                return;
            }
        });

        return { content: parts };
    }

    private parseBoldText(word: string) {
        const element: TextMarkdownElement = {
            type: "bold",
            content: word.replace(/^\*\*/, "").replace(/\*\*$/, ""),
        };

        return element;
    }

    private parseItalicText(word: string) {
        const element: TextMarkdownElement = {
            type: "italic",
            content: word.replace(/^\*/, "").replace(/\*$/, ""),
        };

        return element;
    }

    private parseImg(line: string) {
        const markdownElement = line.trim();

        const altRegex = /(?<=\[)[^\]]+/;
        const srcRegex = /(?<=\()[^\)]+/;

        const altText = altRegex.exec(markdownElement)?.[0]?.trim() || "";
        const src = srcRegex.exec(markdownElement)?.[0]?.trim() || "";

        const element: ImageMarkdownElement = {
            alt: altText,
            url: new URL(src),
        };

        return element;
    }

    private parseHeader(header: "h1" | "h2" | "h3", line: string) {
        const element: TextMarkdownElement = {
            type: header,
            content: line.replace(/^#{1,3}/g, "").trim(),
        };

        return this.factory.createTxt(element);
    }

    private parseQuote(line: string) {
        const element: TextMarkdownElement = {
            type: "blockquote",
            content: line.replace(/^>/g, "").trim(),
        };
        return this.factory.createTxt(element);
    }
}
