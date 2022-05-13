import { ContentType } from "../../Class_Content/ContentType";
import { OperatorType } from "./OperatorType";
import { Result } from "./Result";

export class OperationResult{
    operation:OperatorType;
    content:Result;

    constructor(operation:OperatorType, content:Result){
        this.operation = operation;
        this.content = content;
    }

    getOperation():OperatorType{
        return this.operation;
    }

    getCompleteResult():Result{
        return this.content;
    }//Este va a ser utilizado cuando se termine de procesar todo el árbol y se llegue a la parte donde se invocó el operate, puesto que ahí se requiere el resultado final... [result]

    getType():ContentType{
        return this.content.getType();        
    }

    getValue():any{
        return this.content.getValue();
    }
}