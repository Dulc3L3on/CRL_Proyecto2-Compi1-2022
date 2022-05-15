import { TAS } from "src/app/Modelo/ObjetosAnalisis/EDDs/TablaSimbolos/TAS";
import { ContentType } from "../../../Class_Content/ContentType";
import { Result } from "../../Content/Result";
import { Dibujar } from "./Dibujar";

export class DibujarTS extends Dibujar{

    constructor(){
        super();

        this.sentenceName = "DIBUJAR_TS";
    }

    override generateScript(): string {
        //no sé si en este caso es nec generar un string, pero por si acaso sí
        //Esto será un método de la TAS, al igual que en el caso de las fun
        //y las expr, quienes no devolverán nada mas que el string y ahora que
        //lo pienso tb, msjes de error cuando estos sea de tipo runtime o algo
        //por el estilo xD
        let TAS:TAS = this.father.getTAS();
        let script = TAS.generateScript();

        return "";
    }

    override generateGraphic(file: string): Result{
        //Se invoca al meodo [drawFUN] que tiene el código para generar el .jpg o de una vez
        //el .pdf a partir del string recibido dependiendo del resultado que devuelva
        //se enviará msje SUCCESS or FAIL

        if(this.drawTAS()){
            return new Result(ContentType.NOTHING);
        }

        return new Result(ContentType.ERROR, "Encountered errors at tried draw the AST");
    }

    drawTAS():boolean{
        //ahora que lo pienso, como todas se van a exe con graphviz, entonces esto será un
        //método genérico, puesto que lo único que cb es la entrada y como esta es de tipo
        //String, entonces pues con que tenga un param de este tipo basta xD

        return true;
    }
}