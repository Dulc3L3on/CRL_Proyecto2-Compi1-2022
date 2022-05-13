import { COMPILER_OPTIONS } from "@angular/core"
import { Tool } from "src/app/Modelo/Tool/Tool"
import { ContentType } from "../../Class_Content/ContentType"
import { Result } from "./Result"

    export const types_ADD = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.STRING, ContentType.INTEGER, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.STRING, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.STRING, ContentType.STRING, ContentType.STRING, ContentType.STRING, ContentType.STRING, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.STRING, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.STRING, ContentType.ERROR, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
    ]

    export const types_RES = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.INTEGER, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
        ]

    export const types_MULT = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.INTEGER, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
    ]

    export const types_DIV = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
    ]

    export const types_MOD = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
    ]

    export const types_POW = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
        ]

    export const type_equivalence = [
                /*INT*/                 /*DOU*/            /*STR*/              /*BOO*/             /*CHA*/             /*NTH*/             /*ERR*/
        /*INT*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.INTEGER, ContentType.INTEGER, ContentType.ERROR, ContentType.ERROR],
        /*DOU*/[ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.DOUBLE, ContentType.DOUBLE, ContentType.ERROR, ContentType.ERROR],
        /*STR*/[ContentType.ERROR, ContentType.ERROR, ContentType.STRING, ContentType.ERROR, ContentType.STRING, ContentType.ERROR, ContentType.ERROR],
        /*BOO*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.ERROR, ContentType.BOOLEAN, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*CHA*/[ContentType.INTEGER, ContentType.DOUBLE, ContentType.STRING, ContentType.ERROR, ContentType.CHAR, ContentType.ERROR, ContentType.ERROR],
        /*NTH*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],
        /*ERR*/[ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR, ContentType.ERROR],    
    ]//yo pienso que el Nothing, en este caso no debería addse puesto que no hay ocasión en que el Result pueda obtener eso... ah no si habría, con la invocación de funciones xD
    //no está bien...
export class Caster{
    tool:Tool;

    constructor(){
        this.tool = new Tool();
    }

    isADecimal(num:number){
        return this.tool.isADecimal(num);
    }

    //se supone que cuando se empleen estos, se tendrá una completa seguridad de que la conversión puede realizarse sin problemas, sino de todos modos tendrá el return con un ContentType ERROR, por si acaso xD
    //también se supone que no se invocarán cuando el tipo es el esperado, pero por si, mejor tendré un return result.getValue() para evitar problemas xD
    getPreferibleNumberType(type:ContentType):ContentType{
        switch(type){
            case ContentType.DOUBLE: case ContentType.INTEGER:
                return type;
            case ContentType.BOOLEAN: case ContentType.CHAR:
                return ContentType.INTEGER;        
        }
        return ContentType.ERROR;
    }

    getNumber(numberType:ContentType, result:Result):Result{
        if(numberType == ContentType.INTEGER){
            return this.getInteger(result);
        }

        return this.getDouble(result);
    }

    
    getInteger(result:Result):Result{        
        switch(result.getType()){            
            case ContentType.BOOLEAN:                
                return new Result (ContentType.INTEGER, (((result.getValue() as boolean) == true)?1:0));
            case ContentType.CHAR:                
                return new Result(ContentType.INTEGER, (result.getValue() as string).charCodeAt); 
            case ContentType.INTEGER:                 
                return result.getValue();
        }

        return new Result(ContentType.ERROR, "Impossible to cast an "+result.getType() + "value to INTEGER");
    }    

    getDouble(result:Result):Result{
        let auxiliar:string;

        switch(result.getType()){
            case ContentType.INTEGER: 
                return new Result(ContentType.DOUBLE, parseFloat((auxiliar = result.getValue()+".0")));
            case ContentType.BOOLEAN:
                auxiliar = (((result.getValue() as boolean) == true)?1:0) + ".0";
                return new Result (ContentType.DOUBLE, parseFloat(auxiliar));
            case ContentType.CHAR:
                auxiliar = (result.getValue() as string).charCodeAt + ".0";
                return new Result(ContentType.DOUBLE, parseFloat(auxiliar)); 
            case ContentType.DOUBLE:
                return result.getValue();
        }

        //esto se mostrará cuadno tipo == ERR o uno de los normales no aceptados...
        return new Result(ContentType.ERROR, "Impossible to cast an "+result.getType() + "value to DOUBLE");//lo malo es que haciendo esto, cuando se reciba un error, se mostrará que ese no se puede castear xD
    }

    getString(result:Result):Result{
        switch(result.getType()){
            case ContentType.BOOLEAN:
                return new Result(ContentType.STRING, (((result.getValue() as boolean) == true)?"1":"0"));
            case ContentType.INTEGER: case ContentType.DOUBLE: 
                return new Result(ContentType.STRING, new String(result.getValue()));
            case ContentType.STRING: case ContentType.CHAR:
                return result;

        }
        
        return new Result(ContentType.ERROR, "Impossible to cast an "+result.getType() + "value to STRING");
    }//todos los tipos pueden pasarse a string sin problemas

    getBoolean(result:Result):Result{
        if(result.getType() == ContentType.BOOLEAN){
            return result;
        }
        
        return new Result(ContentType.ERROR, "Impossible to cast an "+result.getType() + "value to BOOLEAN");
    }//todos los tipos pueden pasarse a string sin problemas

    getChar(result:Result):Result{
        if(result.getType() == ContentType.CHAR){
            return result;
        }
        
        return new Result(ContentType.ERROR, "Impossible to cast an "+result.getType() + "value to CHAR");
    }//todos los tipos pueden pasarse a string sin problemas
}