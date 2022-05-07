export class Result{
    type:ContentType;
    result:any;

    constructor(type?:ContentType, result?:any){
        this.type = (type == null)?ContentType.VOID:type;
        this.result = (result == null)?"":result;
    }//luego cuando se obtenga la info, se hará el casteo a partir del valor que esté contenido en type...
    //Este mencionado casteo, se hará en 

    getType():ContentType{
        return this.type;
    }

    getResult():any{
        return this.result;
    }

    /*getResult():Result{
        return this;
    }*///esto para así obtener el valo y el tipo de una vez xD. sino funciona lo harás por parts xD

}
//pensé en cb el valor por defecto a err, pero mejor no, porque en caso de ser así, debería devolver el msje, y haciéndolo así por defecto, no podría xD
//este obj acaso reemplazará a content...?