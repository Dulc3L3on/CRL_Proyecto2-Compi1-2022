import { Error } from "../Tool/Error/Error";

export class ErrorHandler{
    private static instance:ErrorHandler;
    private errorList:Array<string>;//Solo string, puesto que los mjes de consola así son, podrías addle otra cosa pero sería setear más info y pues ahorita lo que menos quieres es complicarte xD    

    private constructor(){  
        this.errorList = new Array<string>();//si da error por el hecho de usar inyección de dep, entonces lo ini en la decl y ya xD    
     }

    public static getInstance():ErrorHandler{
        if(ErrorHandler.instance == null){
            ErrorHandler.instance = new ErrorHandler();
        }

        return ErrorHandler.instance;
    }
    
    private initList(){
        let date:Date = new Date();

        this.errorList.push(">>>>>>>===================--<[[[ ERRORS ENCOUNTERED AT < "+date.toUTCString()+" > ]]]>--===============<<<<<<<<");
    }//Esto evitará que pueda estar vacía

    public addMessage(error:Error){
        if(this.errorList.length == 0){
            this.initList();
        }
        this.errorList.push("[error] " + error.toString());
    }

    public finalizeList(){
        let date:Date = new Date();

        this.errorList.push(">>>>>>>===================--[[[ ERRORS ENCOUNTERED UNTIL < "+date.toUTCString()+" > ]]]--===============<<<<<<<<");
    }

    public getError():string{
        if(this.errorList.length > 0){
            return this.errorList.shift()!;
        }

        return "";
    }   

    public clearList(){
        this.errorList = new Array<string>();
    }

    public getErrorList():Array<string>{
        return this.errorList;
    }

}