import { ContentType } from "../../Class_Content/ContentType";
import { Container } from "../../Container";
import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";

export class Loop extends LocalContainer{
    condition:Expresion;

    constructor(/*padre:LocalContainer,*/ condition:Expresion){
        super(/*padre*/);

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
            return new Result(ContentType.ERROR, "el msje del error xD");//ahora que lo pienso quizá este error deba setearse desde el método exeLoop, ya que al parecer no se pueden hacer throws, para que puedan ser manejados los errores en otros lados. Revisa más sobre el manejo de errores en Typscript xD
        }
        return result;
    }   
    
    exeLoop():Result{        
        return new Result();
    }//DEBE SER sobreescrito!

    evaluateCondition():Result{        
        if(this.condition.getValue().getType() == ContentType.BOOLEAN){
            return this.condition.getValue().getValue();//Esto se hará con la clase que s eencarga de castear, aunque quizá no porque nada más que un boolean, puede ser un boolean xD
        }

        //se add el error de tipo
        return new Result(ContentType.ERROR, "Was expected a boolean");
    }//si en dado caso el valor que devolviera la expresión no fuera de tipo de boolean
    //esto se llegará a conocer por el método getValue de Expr, puesto que este devuelve
    //un objeto Result que contiene el tipo de devolución que podrá y más que eso, debe
    //ser revisado para así devolver false y notificar acerca del error xD u obtener el 
    //valor devuelto, puseto que el tipo esperado es el correspondiente...
}