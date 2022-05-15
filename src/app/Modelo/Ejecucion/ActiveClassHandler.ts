import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";

export class ActiveClassHandler{
    private static instance:ActiveClassHandler;

    mainClass:GlobalContainer;
    clasesActivas:Array<GlobalContainer>;

    private constructor(){}

    public static getInstance():ActiveClassHandler{
        if(ActiveClassHandler.instance == null){
            ActiveClassHandler.instance = new ActiveClassHandler();
        }

        return ActiveClassHandler.instance;
    }

    refreshClassList(){
        this.clasesActivas = new Array<GlobalContainer>();
    }

    setActiveClass(activeClass:GlobalContainer){
        this.clasesActivas.push(activeClass);
    }//se van a ir seteando conforme se vayan analizando las clases por medio del método analize xD

    setMain(mainClass:GlobalContainer){
        this.mainClass = mainClass;
    }

    getMainClass():GlobalContainer{
        return this.mainClass;
    }

    getClone(className:string):GlobalContainer{
        if(className == this.mainClass.getName()){
            return JSON.parse(JSON.stringify(this.mainClass));
        }

        return JSON.parse(JSON.stringify(this.getActiveClass(className)));        
    }

    private getActiveClass(name:string):GlobalContainer{
        let indexEncountered = 0;

        for(let index:number = 0; index < this.clasesActivas.length; index++){
            if(this.clasesActivas[index].getName() == name){
                indexEncountered = index;
                break;
            }
        }        
        return this.clasesActivas[indexEncountered];
    }
}