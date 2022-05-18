export enum OperatorType{
    ERROR = -1,

    //0
    VALUE,
    CONDITIONAL,

    //2
    RELATIONAL,
    EQUALS_TO,
    DIFERENT,
    LESS,
    MORE,
    LESS_EQUALS,
    MORE_EQUALS,
    INCERTITUDE,

    //10
    LOGIC,
    AND,
    OR,
    XOR,
    NOT,

    //15
    ARITMETIC,
    ADD,
    MINUS,
    TIMES,
    DIV,
    MOD,
    POW,

    //22
    AGRUP//no pertenece a un tipo de operador en particular, solo al de él mismo [agrup xD]    
}