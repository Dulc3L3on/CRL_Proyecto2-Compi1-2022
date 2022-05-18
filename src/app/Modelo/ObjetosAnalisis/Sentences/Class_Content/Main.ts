import { newArray } from "@angular/compiler/src/util";
import { TAS } from "../../EDDs/TablaSimbolos/TAS";
import { Result } from "../Function_Content/Content/Result";
import { Variable } from "../Function_Content/Content/Variable";
import { GlobalContainer } from "../GlobalContainer";
import { ContentType } from "./ContentType";
import { Function } from "./Function";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class Main extends Function{

    constructor(line:number, column:number, padre:GlobalContainer){
        super(line, column, padre, ContentType.VOID, "Principal", new Array<Variable>());//envío una instancia vacía, puesto que quedamos que para cuando no hayana parámetros se enviará esto, con tal que no hayan problemas xD

        this.sentenceName = "[METHOD] VOID: Principal";
    }

    override exe_Function(): Result {
        console.log("exe_Function [MAIN]");

        (this.father as GlobalContainer).initMe(this.sourceLocation.getLine());//esto bien podría evitarse al usar el método getInvocatedFunction(), pero para variar un poco, y que esta clase tenga algo sobreescrito xD, lo haremos así xD
        this.TAS = new TAS();//debe hacerse ya que el método loadArguments no se invoca para esta función xD, lo cual se hubiera solucionado al invocar el getInvocatedFunction() xD
        console.log("main content: ");
        console.log(this.content.getElements());

        let result:Result = this.readStack();

        if(result.getType() == ContentType.NOTHING){//puesto que es una función VOID, de lo contrario si obtuviera un valor != ERR y VOID, estarían intentando que la función retorne un valor, lo cual es incorrecto xD            
            return new Result(ContentType.SUCCESS);
            
        }else if(result.getType() != ContentType.ERROR){
            this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.EXISTENT_UNNECESARY_RETURN_EXPR_MAIN,
                this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
            return new Result(ContentType.ERROR, "The main function cannot return any value because its VOID type");            
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.ABSENT_EXPR_RETURN_FUNCTION,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new Result(ContentType.ERROR, "Impossible to exec correctly because exist errors");
    }

}