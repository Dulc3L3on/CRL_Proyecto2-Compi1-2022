import { LocalContainer } from "./LocalContainer";
import { Sentence } from "./Sentence";

export class Directive extends Sentence{
    father:LocalContainer;//esto es solo para que esté informada la directiva, porque en realidad no es necesario que la posea, a menos que req buscar en la TAS para obtener algún dato...

    setFather(father:LocalContainer){
        this.father = father;
    }

    getFather():LocalContainer{
        return this.father;
    }
}

//HEREDEROS
//>dibujar
    //>AST
    //>TS
    //>EXPR
//>mostrar

//en todo caso para estos últimos, la clase que debería heredar sería la de breakpoint...
//>continue?
//break?
//return?, este último quizá no, puesto que puede o no tener valor, a menos que fueran 2 clases distintas, aunque no le veo mucho sentido a eso...