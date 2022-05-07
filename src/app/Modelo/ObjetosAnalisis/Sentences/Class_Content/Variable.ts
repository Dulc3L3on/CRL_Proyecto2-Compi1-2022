import { Expresion } from "../Function_Content/Content/Expresion";

export class Variable{
    type:ContentType;
    name:string;
    asignatedExpresion:Expresion;//al pedir el valor de este atrib, la clase se encargará de devolver el valor según el tipo que tenga asigna
    value:string|null = null;

    constructor(name:string, type?:ContentType){
        this.name = name;
        if(type != null){
            this.type = type;
        }
    }//el tipo sería utilizado para cuando se utilice esto para los parám...

    setType(type:ContentType){
        this.type = type;
    }

    setAsignation(expr:Expresion){
        this.asignatedExpresion = expr;
    }//a menos que en la grmática quites la RP creacionVar y pongas la lista junto con el valor de asignación en la RP de declaración de variables, tendrás que dejar estos dos separados y no podrás crear un método algo así como setCreationInformation...

    setValue():void{//puesto que donde se requeira utilzar el valor se tendrá acceso al tipo, entonces ahí será donde se hará sin problemas la conversión...      
        //Se invoca al método de expresión que se encargará de devolver el valor según corresponda...

    }//Este método dse utilizará cuando se esté haciendo la add a la TS

    getType():ContentType{
        return this.type;
    }

    getName():string{
        return this.name;
    }
    
    getIntegerValue():number|null{
        if(this.value != null){
            return parseInt(this.value!);
        }
        
        return null;
    }

    getDoubleValue():number|null{
        if(this.value != null){
            return parseFloat(this.value!);
        }
        
        return null;
    }

    getStringValue():string|null{
        return this.value;

    }

    getBooleanValue():boolean|null{
        if(this.value != null){
            return (this.value == "true")?true:false;
        }
        
        return null;
    }

    getCharValue():string|null{
        if(this.value != null){
            return this.value;
        }
        
        return null;
    }
    //este será invocado cuando se req el valor en la clase expr, puesto que el obj var_content, solicitará el valor de la TS y esta a su vez, solicitará el 
    //contenido a la var que ha hallado, a partir de este método, y de esa forma se podrá obtener sin problemas el dato, del objeto var_content cuando sea el casp


    //con este no habrá problema puesto que antes de pedir el valor, se revisará el tipo de la var, si corresponde se procederá a solitiar el valor, sino se informará 
    //acerca del error
        //aunque ahora que lo pienso, creo que será mejor coloar un throws en el método que calcula las expre y req de este método, porque así cuando allí en ese método
        //mencionado, haga solicitud del valor al obj var_content, si no corresp, entonces se provocará una excep ahí mismo y no habrá que hacer que esa excep navegue hasta
        //llegar ahí, sino que de esa forma se logrará que se informe de manera directa...
    
}