import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe.only("Paragraph.md", () => {
    it("should parse elemts", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            assert.deepEqual(response, [
                {
                    content: [
                        { type: "bold", content: "Lorem" },
                        { type: "normal", content: "ipsum dolor sit amet," },
                        {
                            type: "bold",
                            content: "consectetur adipiscing elit",
                        },
                        {
                            type: "normal",
                            content:
                                ". Morbi vel tempor mi. Cras sit amet venenatis ipsum. Phasellus eu nisl ut magna gravida interdum quis ac elit. Curabitur pellentesque",
                        },
                        { type: "bold", content: "ipsum sed ante vulputate" },
                        {
                            type: "normal",
                            content:
                                ", quis dapibus mauris lacinia. Sed et nunc eget",
                        },
                        { type: "bold", content: "tellus consequat iaculis" },
                        {
                            type: "normal",
                            content:
                                "in ac odio. Aliquam non rhoncus libero, non commodo ligula. Vestibulum nec hendrerit felis. Aenean sem dolor, semper vitae vehicula vestibulum, suscipit eget ex. Morbi interdum, massa ut cursus vestibulum, nisl justo varius massa, eget tincidunt nisi leo a sapien. Suspendisse pretium ipsum dolor, ac ullamcorper quam blandit",
                        },
                        { type: "bold", content: "eu" },
                        { type: "normal", content: "." },
                    ],
                },
            ]);
        });
    });
});
