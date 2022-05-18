import { TAS } from "../../EDDs/TablaSimbolos/TAS";
import { Expresion } from "../Function_Content/Content/Expresion";
import { Result } from "../Function_Content/Content/Result";
import { GlobalContainer } from "../GlobalContainer";
import { LocalContainer } from "../LocalContainer";
import { Variable } from "../Function_Content/Content/Variable";
import { ContentType } from "./ContentType";

export class Function extends LocalContainer{    
    type:ContentType;
    name:string;    
    hash:string
    parametros: Array<Variable>;    

    constructor(line:number, column:number, padre:GlobalContainer, type:number, functionName:string, parametros:Array<Variable>){
        super(line, column);

        this.setScope(0);//puesto que este valor es fijo
        this.setFather(padre);
        
        this.type = type;
        this.name = functionName;        
        this.parametros = parametros;//si no va a tener params, entonces se recbirá una lista vacía, no null xD

        this.hash = this.tool.generateFunctionHash(functionName, parametros);//no va a dar NullPonter, puesto que el super, se invocó previo a hacer esto, entonces NO PROBLEM! xD
    }

    loadArguments(theArguments:Array<Expresion>){
        //la iniTAS que se hace en el globalContainer es de la clase, no de la función, no encuentro el lugar donde hallas hecho la ini de la TAS de aquí, entonces lo haré justo acá, puesto que sería el lugar correcto, a menos que ya lo tuvieras bien ubicado xD
        this.TAS = new TAS();

        for(let index = 0; index < this.parametros.length; index++){//par así indicar tb si además de no corresponde el #, no corresp el tipo...            
            this.TAS.setVariable(new Variable(this.sourceLocation.getLine(), this.sourceLocation.getColumn(), this.parametros[index].getType(), 
            this.parametros[index].getName(), theArguments[index].getResult().getValue()));//aquí ya no es nec invocar el getValue de expre, puseto que se llamó al regenerar el Hash, por lo tanto, se puede invocar de una vez el result, y así ahorrar tiempo, recursos y trabajo xD
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