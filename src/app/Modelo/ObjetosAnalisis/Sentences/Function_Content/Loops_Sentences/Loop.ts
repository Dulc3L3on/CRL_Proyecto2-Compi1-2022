import { ContentType } from "../../Class_Content/ContentType";
import { Container } from "../../Container";
import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class Loop extends LocalContainer{
    condition:Expresion;

    constructor(line:number, column:number, condition:Expresion){
        super(line, column);

        this.condition = condition;
        //this.condition.setFather(padre);
    }

    override setFather(father: Container): void {
        this.father = father;        
        this.condition.setFather(this.father);
    }

    override exe(): Result {
        let result:Result;

        try {
            result = this.exeLoop();//el tipo de Result no se revisará aquí sino que será en el método exeFunction, puesto que ahí es donde es de interés esta revisión...
        } catch (error) {

            this.errorHandler.addMessage(new Error(ErrorType.RUNTIME_EXCEP, ErrorMessage.FATAL_ERROR,
                this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
            return new Result(ContentType.ERROR, error);//ahora que lo pienso quizá este error deba setearse desde el método exeLoop, ya que al parecer no se pueden hacer throws, para que puedan ser manejados los errores en otros lados. Revisa más sobre el manejo de errores en Typscript xD
        }
        return result;
    }   
    
    exeLoop():Result{        
        return new Result();
    }//DEBE SER sobreescrito!

    evaluateCondition():Result{        
        this.condition.getValue();
        console.log("evaluate condition");
        console.log(this.condition);

        if(this.condition.getResult().getType() == ContentType.BOOLEAN){
            console.log("condition evaluated at BOOLEAN");
            return this.condition.getResult();//puede usarse este de una vez, ya que el getValue() ya fue exe... xD
            //return this.condition.getValue().getValue();//Esto se hará con la clase que s eencarga de castear, aunque quizá no porque nada más que un boolean, puede ser un boolean xD
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.BOOLEAN_REQUIRED_LOOP,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new Result(ContentType.ERROR, "An Loop condition require be BOOLEAN");
    }//si en dado caso el valor que devolviera la expresión no fuera de tipo de boolean
    //esto se llegará a conocer por el método getValue de Expr, puesto que este devuelve
    //un objeto Result que contiene el tipo de devolución que podrá y más que eso, debe
    //ser revisado para así devolver false y notificar acerca del error xD u obtener el 
    //valor devuelto, puseto que el tipo esperado es el correspondiente...
}