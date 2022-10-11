import { MarkdownElement, TextMarkdownElement } from "./element";
import {
    DefaultMarkdownElementsFactory,
    MarkdownElementsFactory,
} from "./factory";

const MARKDOWN_HEADER_REGEX = /(?<=(^#)\s).*/;

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

    parse(markdown: string) {
        const response: CreateType[] = [];

        markdown.split("\n").forEach((line) => {
            if (MARKDOWN_HEADER_REGEX.test(line)) {
                const element: TextMarkdownElement = {
                    type: "h1",
                    content: line.replace("#", "").trim(),
                };

                response.push(this.factory.createTxt(element));
            }
        });

        return response;
    }
}
