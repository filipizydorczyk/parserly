import path from "path";
import fs from "fs";

/**
 * Util funtion to access content of coresponding markdown files in
 * more clean way. Each test case should read markdown file with same name
 * as test file (eg. `Header.test.ts` should access `Header.md`)
 *
 * @param filename name of test file. Just provide `__filename`
 * @param callback callback with actuall test imlpementation
 */
export const withTestFile = (
    filename: string,
    callback: (content: string) => void
) => {
    const data = fs.readFileSync(
        path.join(__dirname, `${path.basename(filename, ".test.ts")}.md`),
        "utf8"
    );
    callback(data);
};
