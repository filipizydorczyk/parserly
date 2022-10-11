import "mocha";
import { withTestFile } from "./utils";

describe("Test", () => {
    it("test", () => {
        withTestFile(__filename, (markdown) => {
            console.log(markdown);
        });
    });
});
