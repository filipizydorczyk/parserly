import { MarkdownElement, TextMarkdownElement } from "./element";
import {
    DefaultMarkdownElementsFactory,
    MarkdownElementsFactory,
} from "./factory";

const H1_REGEX = /(?<=(^#)\s).*/;
const H2_REGEX = /(?<=(^##)\s).*/;
const H3_REGEX = /(?<=(^###)\s).*/;
const HORIZONTAL_RULE_REGEX = /^(-|_){3,}$/;

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
        });

        return response;
    }

    private parseHeader(header: "h1" | "h2" | "h3", line: string) {
        const element: TextMarkdownElement = {
            type: header,
            content: line.replace(/^#{1,3}/g, "").trim(),
        };

        return this.factory.createTxt(element);
    }
}
