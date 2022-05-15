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

        return ActiveFileHandler.instance;
    }

    setInfo(activeFiles:Array<CRL_File>, mainFileName:string){
        this.activeFiles = activeFiles;
        this.mainFileName = mainFileName;
    }

    isExistFile(name:String):boolean{
        for(let index:number = 0; index < this.activeFiles.length; index++){
            if(this.activeFiles[index].getName() == name){
                return true;
            }
        }
        return false;
    }

    isMainFile(possible:string){
        if(possible = this.mainFileName){
            return true;
        }
        return false;
    }
    
}