import { Container } from "../../../Container";
import { Directive } from "../../../Directive";
import { LocalContainer } from "../../../LocalContainer";

export class BreakPoint extends Directive{

    override setFather(father: Container): void {
        this.father = father as LocalContainer;//puesto que estos siempre estarán dentro de un ciclo
    }//Aunque pensándolo bien creo que no es nec, porque la cuestión es a la hora de recuperar el objeto no a la hora de setearlo xD

    //quizá más adelante vea alguna axn que pueda imple aquí xD
}