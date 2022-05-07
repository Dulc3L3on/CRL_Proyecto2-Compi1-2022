import { Container } from "../../Container";
import { Content } from "./Content";
import { Result } from "./Result";

export class Expresion{
    left:Expresion;
    content:Content;
    right:Expresion;
    
    constructor(left:Expresion, content:Content,right:Expresion){
        this.left = left;
        this.content = content;
        this.right = right;
    }//en el caso de las expresiones que corresp a valores netos, los hijos serán null...

    //El padre será útil para obtener el valor de una variable, en caso de que aparezca una en la expr...
    operate(father:Container){//debe ser container y no localContainer, puesto que podría estar en una clase o en un contendor local... aunque ahora que lo pienso, no me cuadra mucho el que tenga que tener como param al contenedor...

    }

    getValue():Result{
        return new Result();
    }

    
//una expresión va a tener contenido, o sea el nodo
//va a ser un objeto que tenga hijos, izq, der y centro
//qye van a ser tipo expresión
    //primitiva -> typo = tipo; contenido
    //var -> tipo = var; contenido = nombreVar
    //invoc -> "invocacion"; contenido = línea invocación
    
}//será utilizado para representar tanto ops arit como condis, como concat
//Es decir todas las formas posibles de contenido será rep aquí como un árbol...