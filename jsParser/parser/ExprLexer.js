// Generated from Expr.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u000fX\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0003\u0002",
    "\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003",
    "\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b\u0006\u000b;\n\u000b",
    "\r\u000b\u000e\u000b<\u0003\f\u0006\f@\n\f\r\f\u000e\fA\u0003\r\u0006",
    "\rE\n\r\r\r\u000e\rF\u0003\r\u0003\r\u0007\rK\n\r\f\r\u000e\rN\u000b",
    "\r\u0003\u000e\u0003\u000e\u0003\u000f\u0006\u000fS\n\u000f\r\u000f",
    "\u000e\u000fT\u0003\u000f\u0003\u000f\u0002\u0002\u0010\u0003\u0003",
    "\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013",
    "\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u0002\u001d\u000f\u0003\u0002",
    "\u0004\u0005\u0002C\\c|~~\u0004\u0002\u000b\u000b\"\"\u0002[\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013",
    "\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017",
    "\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001d",
    "\u0003\u0002\u0002\u0002\u0003\u001f\u0003\u0002\u0002\u0002\u0005!",
    "\u0003\u0002\u0002\u0002\u0007#\u0003\u0002\u0002\u0002\t%\u0003\u0002",
    "\u0002\u0002\u000b\'\u0003\u0002\u0002\u0002\r)\u0003\u0002\u0002\u0002",
    "\u000f+\u0003\u0002\u0002\u0002\u00112\u0003\u0002\u0002\u0002\u0013",
    "4\u0003\u0002\u0002\u0002\u0015:\u0003\u0002\u0002\u0002\u0017?\u0003",
    "\u0002\u0002\u0002\u0019D\u0003\u0002\u0002\u0002\u001bO\u0003\u0002",
    "\u0002\u0002\u001dR\u0003\u0002\u0002\u0002\u001f \u0007-\u0002\u0002",
    " \u0004\u0003\u0002\u0002\u0002!\"\u0007/\u0002\u0002\"\u0006\u0003",
    "\u0002\u0002\u0002#$\u0007,\u0002\u0002$\b\u0003\u0002\u0002\u0002%",
    "&\u00071\u0002\u0002&\n\u0003\u0002\u0002\u0002\'(\u0007*\u0002\u0002",
    "(\f\u0003\u0002\u0002\u0002)*\u0007+\u0002\u0002*\u000e\u0003\u0002",
    "\u0002\u0002+,\u0007t\u0002\u0002,-\u0007q\u0002\u0002-.\u0007w\u0002",
    "\u0002./\u0007p\u0002\u0002/0\u0007f\u0002\u000201\u0007*\u0002\u0002",
    "1\u0010\u0003\u0002\u0002\u000223\u0007.\u0002\u00023\u0012\u0003\u0002",
    "\u0002\u000245\u0007c\u0002\u000256\u0007d\u0002\u000267\u0007u\u0002",
    "\u000278\u0007*\u0002\u00028\u0014\u0003\u0002\u0002\u00029;\t\u0002",
    "\u0002\u0002:9\u0003\u0002\u0002\u0002;<\u0003\u0002\u0002\u0002<:\u0003",
    "\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002=\u0016\u0003\u0002\u0002",
    "\u0002>@\u0005\u001b\u000e\u0002?>\u0003\u0002\u0002\u0002@A\u0003\u0002",
    "\u0002\u0002A?\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002B\u0018",
    "\u0003\u0002\u0002\u0002CE\u0005\u001b\u000e\u0002DC\u0003\u0002\u0002",
    "\u0002EF\u0003\u0002\u0002\u0002FD\u0003\u0002\u0002\u0002FG\u0003\u0002",
    "\u0002\u0002GH\u0003\u0002\u0002\u0002HL\u00070\u0002\u0002IK\u0005",
    "\u001b\u000e\u0002JI\u0003\u0002\u0002\u0002KN\u0003\u0002\u0002\u0002",
    "LJ\u0003\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002M\u001a\u0003\u0002",
    "\u0002\u0002NL\u0003\u0002\u0002\u0002OP\u00042;\u0002P\u001c\u0003",
    "\u0002\u0002\u0002QS\t\u0003\u0002\u0002RQ\u0003\u0002\u0002\u0002S",
    "T\u0003\u0002\u0002\u0002TR\u0003\u0002\u0002\u0002TU\u0003\u0002\u0002",
    "\u0002UV\u0003\u0002\u0002\u0002VW\b\u000f\u0002\u0002W\u001e\u0003",
    "\u0002\u0002\u0002\b\u0002<AFLT\u0003\b\u0002\u0002"].join("");


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
ExprLexer.COLUMN = 10;
ExprLexer.INT = 11;
ExprLexer.FLOAT = 12;
ExprLexer.WS = 13;

ExprLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

ExprLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

ExprLexer.prototype.literalNames = [ null, "'+'", "'-'", "'*'", "'/'", "'('", 
                                     "')'", "'round('", "','", "'abs('" ];

ExprLexer.prototype.symbolicNames = [ null, null, null, null, null, null, 
                                      null, null, null, null, "COLUMN", 
                                      "INT", "FLOAT", "WS" ];

ExprLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", 
                                  "T__5", "T__6", "T__7", "T__8", "COLUMN", 
                                  "INT", "FLOAT", "DIGIT", "WS" ];

ExprLexer.prototype.grammarFileName = "Expr.g4";



exports.ExprLexer = ExprLexer;

