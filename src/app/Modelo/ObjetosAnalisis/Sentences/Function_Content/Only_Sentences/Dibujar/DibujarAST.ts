import { Dibujar } from "./Dibujar";
import { Function } from "../../../Class_Content/Function";

export class DibujarAST extends Dibujar{     
    functionName:string;

    constructor(functionName:string){
        super();

        this.functionName = functionName;
    }

    //debería colocar aquí el método para buscar la función o debería ser algo más general ó en su defecto, estar en 
    //un método más general, tal como el que se encarga de leer la pila de axn por hacer...?

    override generateScript(): string {
        
        return "";
    }

    override generateGraphic(file: string): void {
        
        this.drawFUN();
        
    }
   
    drawFUN(){

    }

}