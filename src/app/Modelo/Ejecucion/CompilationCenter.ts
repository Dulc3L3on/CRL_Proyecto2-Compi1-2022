import { CRL_File } from "../CRL_File";
import { ContentType } from "../ObjetosAnalisis/Sentences/Class_Content/ContentType";
import { Function } from "../ObjetosAnalisis/Sentences/Class_Content/Function";
import { Expresion } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion";
import { Result } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Result";
import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";
import { ActiveFileHandler } from "../Handlers/ActiveFileHandler";
import { Tool } from "../Tool/Tool";
import { ActiveClassHandler } from "./ActiveClassHandler";
import { parser as Parser } from "src/app/Modelo/Analizadores/CRLGrammar.js";
//import { parser as Parser } from "src/app/Modelo/Analizadores/GramaticaPrueba_SinAxn.js";


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

    compile(mainFileName:string){//este parám se llena con la opción que haya sido seleciconada en el select...
        this.activeFileHandler.setInfo(this.activeFiles, mainFileName);
        this.activeClassHandler.refreshClassList();
        console.log("#activeFiles: "+this.activeFiles.length);

        for(let index:number = 0; index < this.activeFiles.length; index++){
            console.log("class#"+index);

            let modifiedContent:string = this.activeFiles[index].content.trim();//de una vez los dos, aunque al final deba add un \n xD

            let activeClass:GlobalContainer = Parser.parse(modifiedContent+"\n");//esto es debido a que para el primer elemento que aparezca en la gramática, sea del header o un elemento de clase, no se tiene considerado que aparezca un NL, antes de ellos, por lo cual para evitar modif en la gramática y hacer que todo esté en una sola RP, se usará el trim para esto. El \n que aparece aquí es porque toda instrucción si mal no recuerdo xD, tiene al final de su defi un NL, por lo cual el archivo siempre deberá terminar en este \n, para que el usaurio no se entere de esto xD, lo haré yo jaja xD
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