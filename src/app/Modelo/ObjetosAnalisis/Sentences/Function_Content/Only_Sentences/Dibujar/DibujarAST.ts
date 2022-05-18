import { Dibujar } from "./Dibujar";
import { Result } from "../../Content/Result";
import { ContentType } from "../../../Class_Content/ContentType";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class DibujarAST extends Dibujar{     
    functionName:string;

    constructor(line:number, column:number, functionName:string){
        super(line, column);

        this.functionName = functionName;

        this.sentenceName = "DIBUJAR_AST";
    }

    //debería colocar aquí el método para buscar la función o debería ser algo más general ó en su defecto, estar en 
    //un método más general, tal como el que se encarga de leer la pila de axn por hacer...?

    override generateScript(): string {
        //se invoca el método par ahallar el listado de funciones con el mismo nombre
        //se exe un for para leer el listado y pedir que se genere el srchivo describiendo a sus hijos [simi al arbol de EXP]
            //se concatenan los resultados, a un mismo string [puesto que el graphviz puede tener un archivo para múltiples dibujos]
            //Se retorna el string        
        return "";
    }

    override generateGraphic(file: string):Result{  
        console.log("exe DRAW [AST]");

        //Se invoca al meodo [drawFUN] que tiene el código para generar el .jpg o de una vez
        //el .pdf a partir del string recibido dependiendo del resultado que devuelva
        //se enviará msje SUCCESS or FAIL

        if(this.drawFUN()){
            return new Result(ContentType.NOTHING);
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.DRAW_SCRIPT_FAILED_AST,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new Result(ContentType.ERROR, "Encountered errors at tried draw the AST");
    }
   
    drawFUN():boolean{//suponiendo que el script tuviera errores, este sería el que nos informaría aceraca de ello
        return true;
    }

}