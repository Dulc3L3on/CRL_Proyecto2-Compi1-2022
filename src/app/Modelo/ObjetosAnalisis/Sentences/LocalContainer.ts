import { Container } from "./Container";
import { Stack } from "../EDDs/Stack";
import { Sentence } from "./Sentence";
import { Result } from "./Function_Content/Content/Result";
import { ContentType } from "./Class_Content/ContentType";

export class LocalContainer extends Container{
    father:Container;//solo puede ser Clase en el caso de las funciones, yo me encargaré de verificar eso, entonces no problem xD    
    content:Stack<Sentence>;

    constructor(){
        super();

        this.content = new Stack<Sentence>();
    }//a mi pensar, el padre no debería tener que estar en el cnstruct, puesto que la mejor parte en la que se puede setear al progenitor es cuando se están guardando las sentencias, dentro de su respectivo contenedor xD

    setFather(father:Container){//este existirá puesto que los contenedores como ciclos y control_sentence, se introducirá a su padre luego que sucedan ciertas situaciones y se cumpla con el criterio que el scope del hijo sea > en 1, de lo contrario existirá un error...
        this.father = father;
    }

    setContent(sentence:Sentence){
        this.content.insert(sentence);
    }        
    
    readStack():Result{
        let temporalStack:Stack<Sentence> = new Stack<Sentence>();
        temporalStack.setAll(this.content.getReverse());        

        while(!temporalStack.isEmpty()){//no se devolverá indefinidos el pop, por haber sobrepasado el número de ele que contiene, gracias a este while que se encarga de llevar el control xD
            let result:Result = temporalStack.getElements().pop()!.exe();//en lugar de usar getElements y el índice podríamos y más se debería, para ahorrarse el hecho que el for, puesto que se tendría como condi mientrar el stack no esté vacío, pienso que se puede hacer, puesto que en primer lugar el stack que se está tomando aquí es temp y por lo tanto no se afectaría al original y porque ya no se req buscar a los elementos que ya fueron exe...

            if(result.getType() != ContentType.NOTHING ){
                return result;
            }//es decir un tipo I, D, S, B, C, o ERR xD
        }
        return new Result(ContentType.NOTHING);//puesto que no sucedió algo xD
    }//puesto que la axn a realizar por cada heredero no varía, este método NO DEBE SOBREESCRIBIRSE! xD

    getFather(){
        return this.father;        
    }

    getFunctionContent(){
        return this.content.getReverse();
    }//envío el contenido al revés, así podrá empezar a exe lo primero que cayó a la pila, que es justo lo que necesito xD
}

//HEREDEROS
//>Funcion
    //>complex_function
    //>void_function
    //>main_Funcion
//loop
///Control_Sentences

//es decir que este obj será el que corresp a la instancia del antiguo container...