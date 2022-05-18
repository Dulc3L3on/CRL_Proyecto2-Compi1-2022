import { ContentType } from "../../Class_Content/ContentType";
import { OperationResult } from "./OperationResult";
import { Result } from "./Result";

export class AddResult extends OperationResult{   

    override getCompleteResult(): Result {
        return new Result(this.content.getType(), this.getValue());//puesto que el atributo de content ya tendrá el tipo adecuado
    }

    override getValue():any{
        if(this.content.getType() == ContentType.STRING){            
            return this.content.getValue();//puesto que aquí se habrá enviado un string con todos los elementos que recibió de parte de los hijos a manera de string... en la forma de netero, porque ya sea una suma o una concatenación estos [o al menos pienso que tb aplicará al char], deben mostrarse en su forma numérica
        }else{//Es decir un tipo numérico o cualquiera de los demás != string que no será error, puesto que de serlo no se setearían los valores y por tanto no se crearía un obj de este tipo, o eso recuerdo xD
            let elements:string[] = (this.content.getValue() as string).split(" ");
            let sumaResult:number = 0;

            elements.forEach(element => {
                sumaResult += Number(element);            
            });

            return sumaResult;
        }    
    }//Parece como si fuera redundante por el hecho de tener sobreescrito tb el método de getCOmpleteResult, pero NO LOS BORRES, porque si en dado caso pideran el value directamente, del operationResult, y no estuviera esta sobreescripción pienso que habría error al requerir la suma, porque el vlor original que poseería sería la concat hecha...
    
    //esta es la sobreescripción realizada para cuando se le solicite el valor, desde un operador que es != ADD
    //no hay problema con devolver any, puesto que se hace una conversión al tipo dep del contentType del Result... además en la forma anterior [antes de incluir a este objeto] se trabajaba con any puesto que este tipo es el que retorna el result, al solicitársele su contenido...

    getConcatenatedExpression():string{
        return this.content.getValue();
    }//Este será empleado por el método para el operador ADD
    
    //esto será lo que se envíe cuando el valor se requiera para formar el result de otra suma...
    //de tal manera que solo se haga la conversión final cuando se solicite otro resultado desde cualquier otra operación
    //-, *, /, %, y las opRel...
}