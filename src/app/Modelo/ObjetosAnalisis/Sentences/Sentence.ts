import { ErrorHandler } from "../../Handlers/ErrorHandler";
import { SourceLocation } from "../../Tool/SourceLocation";
import { Tool } from "../../Tool/Tool";
import { Caster } from "./Function_Content/Content/Caster";
import { Result } from "./Function_Content/Content/Result";

export class Sentence{
    sentenceName:string;//este por la funcionalidad de dibujarAST, puesto que los nodos se deben representar con ago concreto xD
    scope:number;

    tool:Tool;
    caster:Caster;   
    errorHandler:ErrorHandler;

    sourceLocation:SourceLocation;

    constructor(line:number, column:number){
        this.tool = new Tool();
        this.caster = new Caster();
        this.errorHandler = ErrorHandler.getInstance();

        this.sourceLocation = new SourceLocation(line, column);
    }

    public setScope(scope:number){
        this.scope = scope;
    }

    exe():Result{
        return new Result();
    }//puesto que tanto los contenedores como las directivas req usarlo
     //a excep por el momento GlobalContainer xD

    public getScope():number{
        return this.scope;
    }

    public getSentenceName():string{
        return this.sentenceName;
    }

    public getSourceLocation(){
        return this.sourceLocation;
    }//Aunque en realidad no va a usar xD

}