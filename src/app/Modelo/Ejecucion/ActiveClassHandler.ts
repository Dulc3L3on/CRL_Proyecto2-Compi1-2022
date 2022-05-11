import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";

export class ActiveClassHandler{
    mainClass:GlobalContainer;
    clasesActivas:Array<GlobalContainer>;

    constructor(){
        this.clasesActivas = new Array<GlobalContainer>();
    }

    setActiveClass(activeClass:GlobalContainer){
        this.clasesActivas.push(activeClass);
    }//se van a ir seteando conforme se vayan analizando las clases por medio del método analize xD

    setMain(mainClass:GlobalContainer){
        this.mainClass = mainClass;
    }

    getActiveClass(name:string):GlobalContainer{
        let indexEncountered = 0;

        for(let index:number = 0; index < this.clasesActivas.length; index++){
            if(this.clasesActivas[index].getName() == name){
                indexEncountered = index;
                break;
            }
        }        
        return this.clasesActivas[indexEncountered];
    }

    getMainClass():GlobalContainer{
        return this.mainClass;
    }

}