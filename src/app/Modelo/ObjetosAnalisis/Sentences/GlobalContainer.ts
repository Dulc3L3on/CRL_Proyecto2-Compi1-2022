import { Container } from "./Container";
import { Function } from "./Class_Content/Function";
import { Sentence } from "./Sentence";

export class GlobalContainer extends Container{
    instantiated:boolean = false;

    imports: Array<GlobalContainer> = new Array<GlobalContainer>();
    INCERTITUDE:number;    
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

    findFunction(name:string|null, hash:string|null):Function|null{
        for(let indice = 0; indice < this.classContent.length; indice++){
            if(this.classContent[indice] instanceof Function){                
                if(((name != null)?(this.classContent[indice] as Function).getName():(this.classContent[indice] as Function).getHash()) 
                == ((name != null)? name: hash)){

                    return this.classContent[indice] as Function;
                }                               
            }
        }
        return null;
    }//creo que no será útil así de manera indep, porque para la invoc, se usaría lo de abajito y para
    //obtener la función a dibujar, se haría algo como lo de abajo no digo lo de abajo, puesto que hay
    //que recolectar todos los nombres [ahi si nombres xD] iguales    

    getInvocatedFunction(clase:GlobalContainer, hash:string):Function|null{
        let theFunction:Function|null = (clase.findFunction(null, hash) as Function| null);

        if(theFunction == null && clase.imports.length > 0){
            for(let actual = 0; actual < clase.imports.length; actual++){
                theFunction = clase.getInvocatedFunction(clase.imports[actual], hash);

                if(theFunction != null){
                    if(!this.instantiated){
                        this.instantiated = true;
                        this.initTAS();
                    }                    
                    return theFunction;
                }
            }            
        }
        return theFunction;
    }//A este método solo se le enviará el HASH debido a su naturaleza...

    initTAS(){
        let index:number = 0;

        while(!(this.classContent[index] instanceof Function)){
            this.classContent[index].exe();//no hay problema con invocar a este método, puesto que todo lo que haya ahí dentro será o una directiva o un contenedor, que al final de cuentas terminan siendo una sentencia xD

            index++;
        }
    }//con esto basta ya que las directivas de declaración de variable e incertidumbre, se encargan de enviar los datos a la TAS...

}

//este será la que antes era clase...