export class ParserCombinator {
    private regex: string;

    static from() {
        return new ParserCombinator("");
    }

    private constructor(regex: string) {
        this.regex = regex;
    }

    public bold() {
        this.regex = "\\*\\*[^s].*?[^s]\\*\\*";
        return this;
    }

    public charsAround() {
        this.regex = `(?<=)(${this.regex})(?=)`;
        return this;
    }

    public build() {
        return new RegExp(this.regex);
    }
}
