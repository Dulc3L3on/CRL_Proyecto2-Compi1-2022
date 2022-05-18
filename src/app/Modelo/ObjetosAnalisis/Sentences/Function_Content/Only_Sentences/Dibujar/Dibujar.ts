import { ContentType } from "../../../Class_Content/ContentType";
import { Directive } from "../../../Directive";
import { Result } from "../../Content/Result";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { MessageHandler } from "src/app/Modelo/Handlers/MessageHandler";

export class Dibujar extends Directive{
    messageHandler:MessageHandler;

    constructor(line:number, column:number){
        super(line, column);

        this.messageHandler = MessageHandler.getInstance();
    }

    override exe(): Result {
        let result:Result = this.draw();

        if(result.getType() == ContentType.NOTHING){//puedo poner el valor directo ya que será o error o esto, nada más xD
            this.messageHandler.addMessage("Graphic generate, and added successfully");
            return new Result(ContentType.NOTHING);
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.DRAW_INSTRUCTION_ERRATED,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
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