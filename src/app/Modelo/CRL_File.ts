export class CRL_File{
    name: string;
    content: string;

    constructor(name: string, content: string){
        this.name = name;
        this.content = content;
    }//no hago privados los atributos, puesto que estos se utilizan en la interfaz y creo que ahí req (o me conviene xD) que sean públicos xD

    getName():string{
        return this.name;
    }

    getContent():string{
        return this.content;
    }
}