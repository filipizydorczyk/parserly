This project is not maintained anymore. I started doing that not knowing of existing solutions like [commonmark](https://www.npmjs.com/package/commonmark). I may unarchive this repo someday if I think of something new I could bring to the table with this project but at the moment its done and it was cool learning oportuninty/poc. You can see how it was suppesed to be used in this [repo](https://github.com/filipizydorczyk/poc-parserly-editor).

---

# Parserly

This library is suppose to be parsing markdown to javascript object so that you can have claen API to do whatever you want with your markdown files. By default it will return predfined by library types but there is a possibility to write own factory that will return types defined by you instead. More on it in a future.

So far these are elements that will be supported/are supported by the library. In the future this list can grow

| Element         | Markdown Syntax                                        | State |
| --------------- | ------------------------------------------------------ | ----- |
| Heading         | # H1, ## H2, ### H3                                    | ✅    |
| Bold            | \*\*bold text\*\*                                      | ✅    |
| Italic          | \*italicized text\*                                    | ✅    |
| Blockquote      | > blockquote                                           | ✅    |
| Ordered List    | 1. First item </br> 2. Second item </br> 3. Third item | ❌    |
| Unordered List  | - First item </br> - Second item </br> - Third item    | ❌    |
| Code            | \`code\`                                               | ✅    |
| Horizontal Rule | ---                                                    | ✅    |
| Link Rule       | \[title](https://www.example.com)                      | ✅    |
| Image           | \!\[alt text](image.jpg)                               | ✅    |
