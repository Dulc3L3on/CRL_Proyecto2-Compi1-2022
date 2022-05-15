import { ContentType } from "../../Class_Content/ContentType";
import { Container } from "../../Container";
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

        this.sentenceName = "MOSTRAR";
    }

    override setFather(father: Container): void {
        this.father = father;
        this.setArgumentFather();
    }//lo sobreescribo, porque ya sea que no pertenezca a una expre, sino que solo sea una invocación, debe setear el padre a la principal expr de sus argus, sino va a dar error

    private setArgumentFather():void{
        this.argumentos.forEach(argumento => {
            argumento.setFather(this.father);
        });
    }
    
    override exe(): Result{
        this.print();

        return new Result(ContentType.NOTHING);
    }

    print(){
        let resultante:string = this.stringBase;
        //se cuenta el número de {, para saber si el #argus corrsponde a lo que está en el string base...

        for(let index = 0; index < this.argumentos.length; index++){
            if(this.existRequest("{"+(index)+"}", this.stringBase)){//por el momento si requerirá que los valores estén pegaditos, a menos que haga un anaĺisis por separado
                resultante.replace("{"+(index)+"}", String (this.argumentos[index]));//por el momento se hace así, pero se deberá llamar a la clase que se encarga de los casteos, para así tener los valores según el enunciado lo requiere xD
            }else{
                //Se muestra el msje: Errores en la directiva MOSTRAR, imposible continuar
                break;//puesto que no hay razón para seguir...
            }
        }//si no hubieran argumentos no habría problema, ya que no se entraría al for y por lo tanto se imprimiría solo el string base xD

        //se imprime el resultante, a partir de la clase que modifica la consola... [o servicio, porque ahora que lo pienso si se puede :v xD]
        console.log(resultante);
    }

    existRequest(request:string, expect:string):boolean{
        if(expect.includes(request)){
            if(expect.includes(request, request.indexOf(request)+request.length)){
                //Se add el error por repetición de un índice de request
                return false;//pues con una repetición más basta para devolver error
            }else{                
                return true;
            }
        }

        //se add el error porque hay argumentos pero no request en el stringBase...
        return false;
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