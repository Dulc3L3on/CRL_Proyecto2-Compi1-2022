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
    isOnlyInvocated:boolean;//este atributo lo coloco por le hecho que una inovcación en la mayoría de los casos está dentro de una exp y ahí si o sí debe devolver lo que el mét/fun le dio a este obj al exe la funcSolicitada, a difernecia de cuando es solo una invoc, puesto que no está dentro de un return ni nada que deba recibir su valor, sino que está "al aire", por lo tanto no debe decirle a la pila que pare, porque el valor que retornó es irrelevante xD, al menos en ese caso xD

    constructor(functionName:string, argumentos:Array<Expresion>, isOnlyInvocated:boolean){//este último parám es para saber si cuando tenga que devolver el resultado de una fun != void, tendrá que devolver ese result o un nothing, esto por la fun readStack(), puesto que esta cuando recibe un Result != NOTHING, deja de leer y hace el respectivo return xD
        super();

        this.functioName = functionName;
        this.argumentos = argumentos;
        this.isOnlyInvocated = isOnlyInvocated;

        this.sentenceName = "INVOCACION";
    }//en caso no envíen argumentos se recibirá una lista vacía no un null!

    override setFather(father: Container): void {
        this.father = father;
        this.setArgumentFather();
    }//lo sobreescribo, porque ya sea que no pertenezca a una expre, sino que solo sea una invocación, debe setear el padre a la principal expr de sus argus, sino va a dar error

    private setArgumentFather():void{
        this.argumentos.forEach(argumento => {
            argumento.setFather(this.father);
        });
    }

    override exe():Result{
        return this.exe_Invocation(this.getInitGlobalContainer(this.father));
    }

    private exe_Invocation(globalContainer:GlobalContainer):Result{
        let invocatedFunction:Function|null = globalContainer.getInvocatedFunction(
            this.tool.regenerateFunctionHash(this.functioName, this.argumentos));//Debe usarse el HASH!!
        
        if(invocatedFunction != null){
            invocatedFunction.loadArguments(this.argumentos);
            let result:Result = invocatedFunction.exe();

            if(this.isOnlyInvocated && (result.getType()!= ContentType.ERROR && result.getType()!= ContentType.NOTHING)){//El nothing solo lo coloqué para que no estén creando otro obj xD
                return new Result(ContentType.NOTHING);
            }//puesto que en ese caso no es de interés lo que se haya devueto, a menos que sea un error xD

            return result;
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