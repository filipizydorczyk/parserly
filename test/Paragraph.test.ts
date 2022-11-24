import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe("Paragraph.md", () => {
    it("should parse elemts", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            assert.deepEqual(response, [
                {
                    content: [
                        { type: "bold", content: "Lorem" },
                        { type: "normal", content: "ipsum" },
                        { type: "code", content: "dolor" },
                        { type: "normal", content: "sit amet," },
                        {
                            type: "bold",
                            content: "consectetur adipiscing elit",
                        },
                        {
                            type: "normal",
                            content:
                                ". Morbi vel tempor mi. Cras sit amet venenatis ipsum. Phasellus eu nisl ut magna gravida interdum quis ac elit.",
                        },
                        { type: "italic", content: "Curabitur" },
                        { type: "normal", content: "pellen" },
                        { type: "code", content: "te" },
                        { type: "normal", content: "sque" },
                        { type: "bold", content: "ipsum sed ante vulputate" },
                        { type: "normal", content: ", quis dapibus mauris" },
                        {
                            alt: "",
                            url: new URL(
                                "https://images.news18.com/ibnlive/uploads/2021/12/spiderman-meme-16401651614x3.png"
                            ),
                        },
                        { type: "normal", content: "lacinia. Sed et n" },
                        { type: "bold", content: "un" },
                        { type: "normal", content: "c eget" },
                        { type: "bold", content: "tellus consequat iaculis" },
                        { type: "normal", content: "in ac od" },
                        {
                            alt: "example",
                            url: new URL(
                                "https://images.news18.com/ibnlive/uploads/2021/12/spiderman-meme-16401651614x3.png"
                            ),
                        },
                        {
                            type: "normal",
                            content:
                                "io. Aliquam non rhoncus libero, non commodo ligula. Vestibulum nec",
                        },
                        { type: "italic", content: "hendrerit felis" },
                        { type: "normal", content: ". Aenean" },
                        { type: "code", content: "sem dolor, semper" },
                        {
                            type: "normal",
                            content:
                                "vitae vehicula vestibulum, suscipit eget ex. Morbi interdum, massa ut cursus vestibulum, nisl justo varius massa, eget tincidunt nisi leo a sapien. Suspe",
                        },
                        { type: "italic", content: "ndi" },
                        {
                            type: "normal",
                            content:
                                "sse pretium ipsum dolor, ac ullamcorper quam blandit",
                        },
                        { type: "bold", content: "eu" },
                        { type: "normal", content: "." },
                    ],
                },
            ]);
        });
    });
});
