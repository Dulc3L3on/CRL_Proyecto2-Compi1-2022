import { ActiveFileHandler } from "../Handlers/ActiveFileHandler";
import { GlobalContainer } from "../ObjetosAnalisis/Sentences/GlobalContainer";
import { parser as Parser } from "src/app/Modelo/Analizadores/CRLGrammar.js";

//<var cloneDeep = require('lodash.clonedeep');
import * as cloneDeep from 'lodash';


export class ActiveClassHandler{
    private static instance:ActiveClassHandler;

    private activeFileHandler:ActiveFileHandler;

    private constructor(){
        this.activeFileHandler = ActiveFileHandler.getInstance();
    }

    public static getInstance():ActiveClassHandler{
        if(ActiveClassHandler.instance == null){
            ActiveClassHandler.instance = new ActiveClassHandler();
        }

        return ActiveClassHandler.instance;
    }

    public analizeFile(fileName:string):GlobalContainer{
        let modifiedContent:string = this.activeFileHandler.getActiveFile(fileName).content.trim();//de una vez los dos, aunque al final deba add un \n xD
        modifiedContent = modifiedContent.replace(/(    )/g,"\t");

        let clase:GlobalContainer = Parser.parse(modifiedContent+"\n");//esto es debido a que para el primer elemento que aparezca en la gramática, sea del header o un elemento de clase, no se tiene considerado que aparezca un NL, antes de ellos, por lo cual para evitar modif en la gramática y hacer que todo esté en una sola RP, se usará el trim para esto. El \n que aparece aquí es porque toda instrucción si mal no recuerdo xD, tiene al final de su defi un NL, por lo cual el archivo siempre deberá terminar en este \n, para que el usaurio no se entere de esto xD, lo haré yo jaja xD
        clase.setName((fileName.replace(".crl", "")));          
        console.log("active class");
        console.log(clase);

        return clase;//aquí no hay pierde, puesto que el import será add Ssi hay un archivo con el nombre asignado
    }
}