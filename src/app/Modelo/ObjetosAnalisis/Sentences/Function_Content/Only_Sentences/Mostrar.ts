import { resourceUsage } from "process";
import { Directive } from "../../Directive";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";

export class Mostrar extends Directive{
    stringBase:string;
    argumentos:Array<Expresion>;

    constructor(stringBase:string, argumentos:Array<Expresion>){
        super();

        this.stringBase = stringBase;        
        this.argumentos = argumentos;//de no haber asignado una lista el usuario, aquí se obtendrá una lista vacía, mas no null, entonces NO PROBLEM! xD
    }
    
    override exe(): Result{
        this.print();

        return new Result(ContentType.NOTHING);
    }

    print(){
        let resultante:string = this.stringBase;

        for(let index = 0; index < this.argumentos.length; index++){
            resultante.replace("{"+index+"}", String (this.argumentos[index]));//por el momento se hace así, pero se deberá llamar a la clase que se encarga de los casteos, para así tener los valores según el enunciado lo requiere xD
        }

        //se invoca al SERVICIO que se encarga de modificar el contenido de la consola...
        console.log(resultante);
    }

     //NOTA: hay que devolver error, cuando el número de argus no sea igual [ya sea < o >] al # de request en el baseString...
         //por lo tanto, quizá debería recibir en el cnstrct el # de request
         //o tener un método para contar las {}, puesto que esas se utilizan para hacer funcionar esto
         //quizá ahora que lo pienso, debería tener una RP para analizar el stirng base, y así, pueda
         //obtener el total de request, asegurarme que dentro de ellas exista un #
             //la cuestión es que esto está dentro de una cadena... entonces quizá debería hacer una excepción
             //para este tipo de datos, o crear una ER para esto y así no tener que add una RP, para analizarlo
             //o en caso sea nec, entonces no tener errores a la hora de analizar esa RP...
}