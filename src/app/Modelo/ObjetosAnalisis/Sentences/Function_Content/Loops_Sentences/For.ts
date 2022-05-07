import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Loop } from "./Loop";

export class For extends Loop{
    index:number;//puesot que el aux dijo que sería como en el doc y ahí solo hay un valor ent, entonces... xD
    incremento:number;

    constructor(padre:LocalContainer, index:number, condition:Expresion, incremento:number){//el incre rec 1 o -1 dep de si fue ++ o --
        super(padre, condition);

        this.index = index;
        this.incremento = incremento;
    }

    override exeLoop(): Result{       
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
            let result:Result;

            for(this.index; (this.evaluateCondition().getResult() as boolean); this.index += this.incremento){
                 result = this.readStack();
                
                 if(result.getType() == ContentType.BREAK){
                    break;
                 }else if(result.getType() == ContentType.CONTINUE){
                    continue;
                 }else if(result.getType() == ContentType.RETURN){
                    return new Result(ContentType.RETURN, "");//puesto que este hace que se salga de una vez de este método, debo hacer que se emule eso en lo demás xD
                 }//Revisa si está bien esto... [más que todo lo del return, lo demás no provoca problemas xD]
                 //cuando digo revisar si está bien, lo digo en el sentido si no provoca conflictos al devolver esto al padre
                 //y que este último haga el retorno automático así como caundo CT != nothing xD

                 else if(result.getType() != ContentType.NOTHING){
                    return result;
                 }                 
            }
        }else{
            return new Result(ContentType.ERROR);
        }
        return new Result(ContentType.NOTHING);//puesto que se llegó al final del for y ninguno de los ele de la pila devolvió un Result, con un tipo diferente...
    }//en este caso debería de colocar un throws por un loop infinito, pero esto en el padre... xD
    
}