import { Entity } from "../Entity";
import { SourceLocation } from "../SourceLocation";
import { ErrorMessage } from "./ErrorMessage";
import { ErrorType } from "./ErrorType";

export class Error{
    private errorType:ErrorType;
    private message:ErrorMessage;
    private sourceLocation:SourceLocation|null;
    private entity:Entity;

    constructor(errorType:ErrorType, message:ErrorMessage, sourceLocation:SourceLocation|null,
        errateEntity:string, fahter:string|null){
        this.errorType = errorType;
        this.message = message;
        this.sourceLocation = sourceLocation;

        this.entity = new Entity(errateEntity, fahter);
    }

    public getErrorType():ErrorType{
        return this.errorType;
    }

    public getMessage():ErrorMessage{
        return this.message;
    }

    public getLine():number{
        if(this.sourceLocation != null){
            return this.sourceLocation.getLine();    
        }
        return 0;
    }

    public getColumn():number{
        if(this.sourceLocation != null){
            return this.sourceLocation.getColumn();
        }
        return 0;
    }

    public getErrateEntity():string{
        return this.entity.getName();
    }

    public getEntityFather(){
        return this.entity.getFather();
    }

    public toString(){
        return "{ type: " + this.errorType + ", line: "+ this.getLine() + ", column: " + this.getColumn()
        + ", message: " + this.message + ", entity: " + this.getErrateEntity() + ", father: "+ this.getEntityFather()+ " }";
    }

}