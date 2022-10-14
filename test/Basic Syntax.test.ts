import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe("Basic Syntax.md", () => {
    it("should parse all headers", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            assert.deepEqual(response, [
                { type: "h1", content: "Header to be parsed" },
                { type: "h2", content: "Another header to be parsed#" },
                { type: "h3", content: "Haeder 3 to # be parsed" },
                "---",
                { type: "blockquote", content: "Test quote" },
                "---",
                {
                    alt: "",
                    url: new URL(
                        "https://images.news18.com/ibnlive/uploads/2021/12/spiderman-meme-16401651614x3.png"
                    ),
                },
                {
                    alt: "alt text",
                    url: new URL(
                        "https://images.news18.com/ibnlive/uploads/2021/12/spiderman-meme-16401651614x3.png"
                    ),
                },
            ]);
        });
    });
});
