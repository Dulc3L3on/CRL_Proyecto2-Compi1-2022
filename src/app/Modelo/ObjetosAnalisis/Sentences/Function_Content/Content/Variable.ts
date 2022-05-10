import { Result } from "./Result";

export class Variable{    
    name:string;        
    content:Result;

    constructor(name:string, type:ContentType|null, value:any|null){//se tendrá type, nomrbre y value, cuando se use como param [puesto que se llenará la TAS, cuando la función sea invocada xD], ninguno de eso dos cuando se utilice en expr. Cuando sea la var de la TAS, se empleará el setValue, por las != asignaciones que se podrán hacer...
        this.name = name;

        this.content = new Result();//independientemente de que se le haya asignado o no el tipo, ahí te recuerdas que por defecto tendrá NOTHING, lo cual es un error para la variable
        if(type != null){
            this.content.setType(type);
        }
        if(value != null){
            this.content.setValue(value);
        }

    }//el tipo sería utilizado para cuando se utilice esto para los parám...    

    setValue(value:any):void{
        this.content.setValue(value);
    }//se empleará cuando se haga invoc [por los argu], cuando se haga una re/asignacion, y también en la creación, puesto que me imagino se hará en dos partes, cuando tb esté prte una asign al crear las var...

    getType():ContentType{
        return this.content.getType();
    }

    getName():string{
        return this.name;
    }

    getContent(){
        return this.content;
    }

    
    //este será invocado cuando se req el valor en la clase expr, puesto que el obj var_content, solicitará el valor de la TS y esta a su vez, solicitará el 
    //contenido a la var que ha hallado, a partir de este método, y de esa forma se podrá obtener sin problemas el dato, del objeto var_content cuando sea el casp


    //con este no habrá problema puesto que antes de pedir el valor, se revisará el tipo de la var, si corresponde se procederá a solitiar el valor, sino se informará 
    //acerca del error
        //aunque ahora que lo pienso, creo que será mejor coloar un throws en el método que calcula las expre y req de este método, porque así cuando allí en ese método
        //mencionado, haga solicitud del valor al obj var_content, si no corresp, entonces se provocará una excep ahí mismo y no habrá que hacer que esa excep navegue hasta
        //llegar ahí, sino que de esa forma se logrará que se informe de manera directa...
    
}