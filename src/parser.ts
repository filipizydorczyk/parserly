import {
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
import { ParserCombinator } from "./utils";

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

        markdown.split(ParserCombinator.from().lineEnd().build()).forEach((line) => {
            if (ParserCombinator.from().h1().build().test(line)) {
                response.push(this.parseHeader("h1", line));
                return;
            }
            if (ParserCombinator.from().h2().build().test(line)) {
                response.push(this.parseHeader("h2", line));
                return;
            }
            if (ParserCombinator.from().h3().build().test(line)) {
                response.push(this.parseHeader("h3", line));
                return;
            }
            if (ParserCombinator.from().horizontalRule().build().test(line)) {
                response.push(this.factory.createHRule("---"));
                return;
            }
            if (ParserCombinator.from().quote().build().test(line)) {
                response.push(this.parseQuote(line));
                return;
            }
            if (ParserCombinator.from().img().lineWrap().build().test(line.trim())) {
                response.push(this.factory.createImg(this.parseImg(line)));
                return;
            }
            if (ParserCombinator.from().url().lineWrap().build().test(line.trim())) {
                response.push(this.factory.createLink(this.parseUrl(line.trim())));
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
        const splitExpr = ParserCombinator.or([
            ParserCombinator.from().bold().charsAround(),
            ParserCombinator.from().italic().charsAround(),
            ParserCombinator.from().code().charsAround(),
            ParserCombinator.from().img().charsAround(),
            ParserCombinator.from().url().charsAround()
        ]).build();

        line.split(splitExpr).forEach((part) => {
            if (ParserCombinator.from().bold().build().test(part)) {
                parts.push(this.parseBoldText(part));
                return;
            }
            if (ParserCombinator.from().italic().build().test(part)) {
                parts.push(this.parseItalicText(part));
                return;
            }
            if (ParserCombinator.from().code().build().test(part)) {
                parts.push(this.parseCode(part));
                return;
            }
            if (ParserCombinator.from().img().build().test(part)) {
                parts.push(this.parseImg(part));
                return;
            }
            if (ParserCombinator.from().url().build().test(part)) {
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
