import { CRL_File } from "../CRL_File";

export class ActiveFileHandler{   
    private static instance:ActiveFileHandler;

    private activeFiles: Array<CRL_File>;
    private mainFileName:string;

    private constructor(){}

    public static getInstance():ActiveFileHandler{
        if(ActiveFileHandler.instance == null){
            ActiveFileHandler.instance = new ActiveFileHandler();
        }

        console.log("new instance Active File Handler");
        return ActiveFileHandler.instance;
    }

    setInfo(activeFiles:Array<CRL_File>, mainFileName:string){
        this.activeFiles = activeFiles;
        this.mainFileName = mainFileName;
    }

    isExistFile(name:String):boolean{
        for(let index:number = 0; index < this.activeFiles.length; index++){            
            console.log("name: " + name + " =? " + this.activeFiles[index]);

            if(this.activeFiles[index].getName() == name){
                console.log("class imported finded");
                return true;
            }
        }
        return false;
    }

    isMainFile(possible:string){
        console.log("is main file? " + (possible == this.mainFileName));

        if(possible == this.mainFileName){
            return true;
        }
        return false;
    }

    public getActiveFile(fileName:string){
        let indexEncountered = 0;//este lo coloco, puesto que siempre se encontrará el archivo, entonces con tal que el método no tenga un valor de retorno | null, enotnces hago esto xD
        console.log("existing files: ")
        console.log(this.activeFiles);

        for(let index:number = 0; index < this.activeFiles.length; index++){
            if(this.activeFiles[index].getName() == fileName){
                indexEncountered = index;                
                break;
            }
        }        
        return this.activeFiles[indexEncountered];
    }//método empleado en analizeFile xD

    
}