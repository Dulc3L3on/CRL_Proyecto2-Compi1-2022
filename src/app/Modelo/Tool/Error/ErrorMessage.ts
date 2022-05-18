export enum ErrorMessage{
    INEXSITENT_VAR = "There is no variable with that name",
    ABSENT_EXPR_RETURN_FUNCTION = "A function must return a value",
    UNMATCH_EXPR_RETURN_FUNCTION = "A function cannot return other type",
    EXISTENT_UNNECESARY_RETURN_EXPR = "A method cannot return any expression",
    EXISTENT_UNNECESARY_RETURN_EXPR_MAIN = "The main function cannot return any value, because it type is VOID",
    BOOLEAN_REQUIRED_IF = "An IF condition require be BOOLEAN",
    BOOLEAN_REQUIRED_LOOP = "An Loop condition require be BOOLEAN",
    INCORRECT_ASIGNATED_TYPE = "The asignated value type don't correspond at variable type",
    DRAW_INSTRUCTION_ERRATED = "Draw fun with errors, cannot execute it correctly",
    DRAW_SCRIPT_FAILED_AST = "Encountered errors at tried draw the AST",
    DRAW_SCRIPT_FAILED_EXPR_AST = "Encountered errors at tried draw the EXPR AST",
    DRAW_SCRIPT_FAILED_TS = "Encountered errors at tried draw the TS representation",
    UNMATCH_ASIGNATED_VALUE = "Asignated value type unmatch with the variable's type",
    MORE_SAME_REQUEST = "Cannot request a same param more than 1 times",
    UNMATCH_WITH_REQUEST_PARAM = "Number of arguments missmatch with request",
    SHOW_DIRECTIVE_WITH_ERRORS = "Errors on Mostrar directive, impossible execute correctly",
    EXPRESSION_WITH_ERRORS = "Imposible to analize expretions with errors",
    INCORRECT_INCERTITUDE_VALUE = "The incertitude only can be aplicate on numbers and STRINGs",
    INCORRECT_NEGATED_VALUE = "Cannot negate values isn't be BOOLEAN",
    INCERTITUDE_WITH_ERRORS = "The declarated incertitude, cannot read",
    BOOLEAN_PART_REQUIRED = "A logical expression needs both parts to be boolean",
    EXPRESSION_PART_WITH_ERRORS = "One or more expresions with errors, impossible to operate",
    INVOCATED_FUN_INEXISTENT = "There is not proper or imported function that match with the invocated",
    IMPOSSIBLE_ADD = "Cannot add members that unmatch with number or string (to concat)",
    IMPOSSIBLE_RES = "Cannot rest members that unmatch with number",
    IMPOSSIBLE_TIMES = "Cannot rest members that unmatch with number",
    IMPOSSIBLE_DIV = "Cannot times members that unmatch with number",
    IMPOSSIBLE_MOD = "Cannot div members that unmatch with number",
    IMPOSSIBLE_POW = "Cannot app pow operation to members that unmatch with number",
    VOID_FUNCTION_INVOCATED_ON_EXPR = "Must invocate a function 'casue, is required return a value",
    INCORRECT_ASIGNATED_INCERTITUDE = "The asignated incertitde expression is invalid",
    INEXISTENT_IMPORTED_FILE = "The importered file doesn't correspond to any existent file",

    FATAL_ERROR = "Ocurrs a fatal error"
}










/*
line:number, column:number, 
*/

/* 
this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.ABSENT_EXPR_RETURN_FUNCTION,
                this.sourceLocation, this.sentenceName, this.father.getSentenceName()));

*/