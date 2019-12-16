grammar Expr;

e: e '+' e              # addExpr
| e '-' e               # minusExpr
| e '*' e               # mutipleExpr
| e '/' e               # divideExpr
|'(' e ')'                  # bracketExpr
| (INT | FLOAT)             # numberExpr
//| COLUMN                # columnName
| func              # function;
         

func : 'round(' e ',' INT ')'   #round
| 'abs(' e ')'                  #abs
| 'sin(' e ')'                  #sin
| 'cos(' e ')'                  #cos
| 'tan(' e ')'                  #tan
| 'cot(' e ')'                  #cot
| 'log(' e ')'                  #log;

//COLUMN : [a-z|A-Z]+;

INT :  DIGIT+;

FLOAT :  DIGIT+ '.' DIGIT* ;

fragment DIGIT: '0'..'9';

WS : [ \t]+ -> skip;

