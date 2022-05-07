import { Directive } from "../../../Directive";
import { Result } from "../../Content/Result";

export class Dibujar extends Directive{

    override exe(): Result {
        this.draw();

        return new Result(ContentType.NOTHING);
    }//NO DEBE sobreescribirse

    draw(){
        this.generateGraphic(this.generateScript());
    }//NO DEBE sobreescribirse

    generateScript():string{

        return "";
    }//DISPONIBLE para la sobreescripción

    generateGraphic(file:string){
        //Se exe el comando para ini la graficación
        //es decir que recibirá el archivo corresp para ini la graf como corresp...
    }//DISPONIBLE para la sobreescripción
}