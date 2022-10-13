import assert from "assert";
import "mocha";
import { ImageMarkdownElement } from "../src";
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
                    // TODO: think of better way to compare URL instances
                    url: (response[6] as ImageMarkdownElement).url,
                },
                {
                    alt: "alt text",
                    url: (response[7] as ImageMarkdownElement).url,
                },
            ]);
        });
    });
});
