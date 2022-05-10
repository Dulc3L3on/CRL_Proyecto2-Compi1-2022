export class Operator{
    type:OperatorType;
    operator:OperatorType;
    
    getType():OperatorType{
        return this.type;
    }//la clasificación del signo

    getOperator():OperatorType{
        return this.operator;
    }//el operador específico
}