import { Container } from "./Container";
import { Stack } from "../EDDs/Stack";
import { Sentence } from "./Sentence";
import { Result } from "./Function_Content/Content/Result";

export class LocalContainer extends Container{
    father:Container;//solo puede ser Clase en el caso de las funciones, yo me encargaré de verificar eso, entonces no problem xD    
    content:Stack<Sentence>;

    constructor(/*padre:Container*/){
        super();

        //this.father = padre;
        this.content = new Stack<Sentence>();
    }//a mi pensar, el padre no debería tener que estar en el cnstruct, puesto que la mejor parte en la que se puede setear al progenitor es cuando se están guardando las sentencias, dentro de su respectivo contenedor xD

    setFather(father:Container){//este existirá puesto que los contenedores como ciclos y control_sentence, se introducirá a su padre luego que sucedan ciertas situaciones y se cumpla con el criterio que el scope del hijo sea > en 1, de lo contrario existirá un error...
        this.father = father;
    }

    setContent(sentence:Sentence){
        this.content.insert(sentence);
    }    
    
    //necesario de sobreescribir
    readStack():Result{
        return new Result();
    }//Este método será implementado por cada uno de los hijos, en el caso que 
    //estos tengan un tipo asignado void en el caso de las funciones, o simplemente
    //no tengan una instrucción return, se devolverá NOTHING     

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