import { ThisReceiver } from "@angular/compiler";

export class Stack<T>{//LIFO
    elements: Array<T>;
    
    constructor(){
        this.elements = new Array<T>();
    }

    insert(element:T){
        this.elements.push(element);

        console.log("-----oo> stack state <oo-----");
        console.log("> #elements: " + this.size());
        console.log("> elements: " + this.getElements());
    }

    setAll(theElements:Array<T>){
        /*this.copyArray(theElements);        

        console.log("copied array: "+ this.elements);*/
        this.elements = theElements;
    }

    getReverse():Array<T>{
        let reverseElements:Array<T> = new Array<T>();        
        let size:number = this.size();        
        
        for(let actual = size; actual > 0; actual--){
            reverseElements.push(this.elements[actual-1]);
            console.log("actual element: "+ (actual-1));
            console.log(this.elements[actual-1]);
            
            console.log(reverseElements);
        }
        return reverseElements;
    }

    private copyArray(original:Array<T>){
        /*original.forEach( element => 
            this.elements.push(element) );      */ 
        /*console.log("original");
        console.log(original);

        this.elements = original.slice(0, 12);*/        
    }

    getElement():T|null{
        if(!this.isEmpty()){
            let element:T = this.elements.pop() as T;            
            return element;
        }
        return null;
    }//es decir obtener el siguiente ele que está en el tope de la pila

    previewElement():T|null{
        if(!this.isEmpty()){
            return this.elements[this.size()-1];//el objetivo es devolverlo sin removerlo de la pila
        }
        return null;
    }

    /*reviewPrevious():T|null{
        if(!this.isEmpty()){
            return this.elements[this.size()-1];
        }
        return null;
    }*///con previo me refiero al penúltimo xD [útil al revisar los scope para hacer los set y para la revisión del else...]

    /*getFirst():T|null{
        if(!this.isEmpty()){
            return this.elements[0];
        }       
        return null;
    }*/

    getElements():Array<T>{
        return this.elements;
    }

    isEmpty():boolean{
        return (this.elements.length==0);
    }

    size():number{
        return this.elements.length;//Debe ser así, puesto que el valor puede ir variando de un momento a otro
    }
}