// Generated from Expr.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('../antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0013t\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003",
    "\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u000f\u0003\u0010\u0006\u0010\\\n\u0010\r\u0010\u000e\u0010",
    "]\u0003\u0011\u0006\u0011a\n\u0011\r\u0011\u000e\u0011b\u0003\u0011",
    "\u0003\u0011\u0007\u0011g\n\u0011\f\u0011\u000e\u0011j\u000b\u0011\u0003",
    "\u0012\u0003\u0012\u0003\u0013\u0006\u0013o\n\u0013\r\u0013\u000e\u0013",
    "p\u0003\u0013\u0003\u0013\u0002\u0002\u0014\u0003\u0003\u0005\u0004",
    "\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013\u000b\u0015",
    "\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0010\u001f\u0011!\u0012#\u0002",
    "%\u0013\u0003\u0002\u0003\u0004\u0002\u000b\u000b\"\"\u0002v\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013",
    "\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017",
    "\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b",
    "\u0003\u0002\u0002\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0002\u001f",
    "\u0003\u0002\u0002\u0002\u0002!\u0003\u0002\u0002\u0002\u0002%\u0003",
    "\u0002\u0002\u0002\u0003\'\u0003\u0002\u0002\u0002\u0005)\u0003\u0002",
    "\u0002\u0002\u0007+\u0003\u0002\u0002\u0002\t-\u0003\u0002\u0002\u0002",
    "\u000b/\u0003\u0002\u0002\u0002\r1\u0003\u0002\u0002\u0002\u000f3\u0003",
    "\u0002\u0002\u0002\u0011:\u0003\u0002\u0002\u0002\u0013<\u0003\u0002",
    "\u0002\u0002\u0015A\u0003\u0002\u0002\u0002\u0017F\u0003\u0002\u0002",
    "\u0002\u0019K\u0003\u0002\u0002\u0002\u001bP\u0003\u0002\u0002\u0002",
    "\u001dU\u0003\u0002\u0002\u0002\u001f[\u0003\u0002\u0002\u0002!`\u0003",
    "\u0002\u0002\u0002#k\u0003\u0002\u0002\u0002%n\u0003\u0002\u0002\u0002",
    "\'(\u0007-\u0002\u0002(\u0004\u0003\u0002\u0002\u0002)*\u0007/\u0002",
    "\u0002*\u0006\u0003\u0002\u0002\u0002+,\u0007,\u0002\u0002,\b\u0003",
    "\u0002\u0002\u0002-.\u00071\u0002\u0002.\n\u0003\u0002\u0002\u0002/",
    "0\u0007*\u0002\u00020\f\u0003\u0002\u0002\u000212\u0007+\u0002\u0002",
    "2\u000e\u0003\u0002\u0002\u000234\u0007t\u0002\u000245\u0007q\u0002",
    "\u000256\u0007w\u0002\u000267\u0007p\u0002\u000278\u0007f\u0002\u0002",
    "89\u0007*\u0002\u00029\u0010\u0003\u0002\u0002\u0002:;\u0007.\u0002",
    "\u0002;\u0012\u0003\u0002\u0002\u0002<=\u0007c\u0002\u0002=>\u0007d",
    "\u0002\u0002>?\u0007u\u0002\u0002?@\u0007*\u0002\u0002@\u0014\u0003",
    "\u0002\u0002\u0002AB\u0007u\u0002\u0002BC\u0007k\u0002\u0002CD\u0007",
    "p\u0002\u0002DE\u0007*\u0002\u0002E\u0016\u0003\u0002\u0002\u0002FG",
    "\u0007e\u0002\u0002GH\u0007q\u0002\u0002HI\u0007u\u0002\u0002IJ\u0007",
    "*\u0002\u0002J\u0018\u0003\u0002\u0002\u0002KL\u0007v\u0002\u0002LM",
    "\u0007c\u0002\u0002MN\u0007p\u0002\u0002NO\u0007*\u0002\u0002O\u001a",
    "\u0003\u0002\u0002\u0002PQ\u0007e\u0002\u0002QR\u0007q\u0002\u0002R",
    "S\u0007v\u0002\u0002ST\u0007*\u0002\u0002T\u001c\u0003\u0002\u0002\u0002",
    "UV\u0007n\u0002\u0002VW\u0007q\u0002\u0002WX\u0007i\u0002\u0002XY\u0007",
    "*\u0002\u0002Y\u001e\u0003\u0002\u0002\u0002Z\\\u0005#\u0012\u0002[",
    "Z\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002][\u0003\u0002\u0002",
    "\u0002]^\u0003\u0002\u0002\u0002^ \u0003\u0002\u0002\u0002_a\u0005#",
    "\u0012\u0002`_\u0003\u0002\u0002\u0002ab\u0003\u0002\u0002\u0002b`\u0003",
    "\u0002\u0002\u0002bc\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002",
    "dh\u00070\u0002\u0002eg\u0005#\u0012\u0002fe\u0003\u0002\u0002\u0002",
    "gj\u0003\u0002\u0002\u0002hf\u0003\u0002\u0002\u0002hi\u0003\u0002\u0002",
    "\u0002i\"\u0003\u0002\u0002\u0002jh\u0003\u0002\u0002\u0002kl\u0004",
    "2;\u0002l$\u0003\u0002\u0002\u0002mo\t\u0002\u0002\u0002nm\u0003\u0002",
    "\u0002\u0002op\u0003\u0002\u0002\u0002pn\u0003\u0002\u0002\u0002pq\u0003",
    "\u0002\u0002\u0002qr\u0003\u0002\u0002\u0002rs\b\u0013\u0002\u0002s",
    "&\u0003\u0002\u0002\u0002\u0007\u0002]bhp\u0003\b\u0002\u0002"].join("");


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
ExprLexer.INT = 15;
ExprLexer.FLOAT = 16;
ExprLexer.WS = 17;

ExprLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

ExprLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

ExprLexer.prototype.literalNames = [ null, "'+'", "'-'", "'*'", "'/'", "'('", 
                                     "')'", "'round('", "','", "'abs('", 
                                     "'sin('", "'cos('", "'tan('", "'cot('", 
                                     "'log('" ];

ExprLexer.prototype.symbolicNames = [ null, null, null, null, null, null, 
                                      null, null, null, null, null, null, 
                                      null, null, null, "INT", "FLOAT", 
                                      "WS" ];

ExprLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", 
                                  "T__5", "T__6", "T__7", "T__8", "T__9", 
                                  "T__10", "T__11", "T__12", "T__13", "INT", 
                                  "FLOAT", "DIGIT", "WS" ];

ExprLexer.prototype.grammarFileName = "Expr.g4";



exports.ExprLexer = ExprLexer;

