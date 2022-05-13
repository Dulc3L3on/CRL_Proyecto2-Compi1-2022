import { Container } from "./Container";
import { Function } from "./Class_Content/Function";
import { Sentence } from "./Sentence";
import { Import } from "./Class_Content/Import";
import { TAS } from "../EDDs/TablaSimbolos/TAS";

export class GlobalContainer extends Container{
    instantiated:boolean = false;
    name:string;

    imports: Array<Import>;    
    classContent: Array<Sentence>;//pienso que convedría más que fuera una HASH... para que aśi concuerde con la definición de tabla...
    //vamos a dejar la lista, puesto que en la función dibujar, se envía el nombre, y tendría que hacer que a partir de ese nombre se genere una key válida,
    //basada en un patrón, el cual estaba pensando fuera dep del #función add a la clase, pero eso no lo podríamos saber a partir del nombre y generar
    //keys que no sean de un valor exagerado, req pensar mejor, porque no sería útil si creara valores muy grandes, puesto que la lista, se haría enorme y por
    //lo tanto habría mucho espaciio sin utilizar...
    constructor(){
        super();
        
        this.setScope(-1);//puesto que aquí no es de interés ese valor xD

        this.imports = new Array<Import>();
        this.classContent = new Array<Sentence>();
    }

    setName(name:string){
        this.name = name;
    }

    addImport(importt:Import){
        this.imports.push(importt);
    }

    addGlobalContent(contenido: Sentence){
        this.classContent.push(contenido);
    }        

    getMainFunction(hash:string):Function|null{//Auqneu en realidad la clase Main no requiere de este atrib puesto que será única, por los parámetros dados en el eunciado [no pueden haber clases que se llamen igual y tengan el lmismo tipo de dev y params iguales]
        return (this.findFunction(null, hash) as Function| null); 
    }//Este se invocará una sola vez y será para el container específico con el fin de ini el stack de exe xD

    getInvocatedFunction(hash:string):Function|null{
        let theFunction:Function|null = (this.findFunction(null, hash) as Function| null);
        let iHaveTheFunction:boolean = true;

        if(theFunction == null){
            iHaveTheFunction = false;//con tal que el if, que se encarga de ini la TAS, solo se app para la clase en la que se encontró dentro de su cuerpo a la función

            for(let actual:number = 0; actual < this.imports.length; actual++){
                theFunction = this.imports[actual].getImportedClass().getInvocatedFunction(hash);

                if(theFunction != null){
                    break;
                }
            }
        }
        
        if(iHaveTheFunction && theFunction != null){
            if(!this.instantiated){
                this.instantiated = true;
                this.initTAS();
            }                    
        }        
        return theFunction;
    }//A este método solo se le enviará el HASH debido a su naturaleza...

    findFunction(name:string|null, hash:string|null):Function|null{//puse los null, pueso que este método se empleará para buscar todas las funciones que se llamen igual, por lo tanto para saber bien qué tipo de búsqueda solicitan permito el null, para hacer la condi basado en el valor de los argu... xD
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

    //a parte hace falta el método para buscar TODAS las funciones que tengan NOMBRE igual, deplano que se tenrá una clase para hacer eso, puesto que debe listar a todas y no parar cuando encuentre una... ahora se me ocurre que debería ser un método de esta clase GC, y que cuando se invoque el método exe de dibujar, a la clase Main se le invoque este método para que así pueda tener acceso a todos los niveles y así encontrar las funcioens [NOTA, en este caso no será nec ini la clase, puesto que solo se req la info literal y no el func de dhica info de la func xD]

    initTAS(){
        this.TAS = new TAS();
        let index:number = 0;

        while(!(this.classContent[index] instanceof Function)){
            this.classContent[index].exe();//no hay problema con invocar a este método, puesto que todo lo que haya ahí dentro será o una directiva o un contenedor, que al final de cuentas terminan siendo una sentencia xD

            index++;
        }
    }//con esto basta ya que las directivas de declaración de variable e incertidumbre, se encargan de enviar los datos a la TAS...

    getName():string{
        return this.name;
    }//no se creará un hash personalizado, puesto que los nombres de los archivos no podrán repetirse, bueno eso es más condi mía que del enunciado xD

}

//este será la que antes era clase...