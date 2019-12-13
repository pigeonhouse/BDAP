// Generated from Expr.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var ExprListener = require('./ExprListener').ExprListener;
var grammarFileName = "Expr.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u000f%\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002\u000f\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0007\u0002\u0014\n\u0002\f\u0002\u000e\u0002\u0017\u000b\u0002\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003#\n\u0003\u0003",
    "\u0003\u0002\u0003\u0002\u0004\u0002\u0004\u0002\u0004\u0003\u0002\r",
    "\u000e\u0003\u0002\u0003\u0006\u0002\'\u0002\u000e\u0003\u0002\u0002",
    "\u0002\u0004\"\u0003\u0002\u0002\u0002\u0006\u0007\b\u0002\u0001\u0002",
    "\u0007\b\u0007\u0007\u0002\u0002\b\t\u0005\u0002\u0002\u0002\t\n\u0007",
    "\b\u0002\u0002\n\u000f\u0003\u0002\u0002\u0002\u000b\u000f\t\u0002\u0002",
    "\u0002\f\u000f\u0007\f\u0002\u0002\r\u000f\u0005\u0004\u0003\u0002\u000e",
    "\u0006\u0003\u0002\u0002\u0002\u000e\u000b\u0003\u0002\u0002\u0002\u000e",
    "\f\u0003\u0002\u0002\u0002\u000e\r\u0003\u0002\u0002\u0002\u000f\u0015",
    "\u0003\u0002\u0002\u0002\u0010\u0011\f\u0007\u0002\u0002\u0011\u0012",
    "\t\u0003\u0002\u0002\u0012\u0014\u0005\u0002\u0002\b\u0013\u0010\u0003",
    "\u0002\u0002\u0002\u0014\u0017\u0003\u0002\u0002\u0002\u0015\u0013\u0003",
    "\u0002\u0002\u0002\u0015\u0016\u0003\u0002\u0002\u0002\u0016\u0003\u0003",
    "\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0018\u0019\u0007",
    "\t\u0002\u0002\u0019\u001a\u0005\u0002\u0002\u0002\u001a\u001b\u0007",
    "\n\u0002\u0002\u001b\u001c\u0007\r\u0002\u0002\u001c\u001d\u0007\b\u0002",
    "\u0002\u001d#\u0003\u0002\u0002\u0002\u001e\u001f\u0007\u000b\u0002",
    "\u0002\u001f \u0005\u0002\u0002\u0002 !\u0007\b\u0002\u0002!#\u0003",
    "\u0002\u0002\u0002\"\u0018\u0003\u0002\u0002\u0002\"\u001e\u0003\u0002",
    "\u0002\u0002#\u0005\u0003\u0002\u0002\u0002\u0005\u000e\u0015\""].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'+'", "'-'", "'*'", "'/'", "'('", "')'", "'round('", 
                     "','", "'abs('" ];

var symbolicNames = [ null, null, null, null, null, null, null, null, null, 
                      null, "COLUMN", "INT", "FLOAT", "WS" ];

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
ExprParser.COLUMN = 10;
ExprParser.INT = 11;
ExprParser.FLOAT = 12;
ExprParser.WS = 13;

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

function BasicOperationContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

BasicOperationContext.prototype = Object.create(EContext.prototype);
BasicOperationContext.prototype.constructor = BasicOperationContext;

ExprParser.BasicOperationContext = BasicOperationContext;

BasicOperationContext.prototype.e = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(EContext);
    } else {
        return this.getTypedRuleContext(EContext,i);
    }
};
BasicOperationContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterBasicOperation(this);
	}
};

BasicOperationContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitBasicOperation(this);
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


function ColumnNameContext(parser, ctx) {
	EContext.call(this, parser);
    EContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ColumnNameContext.prototype = Object.create(EContext.prototype);
ColumnNameContext.prototype.constructor = ColumnNameContext;

ExprParser.ColumnNameContext = ColumnNameContext;

ColumnNameContext.prototype.COLUMN = function() {
    return this.getToken(ExprParser.COLUMN, 0);
};
ColumnNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.enterColumnName(this);
	}
};

ColumnNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof ExprListener ) {
        listener.exitColumnName(this);
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
        this.state = 12;
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
        case ExprParser.COLUMN:
            localctx = new ColumnNameContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 10;
            this.match(ExprParser.COLUMN);
            break;
        case ExprParser.T__6:
        case ExprParser.T__8:
            localctx = new FunctionContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 11;
            this.func();
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 19;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                localctx = new BasicOperationContext(this, new EContext(this, _parentctx, _parentState));
                this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_e);
                this.state = 14;
                if (!( this.precpred(this._ctx, 5))) {
                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                }
                this.state = 15;
                _la = this._input.LA(1);
                if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << ExprParser.T__0) | (1 << ExprParser.T__1) | (1 << ExprParser.T__2) | (1 << ExprParser.T__3))) !== 0))) {
                this._errHandler.recoverInline(this);
                }
                else {
                	this._errHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 16;
                this.e(6); 
            }
            this.state = 21;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
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



ExprParser.FuncContext = FuncContext;

ExprParser.prototype.func = function() {

    var localctx = new FuncContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, ExprParser.RULE_func);
    try {
        this.state = 32;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case ExprParser.T__6:
            localctx = new RoundContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 22;
            this.match(ExprParser.T__6);
            this.state = 23;
            this.e(0);
            this.state = 24;
            this.match(ExprParser.T__7);
            this.state = 25;
            this.match(ExprParser.INT);
            this.state = 26;
            this.match(ExprParser.T__5);
            break;
        case ExprParser.T__8:
            localctx = new AbsContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 28;
            this.match(ExprParser.T__8);
            this.state = 29;
            this.e(0);
            this.state = 30;
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
			return this.precpred(this._ctx, 5);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.ExprParser = ExprParser;
