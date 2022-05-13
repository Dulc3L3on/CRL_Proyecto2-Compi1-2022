import { Tool } from "../../Tool/Tool";
import { Caster } from "./Function_Content/Content/Caster";
import { Result } from "./Function_Content/Content/Result";

export class Sentence{
    sentenceName:string;//este por la funcionalidad de dibujarAST, puesto que los nodos se deben representar con ago concreto xD
    scope:number;

    tool:Tool;
    caster:Caster;   

    constructor(){
        this.tool = new Tool();
        this.caster = new Caster();
    }

    setScope(scope:number){
        this.scope = scope;
    }

    exe():Result{
        return new Result();
    }//puesto que tanto los contenedores como las directivas req usarlo
     //a excep por el momento GlobalContainer xD

     getScope():number{
        return this.scope;
    }

}