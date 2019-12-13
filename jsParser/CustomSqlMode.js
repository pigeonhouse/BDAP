import "ace-builds/src-noconflict/mode-java";
var columns = require('./Columns');
export class CustomHighlightRules extends window.ace.acequire(
  "ace/mode/text_highlight_rules"
).TextHighlightRules {
  constructor() {
    super();
    var keywordMapper = this.createKeywordMapper({
        // "keyword.control": "if|then|else",
        // "keyword.operator": "and|or|not",
        // "keyword.other": "class",
        // "storage.type": "int|float|text",
        // "storage.modifier": "private|public",
        "support.function": "abs()",
        //"constant.language": "true|false"
        "keyword.control": columns.columns
}, "identifier");
    this.$rules = {
        "start": [
            { token : "comment", regex : "//.*$" },
            { token : "string",  regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]' },
            { token : "constant.numeric", regex : "0[xX][0-9a-fA-F]+\\b" },
            { token : "constant.numeric", regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b" },
            { token : "keyword.operator", regex : "!|%|\\\\|/|\\*|\\-|\\+|~=|==|<>|!=|<=|>=|=|<|>|&&|\\|\\|" },
            { token : "punctuation.operator", regex : "\\?|\\:|\\,|\\;|\\." },
            { token : "paren.lparen", regex : "[[({]" },
            { token : "paren.rparen", regex : "[\\])}]" },
            { token : "text", regex : "\\s+" },
            { token: keywordMapper, regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b" }
        ]
    };
}
}

export default class CustomSqlMode extends window.ace.acequire("ace/mode/java")
  .Mode {
  constructor() {
    super();
    this.HighlightRules = CustomHighlightRules;
  }
}