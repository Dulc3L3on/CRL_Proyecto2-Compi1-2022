export class Graph{
    name:string;
    content:string;

    constructor(name:string, content:string){
        this.name = name;
        this.content = content;
    }

    getName(){
        return this.name;
    }

    getContent(){
        return this.content;
    }
}