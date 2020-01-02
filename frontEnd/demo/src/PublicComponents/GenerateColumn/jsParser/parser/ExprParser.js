// Generated from Expr.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('../antlr4/index');
var ExprListener = require('./ExprListener').ExprListener;
var grammarFileName = "Expr.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0013A\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002\u000e\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0007\u0002\u001c\n\u0002\f\u0002\u000e\u0002",
    "\u001f\u000b\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0005\u0003?\n\u0003\u0003\u0003\u0002\u0003\u0002",
    "\u0004\u0002\u0004\u0002\u0003\u0003\u0002\u0011\u0012\u0002J\u0002",
    "\r\u0003\u0002\u0002\u0002\u0004>\u0003\u0002\u0002\u0002\u0006\u0007",
    "\b\u0002\u0001\u0002\u0007\b\u0007\u0007\u0002\u0002\b\t\u0005\u0002",
    "\u0002\u0002\t\n\u0007\b\u0002\u0002\n\u000e\u0003\u0002\u0002\u0002",
    "\u000b\u000e\t\u0002\u0002\u0002\f\u000e\u0005\u0004\u0003\u0002\r\u0006",
    "\u0003\u0002\u0002\u0002\r\u000b\u0003\u0002\u0002\u0002\r\f\u0003\u0002",
    "\u0002\u0002\u000e\u001d\u0003\u0002\u0002\u0002\u000f\u0010\f\t\u0002",
    "\u0002\u0010\u0011\u0007\u0003\u0002\u0002\u0011\u001c\u0005\u0002\u0002",
    "\n\u0012\u0013\f\b\u0002\u0002\u0013\u0014\u0007\u0004\u0002\u0002\u0014",
    "\u001c\u0005\u0002\u0002\t\u0015\u0016\f\u0007\u0002\u0002\u0016\u0017",
    "\u0007\u0005\u0002\u0002\u0017\u001c\u0005\u0002\u0002\b\u0018\u0019",
    "\f\u0006\u0002\u0002\u0019\u001a\u0007\u0006\u0002\u0002\u001a\u001c",
    "\u0005\u0002\u0002\u0007\u001b\u000f\u0003\u0002\u0002\u0002\u001b\u0012",
    "\u0003\u0002\u0002\u0002\u001b\u0015\u0003\u0002\u0002\u0002\u001b\u0018",
    "\u0003\u0002\u0002\u0002\u001c\u001f\u0003\u0002\u0002\u0002\u001d\u001b",
    "\u0003\u0002\u0002\u0002\u001d\u001e\u0003\u0002\u0002\u0002\u001e\u0003",
    "\u0003\u0002\u0002\u0002\u001f\u001d\u0003\u0002\u0002\u0002 !\u0007",
    "\t\u0002\u0002!\"\u0005\u0002\u0002\u0002\"#\u0007\n\u0002\u0002#$\u0007",
    "\u0011\u0002\u0002$%\u0007\b\u0002\u0002%?\u0003\u0002\u0002\u0002&",
    "\'\u0007\u000b\u0002\u0002\'(\u0005\u0002\u0002\u0002()\u0007\b\u0002",
    "\u0002)?\u0003\u0002\u0002\u0002*+\u0007\f\u0002\u0002+,\u0005\u0002",
    "\u0002\u0002,-\u0007\b\u0002\u0002-?\u0003\u0002\u0002\u0002./\u0007",
    "\r\u0002\u0002/0\u0005\u0002\u0002\u000201\u0007\b\u0002\u00021?\u0003",
    "\u0002\u0002\u000223\u0007\u000e\u0002\u000234\u0005\u0002\u0002\u0002",
    "45\u0007\b\u0002\u00025?\u0003\u0002\u0002\u000267\u0007\u000f\u0002",
    "\u000278\u0005\u0002\u0002\u000289\u0007\b\u0002\u00029?\u0003\u0002",
    "\u0002\u0002:;\u0007\u0010\u0002\u0002;<\u0005\u0002\u0002\u0002<=\u0007",
    "\b\u0002\u0002=?\u0003\u0002\u0002\u0002> \u0003\u0002\u0002\u0002>",
    "&\u0003\u0002\u0002\u0002>*\u0003\u0002\u0002\u0002>.\u0003\u0002\u0002",
    "\u0002>2\u0003\u0002\u0002\u0002>6\u0003\u0002\u0002\u0002>:\u0003\u0002",
    "\u0002\u0002?\u0005\u0003\u0002\u0002\u0002\u0006\r\u001b\u001d>"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'+'", "'-'", "'*'", "'/'", "'('", "')'", "'round('", 
                     "','", "'abs('", "'sin('", "'cos('", "'tan('", "'cot('", 
                     "'log('" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, null, null, null, null, null, "INT", "FLOAT", 
                      "WS" ];

var ruleNames =  [ "e", "func" ];

function ExprParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

ExprParser.prototype = Object.create(antlr4.Parser.prototype);
ExprParser.prototype.constructor = ExprParser;

Object.defineProperty(ExprParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

ExprParser.EOF = antlr4.Token.EOF;
ExprParser.T__0 = 1;
ExprParser.T__1 = 2;
ExprParser.T__2 = 3;
ExprParser.T__3 = 4;
ExprParser.T__4 = 5;
ExprParser.T__5 = 6;
ExprParser.T__6 = 7;
ExprParser.T__7 = 8;
ExprParser.T__8 = 9;
ExprParser.T__9 = 10;
ExprParser.T__10 = 11;
ExprParser.T__11 = 12;
ExprParser.T__12 = 13;
ExprParser.T__13 = 14;
ExprParser.INT = 15;
ExprParser.FLOAT = 16;
ExprParser.WS = 17;

ExprParser.RULE_e = 0;
ExprParser.RULE_func = 1;

function EContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_e;
    return this;
}

EContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
EContext.prototype.constructor = EContext;


 
EContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function DivideExprContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DivideExprContext.prototype = Object.create(EContext.prototype);
DivideExprContext.prototype.constructor = DivideExprContext;

ExprParser.DivideExprContext = DivideExprContext;

DivideExprContext.prototype.e = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EContext);
    } else {
        return this.getTypedRuleContext(EContext,i);
    }
};
DivideExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterDivideExpr(this);
	}
};

DivideExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitDivideExpr(this);
	}
};


function AddExprContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AddExprContext.prototype = Object.create(EContext.prototype);
AddExprContext.prototype.constructor = AddExprContext;

ExprParser.AddExprContext = AddExprContext;

AddExprContext.prototype.e = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EContext);
    } else {
        return this.getTypedRuleContext(EContext,i);
    }
};
AddExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterAddExpr(this);
	}
};

AddExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitAddExpr(this);
	}
};


function MutipleExprContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MutipleExprContext.prototype = Object.create(EContext.prototype);
MutipleExprContext.prototype.constructor = MutipleExprContext;

ExprParser.MutipleExprContext = MutipleExprContext;

MutipleExprContext.prototype.e = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EContext);
    } else {
        return this.getTypedRuleContext(EContext,i);
    }
};
MutipleExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterMutipleExpr(this);
	}
};

MutipleExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitMutipleExpr(this);
	}
};


function BracketExprContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BracketExprContext.prototype = Object.create(EContext.prototype);
BracketExprContext.prototype.constructor = BracketExprContext;

ExprParser.BracketExprContext = BracketExprContext;

BracketExprContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
BracketExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterBracketExpr(this);
	}
};

BracketExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitBracketExpr(this);
	}
};


function NumberExprContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NumberExprContext.prototype = Object.create(EContext.prototype);
NumberExprContext.prototype.constructor = NumberExprContext;

ExprParser.NumberExprContext = NumberExprContext;

NumberExprContext.prototype.INT = function() {
    return this.getToken(ExprParser.INT, 0);
};

NumberExprContext.prototype.FLOAT = function() {
    return this.getToken(ExprParser.FLOAT, 0);
};
NumberExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterNumberExpr(this);
	}
};

NumberExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitNumberExpr(this);
	}
};


function FunctionContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FunctionContext.prototype = Object.create(EContext.prototype);
FunctionContext.prototype.constructor = FunctionContext;

ExprParser.FunctionContext = FunctionContext;

FunctionContext.prototype.func = function() {
    return this.getTypedRuleContext(FuncContext,0);
};
FunctionContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterFunction(this);
	}
};

FunctionContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitFunction(this);
	}
};


function MinusExprContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MinusExprContext.prototype = Object.create(EContext.prototype);
MinusExprContext.prototype.constructor = MinusExprContext;

ExprParser.MinusExprContext = MinusExprContext;

MinusExprContext.prototype.e = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EContext);
    } else {
        return this.getTypedRuleContext(EContext,i);
    }
};
MinusExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterMinusExpr(this);
	}
};

MinusExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitMinusExpr(this);
	}
};



ExprParser.prototype.e = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new EContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 0;
    this.enterRecursionRule(localctx, 0, ExprParser.RULE_e, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 11;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ExprParser.T__4:
            localctx = new BracketExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 5;
            this.match(ExprParser.T__4);
            this.state = 6;
            this.e(0);
            this.state = 7;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.INT:
        case ExprParser.FLOAT:
            localctx = new NumberExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 9;
            _la = this._input.LA(1);
            if(!(_la===ExprParser.INT || _la===ExprParser.FLOAT)) {
            this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            break;
        case ExprParser.T__6:
        case ExprParser.T__8:
        case ExprParser.T__9:
        case ExprParser.T__10:
        case ExprParser.T__11:
        case ExprParser.T__12:
        case ExprParser.T__13:
            localctx = new FunctionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 10;
            this.func();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 27;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 25;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new AddExprContext(this, new EContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_e);
                    this.state = 13;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 14;
                    this.match(ExprParser.T__0);
                    this.state = 15;
                    this.e(8);
                    break;

                case 2:
                    localctx = new MinusExprContext(this, new EContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_e);
                    this.state = 16;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 17;
                    this.match(ExprParser.T__1);
                    this.state = 18;
                    this.e(7);
                    break;

                case 3:
                    localctx = new MutipleExprContext(this, new EContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_e);
                    this.state = 19;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 20;
                    this.match(ExprParser.T__2);
                    this.state = 21;
                    this.e(6);
                    break;

                case 4:
                    localctx = new DivideExprContext(this, new EContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_e);
                    this.state = 22;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 23;
                    this.match(ExprParser.T__3);
                    this.state = 24;
                    this.e(5);
                    break;

                } 
            }
            this.state = 29;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function FuncContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = ExprParser.RULE_func;
    return this;
}

FuncContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FuncContext.prototype.constructor = FuncContext;


 
FuncContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function TanContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

TanContext.prototype = Object.create(FuncContext.prototype);
TanContext.prototype.constructor = TanContext;

ExprParser.TanContext = TanContext;

TanContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
TanContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterTan(this);
	}
};

TanContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitTan(this);
	}
};


function AbsContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AbsContext.prototype = Object.create(FuncContext.prototype);
AbsContext.prototype.constructor = AbsContext;

ExprParser.AbsContext = AbsContext;

AbsContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
AbsContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterAbs(this);
	}
};

AbsContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitAbs(this);
	}
};


function RoundContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

RoundContext.prototype = Object.create(FuncContext.prototype);
RoundContext.prototype.constructor = RoundContext;

ExprParser.RoundContext = RoundContext;

RoundContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};

RoundContext.prototype.INT = function() {
    return this.getToken(ExprParser.INT, 0);
};
RoundContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterRound(this);
	}
};

RoundContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitRound(this);
	}
};


function LogContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

LogContext.prototype = Object.create(FuncContext.prototype);
LogContext.prototype.constructor = LogContext;

ExprParser.LogContext = LogContext;

LogContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
LogContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterLog(this);
	}
};

LogContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitLog(this);
	}
};


function CosContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CosContext.prototype = Object.create(FuncContext.prototype);
CosContext.prototype.constructor = CosContext;

ExprParser.CosContext = CosContext;

CosContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
CosContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterCos(this);
	}
};

CosContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitCos(this);
	}
};


function SinContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

SinContext.prototype = Object.create(FuncContext.prototype);
SinContext.prototype.constructor = SinContext;

ExprParser.SinContext = SinContext;

SinContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
SinContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterSin(this);
	}
};

SinContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitSin(this);
	}
};


function CotContext(parser, ctx) {
	FuncContext.call(this, parser);
    FuncContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CotContext.prototype = Object.create(FuncContext.prototype);
CotContext.prototype.constructor = CotContext;

ExprParser.CotContext = CotContext;

CotContext.prototype.e = function() {
    return this.getTypedRuleContext(EContext,0);
};
CotContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterCot(this);
	}
};

CotContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitCot(this);
	}
};



ExprParser.FuncContext = FuncContext;

ExprParser.prototype.func = function() {

    var localctx = new FuncContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ExprParser.RULE_func);
    try {
        this.state = 60;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ExprParser.T__6:
            localctx = new RoundContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 30;
            this.match(ExprParser.T__6);
            this.state = 31;
            this.e(0);
            this.state = 32;
            this.match(ExprParser.T__7);
            this.state = 33;
            this.match(ExprParser.INT);
            this.state = 34;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__8:
            localctx = new AbsContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 36;
            this.match(ExprParser.T__8);
            this.state = 37;
            this.e(0);
            this.state = 38;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__9:
            localctx = new SinContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 40;
            this.match(ExprParser.T__9);
            this.state = 41;
            this.e(0);
            this.state = 42;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__10:
            localctx = new CosContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 44;
            this.match(ExprParser.T__10);
            this.state = 45;
            this.e(0);
            this.state = 46;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__11:
            localctx = new TanContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 48;
            this.match(ExprParser.T__11);
            this.state = 49;
            this.e(0);
            this.state = 50;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__12:
            localctx = new CotContext(this, localctx);
            this.enterOuterAlt(localctx, 6);
            this.state = 52;
            this.match(ExprParser.T__12);
            this.state = 53;
            this.e(0);
            this.state = 54;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__13:
            localctx = new LogContext(this, localctx);
            this.enterOuterAlt(localctx, 7);
            this.state = 56;
            this.match(ExprParser.T__13);
            this.state = 57;
            this.e(0);
            this.state = 58;
            this.match(ExprParser.T__5);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


ExprParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 0:
			return this.e_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

ExprParser.prototype.e_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 7);
		case 1:
			return this.precpred(this._ctx, 6);
		case 2:
			return this.precpred(this._ctx, 5);
		case 3:
			return this.precpred(this._ctx, 4);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.ExprParser = ExprParser;
