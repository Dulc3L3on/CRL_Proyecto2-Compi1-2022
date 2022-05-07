import { Expresion } from "../../Content/Expresion";
import { Dibujar } from "./Dibujar";

export class DibujarEXPR extends Dibujar{
    expr:Expresion;

    constructor(expr:Expresion){
        super();

        this.expr = expr;
    }
    
    override generateScript(): string {
        
        return "";
    }

    override generateGraphic(file: string): void {
        
        this.drawEXPR();

    }

    drawEXPR(){

    }
}

//tanto esta clase como la de DibujarAST, dibujan árboles, pensé en hacer que ambas
//heredaran de una sola clase, pero los tipos de áboles no son iguales, a menos que
//hiciera un árbol general que sea capaz de tener una forma "cualquiera" y de manera
//simple la forma básica de un árbol binario...
    //es decir podría hacer que heredaran si creara un árbol multiuso, es decir, que
    //pueda tener cualquier forma...