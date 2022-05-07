import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";

export class Control_sentence extends LocalContainer{
    condition:Expresion;

    constructor(padre:LocalContainer, condition?:Expresion){//el ?, es debido al else... no habrá problemas con el if, puesto que al llegar a esa línea, siempre se va a establecer como argu un objeto expre...
        super(padre);

        if(condition != null){
            this.condition = condition;
        }        
    }

    override exe(): Result {
        let result:Result;

        try {
            result = this.exe_ControlSentence();
            //el tipo de Result no se revisará aquí sino que será en el método exeFunction, puesto que ahí es donde es de interés esta revisión...
        } catch (error) {
            return new Result(ContentType.ERROR, "el msje del error xD");//ahora que lo pienso quizá este error deba setearse desde el método exeLoop, ya que al parecer no se pueden hacer throws, para que puedan ser manejados los errores en otros lados. Revisa más sobre el manejo de errores en Typscript xD
        }
        return result;
    }

    exe_ControlSentence():Result{
        return this.readStack();
        //return new Result();//Creo que en realidad se debería invocar al método readSatck, como axn predefinida
    }

    evaluateCondition():Result{        
        if(this.condition.getValue().getType() == ContentType.BOOLEAN){
            return this.condition.getValue().getResult();//Esto se hará con la clase que s eencarga de castear, aunque quizá no porque nada más que un boolean, puede ser un boolean xD
        }
        //se add el error, porque el R// de la expr no fue booleano...
        return new Result(ContentType.ERROR, "Was expected a boolean");
    }

}