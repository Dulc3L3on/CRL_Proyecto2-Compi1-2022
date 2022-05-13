import { ContentType } from "../../../Class_Content/ContentType";
import { Directive } from "../../../Directive";
import { Result } from "../../Content/Result";

export class Dibujar extends Directive{

    override exe(): Result {
        let result:Result = this.draw();

        if(result.getType() == ContentType.NOTHING){//puedo poner el valor directo ya que será o error o esto, nada más xD
            return new Result(ContentType.NOTHING);
        }

        return new Result(ContentType.ERROR, "Draw Function with errors, cannot execute corectly");
    }//NO DEBE sobreescribirse

    draw():Result{
        return this.generateGraphic(this.generateScript());
    }//NO DEBE sobreescribirse    

    generateGraphic(file:string):Result{
        //Se exe el comando para ini la graficación
        //es decir que recibirá el archivo corresp para ini la graf como corresp...

        return new Result();
    }//DISPONIBLE para la sobreescripción

    generateScript():string{

        return "";
    }//DISPONIBLE para la sobreescripción
}