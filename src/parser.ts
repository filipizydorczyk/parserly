import type {
    ImageMarkdownElement,
    InlineMarkdownElement,
    LinkMarkdownElement,
    MarkdownElement,
    TextMarkdownElement,
} from "./element";
import {
    DefaultMarkdownElementsFactory,
    MarkdownElementsFactory,
} from "./factory";
import { MarkdownRegex } from "./utils";

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

        markdown.split(MarkdownRegex.LINE_SPLIT).forEach((line) => {
            if (MarkdownRegex.LINE_H1.test(line)) {
                response.push(this.parseHeader("h1", line));
                return;
            }
            if (MarkdownRegex.LINE_H2.test(line)) {
                response.push(this.parseHeader("h2", line));
                return;
            }
            if (MarkdownRegex.LINE_H3.test(line)) {
                response.push(this.parseHeader("h3", line));
                return;
            }
            if (MarkdownRegex.LINE_H_RULE.test(line)) {
                response.push(this.factory.createHRule("---"));
                return;
            }
            if (MarkdownRegex.LINE_QUOTE.test(line)) {
                response.push(this.parseQuote(line));
                return;
            }
            if (MarkdownRegex.LINE_IMG.test(line.trim())) {
                response.push(this.factory.createImg(this.parseImg(line)));
                return;
            }
            if (MarkdownRegex.LINE_URL.test(line.trim())) {
                const trimed = line.trim();
                response.push(this.factory.createLink(this.parseUrl(trimed)));
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

        line.split(MarkdownRegex.PARAGRAPH_SPLIT).forEach((part) => {
            if (MarkdownRegex.PARAGRAPH_BOLD.test(part)) {
                parts.push(this.parseBoldText(part));
                return;
            }
            if (MarkdownRegex.PARAGRAPH_ITALIC.test(part)) {
                parts.push(this.parseItalicText(part));
                return;
            }
            if (MarkdownRegex.PARAGRAPH_CODE.build().test(part)) {
                parts.push(this.parseCode(part));
                return;
            }
            if (MarkdownRegex.PARAGRAPH_IMG.test(part)) {
                parts.push(this.parseImg(part));
                return;
            }
            if (MarkdownRegex.PARAGRAPH_URL.test(part)) {
                parts.push(this.parseUrl(part));
                return;
            }
            if (part && part.trim().length > 0) {
                const element: TextMarkdownElement = {
                    type: "normal",
                    content: part.trim(), // TODO consider removing tream so that spaces are correct in cases like `dasf**fdsf**fsdf **dasd**`
                };
                parts.push(element);
                return;
            }
        });

        return { content: parts };
    }

    private parseCode(part: string): InlineMarkdownElement {
        const element: TextMarkdownElement = {
            type: "code",
            content: part.replace(/^\`/, "").replace(/\`$/, ""),
        };

        return element;
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

    private parseUrl(part: string) {
        const titleRegex = /(?<=\[)[^\]]+/;
        const srcRegex = /(?<=\()[^\)]+/;

        const title = titleRegex.exec(part)?.[0]?.trim() || "";
        const src = srcRegex.exec(part)?.[0]?.trim() || "";

        const element: LinkMarkdownElement = {
            title,
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
