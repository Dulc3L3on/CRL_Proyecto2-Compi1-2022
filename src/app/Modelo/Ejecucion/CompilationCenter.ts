import { CRL_File } from "../CRL_File";
import { ContentType } from "../ObjetosAnalisis/Sentences/Class_Content/ContentType";
import { Expresion } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion";
import { Result } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Result";
import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";
import { ActiveFileHandler } from "../Handlers/ActiveFileHandler";
import { Tool } from "../Tool/Tool";
import { ActiveClassHandler } from "./ActiveClassHandler";
import { Main } from "../ObjetosAnalisis/Sentences/Class_Content/Main";
import { MessageHandler } from "src/app/Modelo/Handlers/MessageHandler";
//import { parser as Parser } from "src/app/Modelo/Analizadores/GramaticaPrueba_SinAxn.js";


export class CompilationCenter{
    private activeFiles:Array<CRL_File>;//este solo lo tengo por el hecho que el nombre del mainFile, se recibe hasta que presionan compilar..., bien podría setearle la lista al inicializar el activeFikeHandler, pero por si acaso cuando cb la lista en realidad el componente no se vuelve a crear y por lo tnato no se reconsstruye este CompilationCenter, sino que solo cb los elementos del compoennte, mejor lo hago así
    private NAME_MAIN_FUNCTION:string = "Principal";

    private activeClassHandler:ActiveClassHandler;
    private activeFileHandler:ActiveFileHandler;
    private messageHandler:MessageHandler;
    //por la forma en que se trabajó con las pilas locales de cada función, no será nec, tener una pila gobal a partir de la cual se vayan buscando las sentencias para hacer que exe sus axn :3 GRACIAS DIOS!!! xD

    tool:Tool;

    constructor(activeFiles:Array<CRL_File>){
        this.activeFiles = activeFiles;

        this.activeFileHandler = ActiveFileHandler.getInstance();
        this.activeClassHandler = ActiveClassHandler.getInstance();        
        this.messageHandler = MessageHandler.getInstance();

        this.tool = new Tool();
    }

    compile(mainFileName:string){//este parám se llena con la opción que haya sido seleciconada en el select...
        this.activeFileHandler.setInfo(this.activeFiles, mainFileName);        
        console.log("#activeFiles: "+this.activeFiles.length);
        
        let main:GlobalContainer = this.activeClassHandler.analizeFile(mainFileName);                   

        //me pregunto si debería seguir el análisis aunque hayan errores sintácticos...        
        //las clases van a tener pocas funciones y quizá tenga cosas raras, pienso que será un poco riesgozo intentar hacer la exe
        //por todas las posibles inconsitencias que puedan tener las clases
        //por eso digo que los errores deben ser manejados con un servicio... y tb los msjes hacia consola
        //también ahora se me ocurre que el manejo de imágenes [aunque ahí acordamos que al generar una imagen, se add a un HTML, para que así se pueda tener todo el conjunto y luego se averiguará como pasar el HTML a un PDF... a menos que graphviz tenga la opción xD]

        this.initExe(main);
    }   

    private initExe(mainClass:GlobalContainer){
        let theFunction:Main|null = mainClass.getMainFunction(
            this.tool.regenerateFunctionHash(this.NAME_MAIN_FUNCTION, new Array<Expresion>()));
            this.messageHandler.clearList();//Sea que esté o no el main, o que hayan o no errores, debe limpiarse

        if(theFunction != null){
            this.messageHandler.initList();
            let result:Result = theFunction.exe();            
            
            if(result.getType() == ContentType.SUCCESS){
                this.messageHandler.finalizeList();//Si no estuvo bien entonces no se add el final xD
            }else{

                
            }

            
        }else{
            //Se add el msje por no existir el main
        }        
    }

    

    
}