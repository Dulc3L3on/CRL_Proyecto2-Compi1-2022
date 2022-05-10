import { Caster, types_ADD, types_DIV, types_MOD, types_MULT, types_POW, types_RES } from "./Caster";
import { Expresion } from "./Expresion";
import { OperationResult } from "./OperationResult";
import { Result } from "./Result";

export class OperationHandler{
    caster:Caster;

    constructor(){
        this.caster = new Caster();
    }

    evaluateAddOperator(left:Expresion, right:Expresion):OperationResult{        
        let addType:ContentType = types_ADD[left!.getOperationResultType()][right!.getOperationResultType()];        

        if(addType != ContentType.ERROR){
            if(addType == ContentType.STRING){
                let izq:string = ((left!.getOperationType() == OperatorType.ADD)?left!.getResult().getValue():String(this.caster.getNumber(this.caster.getPreferibleNumberType(left!.getResult().getType()), left!.getResult()).getValue()));
                let der:string = ((right!.getOperationType() == OperatorType.ADD)?right!.getResult().getValue():String(this.caster.getNumber(this.caster.getPreferibleNumberType(right!.getResult().getType()), right!.getResult()).getValue()));

                let value:string = izq + der;                

                return new OperationResult(OperatorType.ADD, new Result(addType, value));
            }else{
                return new OperationResult(OperatorType.ADD, new Result(addType, (String(this.caster.getNumber(addType, left!.getResult()).getValue() + this.caster.getNumber(addType, right!.getResult()).getValue()))));
            }            
        }

        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a ADD operation"));        
    }

    evaluateMinusOperator(left:Expresion, right:Expresion):OperationResult{
        let restType:ContentType = types_RES[left!.getOperationResultType()][right!.getOperationResultType()];

        if(restType != ContentType.ERROR){
            return new OperationResult(OperatorType.MINUS, new Result(restType, (this.caster.getNumber(restType, left!.getResult()).getValue() - this.caster.getNumber(restType, right!.getResult()).getValue())));//hasta donde sé typscript no tiene restricc de valores a los que se les puede app los operadores relacionales...
        }
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a REST operation"));        
    }

    evaluateTimesOperator(left:Expresion, right:Expresion):OperationResult{
        let timesType:ContentType = types_MULT[left!.getOperationResultType()][right!.getOperationResultType()];        
                    
        if(timesType != ContentType.ERROR){
            return new OperationResult(OperatorType.TIMES, new Result(timesType, (this.caster.getNumber(timesType, left!.getResult()).getValue() * this.caster.getNumber(timesType, right!.getResult()).getValue())));
        }
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a TIMES operation"));        
    }

    evaluateDivOperator(left:Expresion, right:Expresion):OperationResult{
        let divType:ContentType = types_DIV[left!.getOperationResultType()][right!.getOperationResultType()];

        if(divType != ContentType.ERROR){
            return new OperationResult(OperatorType.DIV, new Result(divType, (this.caster.getNumber(divType, left!.getResult()).getValue() / this.caster.getNumber(divType, right!.getResult()).getValue())));//si da error en tiempo de exe, entonces susti esto por (a || b) && !(a && b)
        }
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a DIV operation"));        
    }

    evaluateModOperator(left:Expresion, right:Expresion):OperationResult{
        let modType:ContentType = types_MOD[left!.getOperationResultType()][right!.getOperationResultType()];

        if(modType != ContentType.ERROR){
            return new OperationResult(OperatorType.MOD, new Result(modType, (this.caster.getNumber(modType, left!.getResult()).getValue() % this.caster.getNumber(modType, right!.getResult()).getValue())));
        }
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a MOD operation"));        
    }

    evaluatePowOperator(left:Expresion, right:Expresion):OperationResult{
        let powType:ContentType = types_POW[left!.getOperationResultType()][right!.getOperationResultType()];

        if(powType != ContentType.ERROR){
            return new OperationResult(OperatorType.POW, new Result(powType, (Math.pow(this.caster.getNumber(powType, left!.getResult()).getValue(), this.caster.getNumber(powType, right!.getResult()).getValue()))));
        }
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Cannot use an "+left!.getOperationResultType()+" and "+right!.getOperationResultType()+" in a POW operation"));        
    }

}