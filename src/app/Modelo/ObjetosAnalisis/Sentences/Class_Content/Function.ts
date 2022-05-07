import { TAS } from "../../EDDs/TablaSimbolos/TAS";
import { Result } from "../Function_Content/Content/Result";
import { GlobalContainer } from "../GlobalContainer";
import { LocalContainer } from "../LocalContainer";
import { Variable } from "./Variable";

export class Function extends LocalContainer{    
    type:ContentType;
    name:string;    
    parametros: Array<Variable>;

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros?:Array<Variable>){
        super(padre);

        this.type = type;
        this.name = functionName;

        if(parametros == null){
            this.parametros = new Array<Variable>();
        }
    }

    getType():number{
        return this.type;
    }

    getName():string{
        return this.name;
    }

    getParametros(){
        return this.parametros;
    }

    override exe(): Result {
        //pienso que de manera semejante a lo que se hizo en loop, aquí debería addse un try--cathc, en
        //Este caso se exe además de los errores en tiempo de exe, cuando el tipo de Result final que se 
        //Reciba no corresp al tipo...

        return this.exeFunction();
    }//NO DEBE SER sobreescrito por los hijos...

    exeFunction():Result{
        this.TAS = new TAS();

        return this.readStack();
    }//Puesto que el readStack según lo que estaba pensando gracias a Dios xD
    //no tendría porque tener un mecanimso != según el tipo de localContainer,
    //Entonces SI DEBE sobreescribirse este xD
}