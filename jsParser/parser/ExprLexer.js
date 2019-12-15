// Generated from Expr.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0014{\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u000f\u0003\u000f\u0003\u0010\u0006\u0010^",
    "\n\u0010\r\u0010\u000e\u0010_\u0003\u0011\u0006\u0011c\n\u0011\r\u0011",
    "\u000e\u0011d\u0003\u0012\u0006\u0012h\n\u0012\r\u0012\u000e\u0012i",
    "\u0003\u0012\u0003\u0012\u0007\u0012n\n\u0012\f\u0012\u000e\u0012q\u000b",
    "\u0012\u0003\u0013\u0003\u0013\u0003\u0014\u0006\u0014v\n\u0014\r\u0014",
    "\u000e\u0014w\u0003\u0014\u0003\u0014\u0002\u0002\u0015\u0003\u0003",
    "\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013",
    "\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0010\u001f\u0011",
    "!\u0012#\u0013%\u0002\'\u0014\u0003\u0002\u0004\u0005\u0002C\\c|~~\u0004",
    "\u0002\u000b\u000b\"\"\u0002~\u0002\u0003\u0003\u0002\u0002\u0002\u0002",
    "\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002\u0002\u0002",
    "\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002\u0002\u0002",
    "\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002\u0002\u0002",
    "\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002\u0002\u0002",
    "\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003\u0002\u0002\u0002\u0002",
    "\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003\u0002\u0002\u0002\u0002",
    "\u001d\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002\u0002\u0002\u0002",
    "!\u0003\u0002\u0002\u0002\u0002#\u0003\u0002\u0002\u0002\u0002\'\u0003",
    "\u0002\u0002\u0002\u0003)\u0003\u0002\u0002\u0002\u0005+\u0003\u0002",
    "\u0002\u0002\u0007-\u0003\u0002\u0002\u0002\t/\u0003\u0002\u0002\u0002",
    "\u000b1\u0003\u0002\u0002\u0002\r3\u0003\u0002\u0002\u0002\u000f5\u0003",
    "\u0002\u0002\u0002\u0011<\u0003\u0002\u0002\u0002\u0013>\u0003\u0002",
    "\u0002\u0002\u0015C\u0003\u0002\u0002\u0002\u0017H\u0003\u0002\u0002",
    "\u0002\u0019M\u0003\u0002\u0002\u0002\u001bR\u0003\u0002\u0002\u0002",
    "\u001dW\u0003\u0002\u0002\u0002\u001f]\u0003\u0002\u0002\u0002!b\u0003",
    "\u0002\u0002\u0002#g\u0003\u0002\u0002\u0002%r\u0003\u0002\u0002\u0002",
    "\'u\u0003\u0002\u0002\u0002)*\u0007-\u0002\u0002*\u0004\u0003\u0002",
    "\u0002\u0002+,\u0007/\u0002\u0002,\u0006\u0003\u0002\u0002\u0002-.\u0007",
    ",\u0002\u0002.\b\u0003\u0002\u0002\u0002/0\u00071\u0002\u00020\n\u0003",
    "\u0002\u0002\u000212\u0007*\u0002\u00022\f\u0003\u0002\u0002\u00023",
    "4\u0007+\u0002\u00024\u000e\u0003\u0002\u0002\u000256\u0007t\u0002\u0002",
    "67\u0007q\u0002\u000278\u0007w\u0002\u000289\u0007p\u0002\u00029:\u0007",
    "f\u0002\u0002:;\u0007*\u0002\u0002;\u0010\u0003\u0002\u0002\u0002<=",
    "\u0007.\u0002\u0002=\u0012\u0003\u0002\u0002\u0002>?\u0007c\u0002\u0002",
    "?@\u0007d\u0002\u0002@A\u0007u\u0002\u0002AB\u0007*\u0002\u0002B\u0014",
    "\u0003\u0002\u0002\u0002CD\u0007u\u0002\u0002DE\u0007k\u0002\u0002E",
    "F\u0007p\u0002\u0002FG\u0007*\u0002\u0002G\u0016\u0003\u0002\u0002\u0002",
    "HI\u0007e\u0002\u0002IJ\u0007q\u0002\u0002JK\u0007u\u0002\u0002KL\u0007",
    "*\u0002\u0002L\u0018\u0003\u0002\u0002\u0002MN\u0007v\u0002\u0002NO",
    "\u0007c\u0002\u0002OP\u0007p\u0002\u0002PQ\u0007*\u0002\u0002Q\u001a",
    "\u0003\u0002\u0002\u0002RS\u0007e\u0002\u0002ST\u0007q\u0002\u0002T",
    "U\u0007v\u0002\u0002UV\u0007*\u0002\u0002V\u001c\u0003\u0002\u0002\u0002",
    "WX\u0007n\u0002\u0002XY\u0007q\u0002\u0002YZ\u0007i\u0002\u0002Z[\u0007",
    "*\u0002\u0002[\u001e\u0003\u0002\u0002\u0002\\^\t\u0002\u0002\u0002",
    "]\\\u0003\u0002\u0002\u0002^_\u0003\u0002\u0002\u0002_]\u0003\u0002",
    "\u0002\u0002_`\u0003\u0002\u0002\u0002` \u0003\u0002\u0002\u0002ac\u0005",
    "%\u0013\u0002ba\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002db",
    "\u0003\u0002\u0002\u0002de\u0003\u0002\u0002\u0002e\"\u0003\u0002\u0002",
    "\u0002fh\u0005%\u0013\u0002gf\u0003\u0002\u0002\u0002hi\u0003\u0002",
    "\u0002\u0002ig\u0003\u0002\u0002\u0002ij\u0003\u0002\u0002\u0002jk\u0003",
    "\u0002\u0002\u0002ko\u00070\u0002\u0002ln\u0005%\u0013\u0002ml\u0003",
    "\u0002\u0002\u0002nq\u0003\u0002\u0002\u0002om\u0003\u0002\u0002\u0002",
    "op\u0003\u0002\u0002\u0002p$\u0003\u0002\u0002\u0002qo\u0003\u0002\u0002",
    "\u0002rs\u00042;\u0002s&\u0003\u0002\u0002\u0002tv\t\u0003\u0002\u0002",
    "ut\u0003\u0002\u0002\u0002vw\u0003\u0002\u0002\u0002wu\u0003\u0002\u0002",
    "\u0002wx\u0003\u0002\u0002\u0002xy\u0003\u0002\u0002\u0002yz\b\u0014",
    "\u0002\u0002z(\u0003\u0002\u0002\u0002\b\u0002_diow\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function ExprLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

ExprLexer.prototype = Object.create(antlr4.Lexer.prototype);
ExprLexer.prototype.constructor = ExprLexer;

Object.defineProperty(ExprLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

ExprLexer.EOF = antlr4.Token.EOF;
ExprLexer.T__0 = 1;
ExprLexer.T__1 = 2;
ExprLexer.T__2 = 3;
ExprLexer.T__3 = 4;
ExprLexer.T__4 = 5;
ExprLexer.T__5 = 6;
ExprLexer.T__6 = 7;
ExprLexer.T__7 = 8;
ExprLexer.T__8 = 9;
ExprLexer.T__9 = 10;
ExprLexer.T__10 = 11;
ExprLexer.T__11 = 12;
ExprLexer.T__12 = 13;
ExprLexer.T__13 = 14;
ExprLexer.COLUMN = 15;
ExprLexer.INT = 16;
ExprLexer.FLOAT = 17;
ExprLexer.WS = 18;

ExprLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

ExprLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

ExprLexer.prototype.literalNames = [ null, "'+'", "'-'", "'*'", "'/'", "'('", 
                                     "')'", "'round('", "','", "'abs('", 
                                     "'sin('", "'cos('", "'tan('", "'cot('", 
                                     "'log('" ];

ExprLexer.prototype.symbolicNames = [ null, null, null, null, null, null, 
                                      null, null, null, null, null, null, 
                                      null, null, null, "COLUMN", "INT", 
                                      "FLOAT", "WS" ];

ExprLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", 
                                  "T__5", "T__6", "T__7", "T__8", "T__9", 
                                  "T__10", "T__11", "T__12", "T__13", "COLUMN", 
                                  "INT", "FLOAT", "DIGIT", "WS" ];

ExprLexer.prototype.grammarFileName = "Expr.g4";



exports.ExprLexer = ExprLexer;

