grammar Expr;

e: e ('+'|'-'|'*'|'/') e    # basicOperation
|'(' e ')'                  # bracketExpr
| (INT | FLOAT)             # numberExpr
| COLUMN                # columnName
| func              # function;

func : 'round(' e ',' INT ')'   #round
| 'abs(' e ')'                  #abs;

COLUMN : [a-z|A-Z]+;

INT :  DIGIT+;

FLOAT :  DIGIT+ '.' DIGIT* ;

fragment DIGIT: '0'..'9';

WS : [ \t]+ -> skip;

