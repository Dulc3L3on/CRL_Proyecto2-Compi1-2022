import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { LocalContainer } from "../../LocalContainer";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Loop } from "./Loop";

export class For extends Loop{
    index:number;//puesot que el aux dijo que sería como en el doc y ahí solo hay un valor ent, entonces... xD
    incremento:number;

    constructor(/*padre:LocalContainer, */index:number, condition:Expresion, incremento:number){//el incre rec 1 o -1 dep de si fue ++ o --
        super(/*padre, */condition);

        this.index = index;
        this.incremento = incremento;
        
        this.sentenceName = "PARA";
    }//creo que solo para el caso en que el for sea hijo directo de la f/mét, el padre podrá ser setado en el cnstrc,de lo contrario no... sino implicaría hacer muchísimas búsquedas, por lo tanto, se procederá a crear el método para setearlo

    override exeLoop(): Result{       
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
            this.TAS = new TAS();
            let result:Result;

            for(this.index; (this.evaluateCondition().getValue() as boolean); this.index += this.incremento){
                 result = this.readStack();
                
                 if(result.getType() == ContentType.BREAK){
                    break;
                 }else if(result.getType() == ContentType.CONTINUE){
                    continue;
                 }

                 else if(result.getType() != ContentType.NOTHING){
                    return result;
                 }//es decir ERR, B, C, S, I, D y RET xD           
            }
        }else{
            return new Result(ContentType.ERROR);
        }
        return new Result(ContentType.NOTHING);//puesto que se llegó al final del for y ninguno de los ele de la pila devolvió un Result, con un tipo diferente...
    }//en este caso debería de colocar un throws por un loop infinito, pero esto en el padre... xD
    
}