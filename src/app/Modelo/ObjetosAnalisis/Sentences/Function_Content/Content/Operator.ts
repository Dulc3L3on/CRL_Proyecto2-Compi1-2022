import { OperatorType } from "./OperatorType";

export class Operator{
    type:OperatorType;//logic, relational, aritmetic
    operator:OperatorType;//AND, OR... LESS, MORE... ADD, MINUS... 

    constructor(type:OperatorType, operator:OperatorType){
        this.type = type;
        this.operator = operator;
    }
    
    getType():OperatorType{
        return this.type;
    }//la clasificación del signo

    getOperator():OperatorType{
        return this.operator;
    }//el operador específico
}