import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorHandler } from "src/app/Modelo/Handlers/ErrorHandler";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";
import { ContentType } from "../../Class_Content/ContentType";
import { AddResult } from "./AddResult";
import { Caster, types_ADD, types_DIV, types_MOD, types_MULT, types_POW, types_RES } from "./Caster";
import { Expresion } from "./Expresion";
import { OperationResult } from "./OperationResult";
import { OperatorType } from "./OperatorType";
import { Result } from "./Result";

export class OperationHandler{
    caster:Caster;
    errorHandler:ErrorHandler;

    constructor(){
        this.caster = new Caster();
        this.errorHandler = ErrorHandler.getInstance();
    }

    evaluateAddOperator(left:Expresion, right:Expresion):OperationResult{        
        let addType:ContentType = types_ADD[left!.getOperationResultType()][right!.getOperationResultType()];        

        if(addType != ContentType.ERROR){
            if(addType == ContentType.STRING){
                //según lo que estaba viendo, se puede hacer sin problemas que cuando el addType, de STRING, el char se coloque en su rep normal y que cuando sea otro valor, que en este caso debe rep en forma numérica, se coloque con su respect valor ASCII
                //digo que no habrá problemas al hacer eso puesto que supondiendo que ambos hijos del actual operador ADD, hayan sido resultado de ops ADD, para los cuales el tipo de una resultó STRING y el de otra uno que genere un número, al hallar el addType
                //del operador ADD en actual revisión, este devolverá STRING, por lo tanto no habrá problema con que el char no sea un valor numérico, pero si te da error app ese cb, entonces solo deja el getPreferibleSize, sin el operador ternario que se app
                //para exceptuar los CHAR
                let izq:string = ((left!.getOperationType() == OperatorType.ADD)?left!.getResult().getValue():
                            String((left!.getOperationResultType() == ContentType.CHAR)? left!.getResult().getValue():
                                this.caster.getNumber(this.caster.getPreferibleNumberType(left!.getResult().getType()), left!.getResult()).getValue()));
                let der:string = ((right!.getOperationType() == OperatorType.ADD)?right!.getResult().getValue():
                            String((right!.getOperationResultType() == ContentType.CHAR)? right!.getResult().getValue():
                                this.caster.getNumber(this.caster.getPreferibleNumberType(right!.getResult().getType()), right!.getResult()).getValue()));

                let value:string = izq + der;                

                return new AddResult(OperatorType.ADD, new Result(addType, value));//En este caso debe usarse el AddResult, puesto que este objeto es el que contiene la sobreescripción del método getValue, que devulve la suma o concat dependiendo del tipo que haya sido asignado al resultado de la operación...
            }else{
                return new AddResult(OperatorType.ADD, new Result(addType, (String(this.caster.getNumber(addType, left!.getResult()).getValue() + this.caster.getNumber(addType, right!.getResult()).getValue()))));
            }//recuerda que quedamos en que se separarían las axn cuando fuera STRING o un tipo de valor numérico o que pueda convertirse a él y mejor dicho un valor que se req que en la concatenación se muestre como número [todos a except del char, según había dicho el aux... :]
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.IMPOSSIBLE_ADD,
            null, " + ", ""));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a ADD operation"));        
        //en el caso de los errores, a pesar de ser una suma, debe usarse a OperationResult y esto porque el método sobreescrito del getValue, en el AddResult, devulve la suma si no es STRING, bien podría add otra condi, pero ya que se puede usar el OperationResult, entonces mejor ese xD, así no add nada más xD
    }

    evaluateMinusOperator(left:Expresion, right:Expresion):OperationResult{
        let restType:ContentType = types_RES[left!.getOperationResultType()][right!.getOperationResultType()];

        if(restType != ContentType.ERROR){
            return new OperationResult(OperatorType.MINUS, new Result(restType, (this.caster.getNumber(restType, left!.getResult()).getValue() - this.caster.getNumber(restType, right!.getResult()).getValue())));//hasta donde sé typscript no tiene restricc de valores a los que se les puede app los operadores relacionales...
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.IMPOSSIBLE_RES,
            null, " - ", ""));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a REST operation"));        
    }

    evaluateTimesOperator(left:Expresion, right:Expresion):OperationResult{
        let timesType:ContentType = types_MULT[left!.getOperationResultType()][right!.getOperationResultType()];        
                    
        if(timesType != ContentType.ERROR){
            return new OperationResult(OperatorType.TIMES, new Result(timesType, (this.caster.getNumber(timesType, left!.getResult()).getValue() * this.caster.getNumber(timesType, right!.getResult()).getValue())));
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.IMPOSSIBLE_TIMES,
            null, " * ", ""));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a TIMES operation"));        
    }

    evaluateDivOperator(left:Expresion, right:Expresion):OperationResult{
        let divType:ContentType = types_DIV[left!.getOperationResultType()][right!.getOperationResultType()];

        if(divType != ContentType.ERROR){
            return new OperationResult(OperatorType.DIV, new Result(divType, (this.caster.getNumber(divType, left!.getResult()).getValue() / this.caster.getNumber(divType, right!.getResult()).getValue())));//si da error en tiempo de exe, entonces susti esto por (a || b) && !(a && b)
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.IMPOSSIBLE_DIV,
            null, " / ", ""));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a DIV operation"));        
    }

    evaluateModOperator(left:Expresion, right:Expresion):OperationResult{
        let modType:ContentType = types_MOD[left!.getOperationResultType()][right!.getOperationResultType()];

        if(modType != ContentType.ERROR){
            return new OperationResult(OperatorType.MOD, new Result(modType, (this.caster.getNumber(modType, left!.getResult()).getValue() % this.caster.getNumber(modType, right!.getResult()).getValue())));
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.IMPOSSIBLE_MOD,
            null, " % ", ""));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a MOD operation"));        
    }

    evaluatePowOperator(left:Expresion, right:Expresion):OperationResult{
        let powType:ContentType = types_POW[left!.getOperationResultType()][right!.getOperationResultType()];

        if(powType != ContentType.ERROR){
            return new OperationResult(OperatorType.POW, new Result(powType, (Math.pow(this.caster.getNumber(powType, left!.getResult()).getValue(), this.caster.getNumber(powType, right!.getResult()).getValue()))));
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.IMPOSSIBLE_POW,
            null, " ^ ", ""));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a POW operation"));        
    }

}