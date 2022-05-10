import { Variable } from "../../Sentences/Function_Content/Content/Variable";

export class TAS{
    variables:Array<Variable>;

    constructor(){
        this.variables = new Array<Variable>();
    }
    
    setVariable(variable:Variable){
        this.variables.push(variable);
    }

    findVariable(name:string):number{
        for(let index = 0; index < this.variables.length; index++){
            if(this.variables[index].getName() == name){
                return index;
            }
        }
        return -1;
    }

    draw(){
        
    }

    getVariable(index:number):Variable{
        return this.variables[index];
    }

}

//será utilizada para almacenar las var del ámbito en cuestión [local o global]
//aquí se enviarán los datos de reseteo y seteo de valor, y de aquí se extraerán