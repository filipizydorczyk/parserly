/**
 * This class utility to create complex regexes from smaller ones.
 * You start by calling static method `from` (constructor is private)
 * and then chaining smaller regexes to create big one. For example
 * `ParserCombinator.from().bold().fullWords().charsAround().build()`
 */
export class ParserCombinator {
    private regex: string;

    static from() {
        return new ParserCombinator("");
    }

    static or(options: ParserCombinator[]) {
        return new ParserCombinator(
            `(?:${options
                .map((option) => `(?:${option.getRegexString()})`)
                .join("|")})`
        );
    }

    /**
     * Private constructor
     * @param regex string to begin with
     */
    private constructor(regex: string) {
        this.regex = regex;
    }

    public bold() {
        this.regex = `${this.regex}(?:\\*\\*[^\\s].*?[^\\s]\\*\\*)`;
        return this;
    }

    public italic() {
        this.regex = `${this.regex}(?<!\\*)\\*(?![*\\s])(?:[^*]*[^*\\s])?\\*(?!\\*)`;
        return this;
    }

    public code() {
        this.regex = `${this.regex}\`.*?\``;
        return this;
    }

    public img() {
        this.regex = `${this.regex}!\\[[^\\]]*\\]\\((?:.*?)\\s*(?:"(?:.*[^"])")?\\s*\\)`;
        return this;
    }

    /**
     * Takes current regex and adds positive lookahed
     * and lookbehind part.
     * @returns current `ParserCombinator` insatnce
     */
    public charsAround() {
        this.regex = `(?<=)(${this.regex})(?=)`;
        return this;
    }

    /**
     * Takes current regex and will make sure it will match
     * full word or words. For example if we create regex
     * `ParserCombinator.from().bold().build()` it will match
     * `**dsasd dasda**` but also `dasdas**sads**dasdsa`.
     * If we use this method on top of that
     * (`ParserCombinator.from().bold().fullWords().build()`) it
     * will not parse `dasdas**sads**dasdsa` anymore.
     * It will work when there are spacec around, begind on the
     * beginning of line, finishes with end of line, comma or dot.
     * @returns current `ParserCombinator` insatnce
     */
    public fullWords() {
        this.regex = `(?:^|\\s)(?:${this.regex})(?:$|\\s|\\.|\\,)`;
        return this;
    }

    public getRegexString() {
        return this.regex;
    }

    /**
     * Takes current string and creates regex out of that.
     * Should be used at the very end of parser bulding.
     * @returns `RegExp`
     */
    public build() {
        return new RegExp(this.regex);
    }
}
