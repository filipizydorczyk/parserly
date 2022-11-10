import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe.only("Paragraph.md", () => {
    it("should parse elemts", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            console.log(JSON.stringify(response));

            // assert.deepEqual(response, [
            //     {
            //         content: [
            //             { type: "bold", content: "Lorem" },
            //             { type: "normal", content: "Ipsum" },
            //             { type: "normal", content: "is" },
            //             { type: "normal", content: "simply" },
            //             { type: "italic", content: "dummy" },
            //             { type: "normal", content: "*text" },
            //             { type: "normal", content: "*" },
            //             { type: "normal", content: "of" },
            //             { type: "normal", content: "the" },
            //             { type: "bold", content: "printing" },
            //             { type: "normal", content: "and" },
            //             { type: "normal", content: "typesetting" },
            //             { type: "normal", content: "industry." },
            //         ],
            //     },
            // ]);
        });
    });
});
