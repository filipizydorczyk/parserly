import { MarkdownElement } from "./element";
import {
    DefaultMarkdownElementsFactory,
    MarkdownElementsFactory,
} from "./factory";

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

        // some parsing being done
        // foreach parsed part

        // const parsed: LinkMarkdownElement = { title: "Lol", url: new URL("") };
        // response.push(this.factory.createLink(parsed));

        return response;
    }
}

// MarkdownParser.defaultParser()
