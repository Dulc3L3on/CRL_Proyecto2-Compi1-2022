import { TAS } from "../../EDDs/TablaSimbolos/TAS";
import { Expresion } from "../Function_Content/Content/Expresion";
import { Result } from "../Function_Content/Content/Result";
import { GlobalContainer } from "../GlobalContainer";
import { LocalContainer } from "../LocalContainer";
import { Variable } from "../Function_Content/Content/Variable";

export class Function extends LocalContainer{    
    type:ContentType;
    name:string;    
    hash:string
    parametros: Array<Variable>;    

    constructor(padre:GlobalContainer, type:number, functionName:string, parametros:Array<Variable>){
        super(/*padre*/);

        this.setFather(padre);
        this.type = type;
        this.name = functionName;        
        this.parametros = new Array<Variable>();//si no va a tener params, entonces se recbirá una lista vacía, no null xD

        this.hash = this.tool.generateFunctionHash(functionName, parametros);//no va a dar NullPonter, puesto que el super, se invocó previo a hacer esto, entonces NO PROBLEM! xD
    }

    loadArguments(theArguments:Array<Expresion>){
        this.TAS = new TAS();

        for(let index = 0; index < this.parametros.length; index++){//par así indicar tb si además de no corresponde el #, no corresp el tipo...            
            this.TAS.setVariable(new Variable(this.parametros[index].getName()
            ,this.parametros[index].getType(), theArguments[index].getValue()));
        }   
    }//no es nec hacer una verificación de correspondencia, puesto que si se halló la función, esto indica que 
    //el #params y tipos de la invocada estaban definidos en la función de algun GlobalContainer    
    //NO DEBE SOBREESCRIBIRSE!

    override exe(): Result {
        //pienso que de manera semejante a lo que se hizo en loop, aquí debería addse un try--cathc, en
        //Este caso se exe además de los errores en tiempo de exe, cuando el tipo de Result final que se 
        //Reciba no corresp al tipo...

        return this.exe_Function();
    }//NO DEBE SER sobreescrito por los hijos...

    //recuerda que en la invocación es donde se está haciendo la ini de la TAS...

    exe_Function():Result{
        this.TAS = new TAS();

        return this.readStack();
    }//Puesto que el readStack según lo que estaba pensando gracias a Dios xD
    //no tendría porque tener un mecanimso != según el tipo de localContainer,
    //Entonces SI DEBE sobreescribirse este xD

    getType():number{
        return this.type;
    }

    getName():string{
        return this.name;
    }

    getParametros(){
        return this.parametros;
    }

    getHash():string{
        return this.hash;
    }
}