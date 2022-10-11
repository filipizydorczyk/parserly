import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe("Test", () => {
    it("test", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            assert.deepEqual(response, [
                { type: "h1", content: "Header to be parsed" },
            ]);
        });
    });
});
