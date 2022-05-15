export class CRL_File{
    ID:number;
    name: string;
    content: string;

    constructor(ID:number, name: string, content: string){
        this.ID = ID;//Este atrib es seteado por el fileService al momento de add un archivo original xD
        this.name = name;
        this.content = content;
    }//no hago privados los atributos, puesto que estos se utilizan en la interfaz y creo que ahí req (o me conviene xD) que sean públicos xD

    resetName(newName:string){
        this.name = newName;
    }

    resetContent(newContent:string){
        this.content = newContent;
    }

    getID(){
        return this.ID;
    }

    getName():string{
        return this.name;
    }

    getContent():string{
        return this.content;
    }
}