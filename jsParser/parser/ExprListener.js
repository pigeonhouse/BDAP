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

// Enter a parse tree produced by ExprParser#basicOperation.
ExprListener.prototype.enterBasicOperation = function(ctx) {
};

// Exit a parse tree produced by ExprParser#basicOperation.
ExprListener.prototype.exitBasicOperation = function(ctx) {
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


// Enter a parse tree produced by ExprParser#columnName.
ExprListener.prototype.enterColumnName = function(ctx) {
};

// Exit a parse tree produced by ExprParser#columnName.
ExprListener.prototype.exitColumnName = function(ctx) {
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



exports.ExprListener = ExprListener;