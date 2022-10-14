import {
    ImageMarkdownElement,
    MarkdownElement,
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
const BOLD_REGEX = /\*\*([^\s]*?)\*\*/;
const ITALIC_REGEX = /\s+\*([^\s \*]+)\*/;
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
                // This also will fetch images but onlin inline
                this.parseParagraph(line);
                return;
            }
        });

        return response;
    }

    private parseParagraph(line: string) {
        // IDEA: https://bobbyhadz.com/blog/javascript-split-string-by-regex make regex finding space befroe wanted elements and split by them
        // Then use actuall regexes to extract the content
        // IDEA: just split by spaces and try match to markdown element. If its not any of supported element collect it as default text and when u find
        // markdown element parse it and add to response text u fetched sp far and parsed element (["collected test",Link])
        // also consider adding perfomance tests
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
