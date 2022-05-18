import { Entity } from "./Entity";

export class SourceLocation{
    private line:number;
    private column:number;    

    constructor(line:number, column:number){
        this.line = line;
        this.column = column;        
    }

    public getLine():number{
        return this.line;
    }

    public getColumn():number{
        return this.column;
    }
}