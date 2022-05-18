import { MessageHandler } from "src/app/Modelo/Handlers/MessageHandler";
import { ContentType } from "../../Class_Content/ContentType";
import { Container } from "../../Container";
import { Directive } from "../../Directive";
import { Expresion } from "../Content/Expresion";
import { Result } from "../Content/Result";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";

export class Mostrar extends Directive{
    stringBase:string;
    argumentos:Array<Expresion>;    
    errorPresent:boolean;

    private messageHandler:MessageHandler;

    constructor(line:number, column:number, stringBase:string, argumentos:Array<Expresion>){
        super(line, column);

        this.stringBase = stringBase;        
        this.argumentos = argumentos;//de no haber asignado una lista el usuario, aquí se obtendrá una lista vacía, mas no null, entonces NO PROBLEM! xD

        this.sentenceName = "MOSTRAR";    
        this.messageHandler = MessageHandler.getInstance();
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

        if(this.errorPresent){            
            this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.SHOW_DIRECTIVE_WITH_ERRORS,
                this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
            console.log("Errors on Mostrar directive, impossible execute correctly");
            return new Result(ContentType.ERROR, "Errors on Mostrar directive, impossible execute correctly");
        }

        return new Result(ContentType.NOTHING);
    }

    print(){
        this.errorPresent = false;
        console.log("print (MOSTRAR)");
        let resultante:string = this.stringBase;
        //se cuenta el número de {, para saber si el #argus corrsponde a lo que está en el string base...

        for(let index = 0; index < this.argumentos.length; index++){
            if(this.existRequest("{"+(index)+"}", this.stringBase)){//por el momento si requerirá que los valores estén pegaditos, a menos que haga un anaĺisis por separado                
                console.log("expresion");
                console.log(this.argumentos[index]);
                console.log("resultante: ");               
                let value:string =  this.caster.getOnlyString(this.argumentos[index].getValue());//(this.caster.getOnlyString(this.argumentos[index].getValue())
                resultante = resultante.replace("{"+(index)+"}", value);//por el momento se hace así, pero se deberá llamar a la clase que se encarga de los casteos, para así tener los valores según el enunciado lo requiere xD                
            }else{
                break;//puesto que no hay razón para seguir... no hago return porque no habría nada de malo y esa es la costume, retornar los msjes en los momentos en los que no existió error alguno
            }
        }//si no hubieran argumentos no habría problema, ya que no se entraría al for y por lo tanto se imprimiría solo el string base xD
        
        this.messageHandler.addMessage(resultante);
        console.log(resultante);
    }

    private existRequest(request:string, expect:string):boolean{
        if(expect.includes(request)){
            console.log("request" + request);
            console.log("indice posterior " + expect.indexOf(request)+request.length);
            if(expect.includes(request, expect.indexOf(request)+request.length)){

                this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.MORE_SAME_REQUEST,
                    this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
                console.log("request is present more than is required");
                this.errorPresent = true;
                return false;//pues con una repetición más basta para devolver error
            }else{                
                console.log("request is present");
                return true;
            }
        }

        this.errorPresent = true;
        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.UNMATCH_WITH_REQUEST_PARAM,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        console.log("the number of arguments missmatch with request");
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