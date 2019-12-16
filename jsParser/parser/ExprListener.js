// Generated from Expr.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by ExprParser.
function ExprListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

ExprListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
ExprListener.prototype.constructor = ExprListener;

// Enter a parse tree produced by ExprParser#divideExpr.
ExprListener.prototype.enterDivideExpr = function(ctx) {
};

// Exit a parse tree produced by ExprParser#divideExpr.
ExprListener.prototype.exitDivideExpr = function(ctx) {
};


// Enter a parse tree produced by ExprParser#addExpr.
ExprListener.prototype.enterAddExpr = function(ctx) {
};

// Exit a parse tree produced by ExprParser#addExpr.
ExprListener.prototype.exitAddExpr = function(ctx) {
};


// Enter a parse tree produced by ExprParser#mutipleExpr.
ExprListener.prototype.enterMutipleExpr = function(ctx) {
};

// Exit a parse tree produced by ExprParser#mutipleExpr.
ExprListener.prototype.exitMutipleExpr = function(ctx) {
};


// Enter a parse tree produced by ExprParser#bracketExpr.
ExprListener.prototype.enterBracketExpr = function(ctx) {
};

// Exit a parse tree produced by ExprParser#bracketExpr.
ExprListener.prototype.exitBracketExpr = function(ctx) {
};


// Enter a parse tree produced by ExprParser#numberExpr.
ExprListener.prototype.enterNumberExpr = function(ctx) {
};

// Exit a parse tree produced by ExprParser#numberExpr.
ExprListener.prototype.exitNumberExpr = function(ctx) {
};


// Enter a parse tree produced by ExprParser#function.
ExprListener.prototype.enterFunction = function(ctx) {
};

// Exit a parse tree produced by ExprParser#function.
ExprListener.prototype.exitFunction = function(ctx) {
};


// Enter a parse tree produced by ExprParser#minusExpr.
ExprListener.prototype.enterMinusExpr = function(ctx) {
};

// Exit a parse tree produced by ExprParser#minusExpr.
ExprListener.prototype.exitMinusExpr = function(ctx) {
};


// Enter a parse tree produced by ExprParser#round.
ExprListener.prototype.enterRound = function(ctx) {
};

// Exit a parse tree produced by ExprParser#round.
ExprListener.prototype.exitRound = function(ctx) {
};


// Enter a parse tree produced by ExprParser#abs.
ExprListener.prototype.enterAbs = function(ctx) {
};

// Exit a parse tree produced by ExprParser#abs.
ExprListener.prototype.exitAbs = function(ctx) {
};


// Enter a parse tree produced by ExprParser#sin.
ExprListener.prototype.enterSin = function(ctx) {
};

// Exit a parse tree produced by ExprParser#sin.
ExprListener.prototype.exitSin = function(ctx) {
};


// Enter a parse tree produced by ExprParser#cos.
ExprListener.prototype.enterCos = function(ctx) {
};

// Exit a parse tree produced by ExprParser#cos.
ExprListener.prototype.exitCos = function(ctx) {
};


// Enter a parse tree produced by ExprParser#tan.
ExprListener.prototype.enterTan = function(ctx) {
};

// Exit a parse tree produced by ExprParser#tan.
ExprListener.prototype.exitTan = function(ctx) {
};


// Enter a parse tree produced by ExprParser#cot.
ExprListener.prototype.enterCot = function(ctx) {
};

// Exit a parse tree produced by ExprParser#cot.
ExprListener.prototype.exitCot = function(ctx) {
};


// Enter a parse tree produced by ExprParser#log.
ExprListener.prototype.enterLog = function(ctx) {
};

// Exit a parse tree produced by ExprParser#log.
ExprListener.prototype.exitLog = function(ctx) {
};



exports.ExprListener = ExprListener;