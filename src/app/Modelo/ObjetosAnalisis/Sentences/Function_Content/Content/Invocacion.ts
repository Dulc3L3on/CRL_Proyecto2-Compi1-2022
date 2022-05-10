import { Container } from "../../Container";
import { GlobalContainer } from "../../GlobalContainer";
import { LocalContainer } from "../../LocalContainer";
import { Directive } from "../../Directive";
import { Expresion } from "./Expresion";
import { Result } from "./Result";
import { Function } from "../../Class_Content/Function";

export class Invocacion extends Directive{
    functioName:string;
    argumentos:Array<Expresion>;    

    constructor(functionName:string, argumentos:Array<Expresion>){
        super();

        this.functioName = functionName;
        this.argumentos = argumentos;
    }//en caso no envíen argumentos se recibirá una lista vacía no un null!

    override exe():Result{
        return this.exe_Invocation(this.getInitGlobalContainer(this.father));
    }

    private exe_Invocation(globalContainer:GlobalContainer):Result{
        let invocatedFunction:Function|null = globalContainer.getInvocatedFunction(globalContainer,
            this.tool.regenerateFunctionHash(this.functioName, this.argumentos));//Debe usarse el HASH!!
        
        if(invocatedFunction != null){
            invocatedFunction.loadArguments(this.argumentos)
            return invocatedFunction.exe();                        
        }

        return new Result(ContentType.ERROR, "There is not proper or imported"+
        " function called " + this.functioName +" that accept those arguments");
    }//ell tipo de devolución NO DEBE ni se puede xD, revisar en esta parte, debe ser hasta donde se obtenga el Result como tal...

    private getInitGlobalContainer(container:Container):GlobalContainer{
        if(!(container instanceof GlobalContainer)){//esto puede hacerese porque fijo fijo, habrá un global container englobando a todos los container locales xD
            return this.getInitGlobalContainer((container as LocalContainer).getFather());
        }

        return container as GlobalContainer;
    }
}//NOTA: a esta clase le setea el padre, el objeto Expresión, entonces no hay de que preocuparse aquí, pues eso se hace allá xD