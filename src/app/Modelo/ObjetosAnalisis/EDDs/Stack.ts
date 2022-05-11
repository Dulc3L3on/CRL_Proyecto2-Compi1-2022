import { ThisReceiver } from "@angular/compiler";

export class Stack<T>{//LIFO
    elements: Array<T>;
    
    constructor(){
        this.elements = new Array<T>();
    }

    insert(element:T){
        this.elements.push(element);
    }

    setAll(theElements:Array<T>){
        this.elements = theElements;
    }

    getReverse():Array<T>{
        let reverseElements:Array<T> = new Array<T>();

        for(let actual = this.size(); actual > 0; actual++){
            reverseElements.push(this.elements[actual-1]);
        }
        
        return reverseElements;
        //return this.elements.reverse();//no voy a usar reverse, porque la referencia que se obtiene es al mismo array y yo no quiero que se modifique el arreglo original...
    }

    getLast():T|null{
        if(!this.isEmpty()){
            let element:T = this.elements.pop() as T;            
            return element;
        }
        return null;
    }//es decir obtener el siguiente ele que está en el tope de la pila

    reviewPrevious():T|null{
        if(!this.isEmpty()){
            return this.elements[this.size()-1];
        }
        return null;
    }//con previo me refiero al penúltimo xD [útil al revisar los scope para hacer los set y para la revisión del else...]

    getFirst():T|null{
        if(!this.isEmpty()){
            return this.elements[0];
        }       
        return null;
    }

    getElements(){
        return this.elements;
    }

    isEmpty():boolean{
        return (this.elements.length==0);
    }

    size():number{
        return this.elements.length;
    }
}