import { Container } from "./Container";
import { Function } from "./Class_Content/Function";
import { Sentence } from "./Sentence";

export class GlobalContainer extends Container{
    imports: Array<GlobalContainer> = new Array<GlobalContainer>();
    classContent: Array<Sentence> = new Array<Sentence>();//pienso que convedría más que fuera una HASH... para que aśi concuerde con la definición de tabla...
    //vamos a dejar la lista, puesto que en la función dibujar, se envía el nombre, y tendría que hacer que a partir de ese nombre se genere una key válida,
    //basada en un patrón, el cual estaba pensando fuera dep del #función add a la clase, pero eso no lo podríamos saber a partir del nombre y generar
    //keys que no sean de un valor exagerado, req pensar mejor, porque no sería útil si creara valores muy grandes, puesto que la lista, se haría enorme y por
    //lo tanto habría mucho espaciio sin utilizar...

    addHijo(hijo: GlobalContainer): void{
        this.imports.push(hijo);
    }

    addGlobalContent(contenido: Sentence){
        this.classContent.push(contenido);
    }

    findFunction(name:string):Function|null{
        for(let indice = 0; indice < this.classContent.length; indice++){
            if(this.classContent[indice] instanceof Function){
                if((this.classContent[indice] as Function).getName() == name){
                    return this.classContent[indice] as Function;
                }
            }
        }
        return null;
    }

    getInvocatedFunction(clase:GlobalContainer, name:string):Function|null{
        let theFunction:Function|null = (clase.findFunction(name) as Function| null);

        if(theFunction == null && clase.imports.length > 0){
            for(let actual = 0; actual < clase.imports.length; actual++){
                theFunction = clase.getInvocatedFunction(clase.imports[actual], name);

                if(theFunction != null){
                    return theFunction;
                }
            }            
        }

        return theFunction;
    }    
}

//este será la que antes era clase...