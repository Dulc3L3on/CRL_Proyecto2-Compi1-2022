import { Function } from "../ObjetosAnalisis/Sentences/Class_Content/Function";
import { Stack } from "../ObjetosAnalisis/EDDs/Stack";
import { Directive } from "../ObjetosAnalisis/Sentences/Directive";
import { LocalContainer } from "../ObjetosAnalisis/Sentences/LocalContainer";

export class HierarchyStack{
    private stack:Stack<LocalContainer>;//pueso que solo se pueden insertar o funciones o estructuras [loop, control_sentence]

    //para la declaración de variables globales se llamará directamente al reduceStack

    addFunction(fun:Function){
        this.reduceStack();        
        this.stack.insert(fun);        
    }
    //NOTA: recuerda que la función antes de ser add a la pila, ya ha sido add al contenido de la clase,
    //vi que no provocaba errores y como convenía lo dejé xD

    reduceStack(){//no hay nec de retornar algo puesto que la función al ser creada, es añadida de una vvez al contenido global, y no decir con la decl de var global xD
        if(!this.stack.isEmpty()){
            while(!this.stack.isEmpty()){
                let actualContainer = this.stack.getElement();//al llegar al último elemento, simplemente lo sacaría de la pila, lo cual es correctísimo xD

                if(this.stack.size() >= 1){
                    actualContainer!.setFather(this.stack.previewElement()!);//se setea el padre
                    this.stack.previewElement()!.setContent(actualContainer!);
                }
            }
        }        
    }//no habrá posibilidad de errores aquí puesto que la pila estará en un estado con el que basta con que haga las acoplaciones de manera directa sin hacer revisiones [esto por el método de addLocal y directive + el reduceUntil xD]        

    addLocalDirective(directive:Directive){//puesto que las globales solo provocan el reduce
        if(!this.stack.isEmpty()){//este if evita que una directiva esté como primer elemento de la pila
            if(this.stack.previewElement()!.getScope() < (directive.getScope()-1)){//caso 2
                //se add msje de error, porque el elemento nuevo está desfasado [específicamente, tiene tabs de más]
            }else{
                let father:LocalContainer = this.reduceUntil(directive.getScope());
                
                father.setContent(directive);
                this.stack.insert(father);//puesto que la pila ya lo había sacado por completo de ella, aunque en realidad debería seguir ahí xD                
            }
        }else{
            //Se add error, porque si se leyó una directiva, quiere decir que una función
            //debería aparecer en la pila, la cual se asegura que aparezca de primero puesto
            //por el if que revisa si la pila está vacía xD
        }        
    }//casos totales, cuando pila no está vacía: 3 [1. caso perfecto [lastElement == scope-1], 2. elemento a insertar está desfasado, 2. el elemento a insertar pertenece a una estructura más arriba en la jerarquía] y por las revisiones que se hacen aquí, al buscar a su padre, éste siempre será hallado

    addLocalContainer(localContainer:LocalContainer){
        if(!this.stack.isEmpty()){//este if evita que una directiva esté como primer elemento de la pila
            if(this.stack.previewElement()!.getScope() < (localContainer.getScope()-1)){//caso 2
                //se add msje de error, porque el elemento nuevo está desfasado [específicamente, tiene tabs de más]
            }else{
                let father:LocalContainer = this.reduceUntil(localContainer.getScope());                
                
                this.stack.insert(father);//se inserta de una vez, puesto que como el elemento nuevo es un localContainer, lo único que se quería con la reducción era dejar el paso libre para que el nuevo pudiera ser insertado justo después de su padre, ya que los demás ya no pueden recibir contenido en forma alguna
                this.stack.insert(localContainer);
            }
        }else{
            //Se add error, porque un localContainer solo debería existir dentro de una función
            //y en este caso no hay una en la pila
        }        
    }//hacer esto evita que se tengan una sección de localContainer, si se diera el caso, con el mismo scope, lo cual ayuda a que el método de reducirStack sea más pequeño y menos complejo, puesto que puede lo único que tendrá que hacer son las acoplaciones y de manera directa...

    private reduceUntil(scope:number):LocalContainer{
        let actualContainer:LocalContainer;

        while(!this.stack.isEmpty()){//puedo poner así la condición, porque fijo va a entrar al if que devuelve el localContainer hallado
            let actualContainer = this.stack.getElement();

            if(actualContainer!.getScope() == (scope -1)){//se asegura que será != null, puesto que el for avanza según el tamaño del scope según vaya variando
                return actualContainer!;
            }else if(this.stack.size() >= 1){//puesto que quiere decir que al menos tendrá el elemento que se req para hacer el acoplamiento final
                actualContainer!.setFather(this.stack.previewElement()!);//se setea el padre
                this.stack.previewElement()!.setContent(actualContainer!);
            }
        }

        return actualContainer!;
    }//Este será empleado para setear las directivas, si encuentra un error
    //seguirá buscando en la pila hasta que se vacíe o se encuentre el LC que
    //contenga un scope == (directiva.scope() -1)

    //al igual que en el reduceStack, al devolver el elemento este ya habrá sido
    //sacado de la pila, por lo tnato se tendrá que volver a incorporar a ella
    //ya que el objetivo de esta función no es vaciar la pila, sino acoplar los
    //elementos "hasta"
        //solo que en este caso, no se hará la revisión [si se llegará a caer hasta
        //el 1er elemento de la pila] de si el 1st element == Function, puesto que
        //no es el objetivo
}