import { TAS } from "../EDDs/TablaSimbolos/TAS";
import { Result } from "./Function_Content/Content/Result";
import { Variable } from "./Function_Content/Content/Variable";
import { GlobalContainer } from "./GlobalContainer";
import { LocalContainer } from "./LocalContainer";
import { Sentence } from "./Sentence";

export class Container extends Sentence{
    TAS:TAS;

    findVariable(name:string):Result{
        return this.searchVariable(this, name);
    }

    searchVariable(container:Container, name:string):Result{
        let index:number = container.getTAS().findVariable(name);
        
        if(index != -1){            
            return container.getTAS().getVariable(index).getContent();
        }else if(index == -1 && !(container instanceof GlobalContainer)){//con tal de que no tenga que addse el atrib father y que este le ponga null xD, o sea, sería funcional, pero para no mover esa struct xD, aunque pensándolo bien quizá sea mejor jajaj
            return this.searchVariable((container as LocalContainer).getFather(), name);
        }
        return new Result(ContentType.ERROR, "Not exist a variable that it names is "+ name);
    }

    getTAS():TAS{
        return this.TAS;
    }
}

//HEREDEROS
    //>Function
    //Loop
    //Control_Sentence