import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { ContentType } from "../../Class_Content/ContentType";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Variable } from "../Content/Variable";
import { Loop } from "./Loop";

export class For extends Loop{
    variable:Variable;
    incremento:number;

    constructor(variable:Variable, condition:Expresion, incremento:number){//el incre rec 1 o -1 dep de si fue ++ o --
        super(/*padre, */condition);

        this.variable = variable;//esta variable tendrá seteado todo de manera correcta, por lo cual no habrá que estar haciendo revisiones de tipos, ni de correspondencia, pues todo está bien xD
        this.incremento = incremento;
        
        this.sentenceName = "PARA";
    }//creo que solo para el caso en que el for sea hijo directo de la f/mét, el padre podrá ser setado en el cnstrc,de lo contrario no... sino implicaría hacer muchísimas búsquedas, por lo tanto, se procederá a crear el método para setearlo

    override exeLoop(): Result{       
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
            this.initTAS();
            let result:Result;

            for(this.variable.getContent().getValue() as number;//Decl
                (this.evaluateCondition().getValue() as boolean);//Condi
                 this.variable.getContent().setValue(this.variable.getContent().getValue() + this.incremento)){//incre
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

    initTAS(){
        this.TAS = new TAS();

        this.TAS.setVariable(this.variable);//en este caso no será nec usar el setValue, puesto que ya lo tendrá correctamente addo
    }

    //iba a colocar la prod de variable para este for, pero en todo caso lo que tendría que hacer es crear una RP dedidaca a ella, puesto que solo puede recibir INTEGERS...
    //hace falta crear la var y addla a la TAS, puesto que pues es una var... xD
}