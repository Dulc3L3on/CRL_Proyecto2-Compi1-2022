import { TAS } from "../../../EDDs/TablaSimbolos/TAS";
import { ContentType } from "../../Class_Content/ContentType";
import { Container } from "../../Container";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Variable } from "../Content/Variable";
import { Loop } from "./Loop";

export class For extends Loop{
    variable:Variable;
    incremento:number;

    constructor(line:number, column:number, variable:Variable, condition:Expresion, incremento:number){//el incre rec 1 o -1 dep de si fue ++ o --
        super(line, column, condition);

        this.variable = variable;//esta variable tendrá seteado todo de manera correcta, por lo cual no habrá que estar haciendo revisiones de tipos, ni de correspondencia, pues todo está bien xD
        this.incremento = incremento;
        
        this.sentenceName = "PARA";
    }//creo que solo para el caso en que el for sea hijo directo de la f/mét, el padre podrá ser setado en el cnstrc,de lo contrario no... sino implicaría hacer muchísimas búsquedas, por lo tanto, se procederá a crear el método para setearlo

    override setFather(father: Container): void {
        this.father = father;
        this.condition.setFather(this);
        //para la condición del for, el padre de esta condición debe ser él mismo,
        //puesto que dentro de ella puede estar [y es lo que se acostumbra a hacer]
        //la variable del for, por lo cual si el padre de igualara al padre del for
        //nunca hallaría la variable y con ello provocaría un error... [y eso ya lo comporbé xD]
        //Solo para el caso de la expre del for, debe ser así, puesto que esa condición
        //eqq a como si fuera un if dentro de un ciclo, que no tiene nada más como cabecera que la decl de su var... o algo así xD
        //la otra vez tenía una buena eqq de las partes del for xD
    }

    override exeLoop(): Result{       
        console.log("exeLoop [FOR]");        

       this.initTAS();//puesto que en la condición por lo regular aparecerá la var declarada
        if(this.evaluateCondition().getType() == ContentType.BOOLEAN){
 //          this.initTAS();
            let result:Result;

            //en el caso de los loop [específicamente el FOR, por el hecho de tener 3 secciones que se debe revisar], a diferencia de los control_sentence, no se puede factorizar el método que obtiene el valor, puesto que en cada paso, el valor de una variable, puede cb, entonces no se puede tomar todo en un mismo momento, porque puede que en el otro instante no valga lo mismo
            for(this.variable.getContent().getValue() as number;//Decl
                (this.evaluateCondition().getValue() as boolean);//Condi
                 this.variable.getContent().setValue(+(+(this.caster.getInteger(this.variable.getContent()).getValue() as number) + this.incremento)as number)){//incre, lo podemos hacer así directamente, puesto que la Var, ya fue add a la TAS, por lo tanto lo que se cb aquí tb se cb allá xD
                 console.log("variable for: " + this.variable.getContent().getValue());
                 console.log(this.variable.getContent());
                 console.log("[FOR] cicle initialized");
                 result = this.readStack();
                
                 if(result.getType() == ContentType.BREAK){
                    break;
                 }else if(result.getType() == ContentType.CONTINUE){
                    continue;
                 }else if(result.getType() != ContentType.NOTHING){
                    return result;
                 }//es decir ERR, B, C, S, I, D y RET xD
                 console.log("[FOR] cicle terminated");//no se mostrará si se exe cualquiera de las 3 condi de arribita xD
            }
        }else{
            //no se add msje puesto que ya se hizo en evaluateCondition, aquí se crea el result, porque no se obtuvo el result generado por dicho método xD
            console.log("[FOR] boolean expected");
            return new Result(ContentType.ERROR);
        }
        return new Result(ContentType.NOTHING);//puesto que se llegó al final del for y ninguno de los ele de la pila devolvió un Result, con un tipo diferente...
    }//en este caso debería de colocar un throws por un loop infinito, pero esto en el padre... xD    

    initTAS(){
        this.TAS = new TAS();

        console.log("[FOR] init TAS");
        console.log(this.variable.getContent());
        this.TAS.setVariable(this.variable);//en este caso por el hecho que el valor que se le asigna es explícito y no una expre, 
        //no es nec invocar el método getValue() [cabe aclarar que si tuviera una expre, el padre de esta debería ser ahí si el padre del for
        //puesto que sería un error si incluyeran a la var que se está creando puesto que no ha sido ini...]
    }

    //iba a colocar la prod de variable para este for, pero en todo caso lo que tendría que hacer es crear una RP dedidaca a ella, puesto que solo puede recibir INTEGERS...
    //hace falta crear la var y addla a la TAS, puesto que pues es una var... xD
}