import { CRL_File } from "../CRL_File";
import { ContentType } from "../ObjetosAnalisis/Sentences/Class_Content/ContentType";
import { Function } from "../ObjetosAnalisis/Sentences/Class_Content/Function";
import { Expresion } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion";
import { Result } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Result";
import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";
import { ActiveFileHandler } from "../Handlers/ActiveFileHandler";
import { Tool } from "../Tool/Tool";
import { ActiveClassHandler } from "./ActiveClassHandler";

declare var CRLGrammar:any;

export class CompilationCenter{
    private activeFiles:Array<CRL_File>;
    private NAME_MAIN_FUNCTION:string = "Principal";

    private activeClassHandler:ActiveClassHandler;
    private activeFileHandler:ActiveFileHandler;
    //por la forma en que se trabajó con las pilas locales de cada función, no será nec, tener una pila gobal a partir de la cual se vayan buscando las sentencias para hacer que exe sus axn :3 GRACIAS DIOS!!! xD

    tool:Tool;

    constructor(activeFiles:Array<CRL_File>){
        this.activeFiles = activeFiles;

        this.activeFileHandler = ActiveFileHandler.getInstance();
        this.activeClassHandler = ActiveClassHandler.getInstance();        
        this.tool = new Tool();
    }

    compile(mainFileName:string){
        this.activeFileHandler.setInfo(this.activeFiles, mainFileName);
        this.activeClassHandler.refreshClassList();

        for(let index:number = 0; index < this.activeFiles.length; index++){
            let activeClass:GlobalContainer = CRLGrammar.parse(this.activeFiles[index].content);
            activeClass.setName(this.activeFiles[index].getName());           
            
            if(activeClass.getName() != mainFileName){
                this.activeClassHandler.setActiveClass(activeClass);//hago esto porque en primer lugar el archivo del main no tendría porque poder ser improtado y porque si esto se revisa en la gramática, entonces ese arch, nada más estaría ocupando espacio en la lista de las activeClass xD
            }else{
                this.activeClassHandler.setMain(activeClass);
            }
        }//se generan todos las clases [GC], de cada archivo creado, sin importar que esté o no presente en la traza de exe

        //me pregunto si debería seguir el análisis aunque hayan errores sintácticos...        
        //las clases van a tener pocas funciones y quizá tenga cosas raras, pienso que será un poco riesgozo intentar hacer la exe
        //por todas las posibles inconsitencias que puedan tener las clases
        //por eso digo que los errores deben ser manejados con un servicio... y tb los msjes hacia consola
        //también ahora se me ocurre que el manejo de imágenes [aunque ahí acordamos que al generar una imagen, se add a un HTML, para que así se pueda tener todo el conjunto y luego se averiguará como pasar el HTML a un PDF... a menos que graphviz tenga la opción xD]

        this.initExe();
    }

    private initExe(){
        let theFunction:Function|null = this.activeClassHandler.getMainClass().getMainFunction(
            this.tool.regenerateFunctionHash(this.NAME_MAIN_FUNCTION, new Array<Expresion>()));
            
        if(theFunction != null){
            let result:Result = theFunction.exe();
            
            if(result.getType() == ContentType.SUCCESS){

            }else{

            }
        }        
    }
}