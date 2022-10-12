import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe("Header.md", () => {
    it("should parse all headers", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            assert.deepEqual(response, [
                { type: "h1", content: "Header to be parsed" },
                { type: "h2", content: "Another header to be parsed#" },
                { type: "h3", content: "Haeder 3 to # be parsed" },
            ]);
        });
    });
});
