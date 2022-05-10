import { CONTEXT_NAME } from "@angular/compiler/src/render3/view/util";
import { Container } from "./Sentences/Container";
import { Directive } from "./Sentences/Directive";
import { Expresion } from "./Sentences/Function_Content/Content/Expresion";
import { Result } from "./Sentences/Function_Content/Content/Result";
import { Variable } from "./Sentences/Function_Content/Content/Variable";

export class Incertitude extends Directive{
    expr:Expresion;

    constructor(expr:Expresion){
        super();

        this.expr = expr;
    }

    override setFather(father: Container): void {
        this.father = father;
        this.expr.setFather(father);
    }

    override exe(): Result {
        let result:Result = this.expr.getValue();

        if(result.getType() == ContentType.ERROR || 
          (result.getType() != ContentType.INTEGER && result.getType() != ContentType.DOUBLE)){
                this.father.TAS.setVariable(new Variable("INCERTITUDE", ContentType.DOUBLE, 0.5));
                
                return new Result(ContentType.ERROR, "The asignated expression is invalid")
        }//si existe un error, no estará en la TAS, y al igual que cuando no colocan esta directiva, se enviará a donde se requiera los 0.5 por defecto...
        
        this.father.TAS.setVariable(new Variable("INCERTITUDE", result.getType(), result.getValue()));
        return new Result(ContentType.NOTHING);        
    }

}

//es un error que pongan +1 vez la directiva incertidumbre?
//lo que yo pensaría hacer para ahorrarme esa revisada es simplemente add las directivas y exe cuando se topara con una el stack...
//eso si, no debería dejar de revisar que aparezca solo en el área de encabezado...