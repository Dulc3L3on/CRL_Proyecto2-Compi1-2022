import { CRL_File } from "../CRL_File";
import { Stack } from "../ObjetosAnalisis/EDDs/Stack";
import { Function } from "../ObjetosAnalisis/Sentences/Class_Content/Function";
import { Expresion } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion";
import { Result } from "../ObjetosAnalisis/Sentences/Function_Content/Content/Result";
import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";
import { Tool } from "../Tool/Tool";
import { ActiveClassHandler } from "./ActiveClassHandler";

export class CompilationCenter{
    private classFiles:Array<CRL_File>;
    private activeClassHandler:ActiveClassHandler;
    private NAME_MAIN:string = "Principal";
    //por la forma en que se trabajó con las pilas locales de cada función, no será nec, tener una pila gobal a partir de la cual se vayan buscando las sentencias para hacer que exe sus axn :3 GRACIAS DIOS!!! xD

    tool:Tool;

    constructor(classFiles:Array<CRL_File>){
        this.classFiles = classFiles;

        this.activeClassHandler = new ActiveClassHandler();
        this.tool = new Tool();
    }

    compile(mainFileName:string){
        for(let index:number = 0; index < this.classFiles.length; index++){
            let activeClass:GlobalContainer = parser.parse(this.classFiles[index].content);
            activeClass.setName(this.classFiles[index].getName());           
            
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

    initExe(){
        let theFunction:Function|null = this.activeClassHandler.getMainClass().getMainFunction(
            this.tool.regenerateFunctionHash(this.NAME_MAIN, new Array<Expresion>()));
            
        if(theFunction != null){
            let result:Result = theFunction.exe();
            
            if(result.getType() == ContentType.SUCCESS){

            }else{

            }
        }        
    }
}