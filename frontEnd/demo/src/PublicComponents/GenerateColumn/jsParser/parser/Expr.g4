grammar Expr;

e: e '+' e              # addExpr
| e '-' e               # minusExpr
| e '*' e               # mutipleExpr
| e '/' e               # divideExpr
|'(' e ')'                  # bracketExpr
| (INT | FLOAT)             # numberExpr
| COLUMN                # columnName
| func              # function;
         
#functions
func : 
  'round(' e ',' INT ')'        #round
| 'abs(' e ')'                  #abs函数，单操作符函数，效果为对元素e取绝对值
| 'sin(' e ')'                  #sin
| 'cos(' e ')'                  #cos
| 'tan(' e ')'                  #tan
| 'cot(' e ')'                  #cot
| 'log(' e ')'                  #log;
#functions-end
COLUMN : ('a' .. 'z' | 'A' .. 'Z' | '\u4E00'..'\u9FA5' | '\uF900'..'\uFA2D'|'0'..'9')+;
//CHARACTER: [az' | 'A' .. 'Z' | '\u4E00'..'\u9FA5' | '\uF900'..'\uFA2D']+;

INT :  DIGIT+;

FLOAT :  DIGIT+ '.' DIGIT* ;

fragment DIGIT: '0'..'9';
WS : [ \t]+ -> skip;

