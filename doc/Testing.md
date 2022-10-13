# Testing

For this project I decided to go with data driven tests. Basically what we do is taking markdown document and see if it was parsed correctly. These documents should also contain some of the edge cases like for example headers containing `#` character inside to see if it was erased. In the futere there will be also added regresion tests whenever any bug is fixed.

Tests case is created with two files with the same basename. For example `test/Basic Syntax.md` and `test/Basic Syntax.test.ts`. Always keep first letter uppercased just to stay consistent. Content of markdown file should be parsed by created util `withTestFile`. We shouldn't use any formater like prettier on test `.md` file. Sometimes they can optimize stuff like reducing `-----` to `---` but we might wana test this case as well. Typescript file should look like this

```ts
import assert from "assert";
import "mocha";
import { MarkdownParser } from "../src/parser";
import { withTestFile } from "./utils";

describe("Basic Syntax.md", () => {
    it("should parse all headers", () => {
        withTestFile(__filename, (markdown) => {
            const parser = MarkdownParser.defaultParser();
            const response = parser.parse(markdown);

            // assert
        });
    });
});
```

For now I want to have single test case in single file maybe in future I will decide to change that. There is also no specified scenario when should we use new markdown file and when update existing test but we shouldn't create every time a new file so that we dont end up with hundreds of files in test directory.

To run test cases type

```sh
npm run test
```
