import { ContentType } from "../../Class_Content/ContentType";
import { Container } from "../../Container";
import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";

export class Control_sentence extends LocalContainer{
    condition:Expresion|null;

    constructor(/*padre:LocalContainer, */condition:Expresion|null){//el null, es debido al else... no habrá problemas con el if, puesto que al llegar a esa línea, siempre se va a establecer como argu un objeto expre...
        super(/*padre*/);
        
        this.condition = condition;//para el caso del IF, no hay problema puesto que siempre recibirá una condi, ya que eso lo colocaré en las axn de la gram, entonces NO PROBLEM! xD   
        //this.condition.setFather(padre);        
    }

    override setFather(father: Container): void {
        this.father = father;
        if(this.condition != null){
            this.condition.setFather(father);
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
        if(this.condition!.getValue().getType() == ContentType.BOOLEAN){
            return this.condition!.getValue().getValue();//Esto se hará con la clase que s eencarga de castear, aunque quizá no porque nada más que un boolean, puede ser un boolean xD
        }
        //se add el error, porque el R// de la expr no fue booleano...
        return new Result(ContentType.ERROR, "Was expected a boolean");
    }//no hay problema con asegurar que no será null, puesto que siempre que se invoque  este método será porque existe una condi xD

}