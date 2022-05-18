import { ActiveClassHandler } from "src/app/Modelo/Ejecucion/ActiveClassHandler";
import { SourceLocation } from "src/app/Modelo/Tool/SourceLocation";
import { GlobalContainer } from "../GlobalContainer";

export class Import{//a mi parecer no debe heredar de una Sentence, puesto que no tiene necesidad que se le setee un padre, y tampoco nec utilizar un métood llamado exe, o sea podría ponerle ese nombre, pero no sería por el hecho que todos sus demás hermanos, también deberían exe y para evitar tener que colocar switchs entocnes que todos implementen según req ese método
    importName:string;
    importClass:GlobalContainer|null;

    private activeClassHandler:ActiveClassHandler;
    private sourceLocation:SourceLocation;

    constructor(line:number, column:number, importName:string){
        this.importName = importName;
        this.importClass = null;

        this.activeClassHandler = ActiveClassHandler.getInstance();//para este punto el CompilationCenter ya estará ini, y por lo tanto este objeto ya tendrá una instancia almacenada xD
        this.sourceLocation = new SourceLocation(line, column);
    }

    getImportedClass():GlobalContainer{
        console.log("i have the class imported? "+ this.importClass);

        if(this.importClass == null){
            //puesto que las revisiones de existencia y verificación que no sea la clase del Main que se esté importando, se harán en la gramática, aquí se tendrá que proceder a tomar la instancia nada más xD
            console.log("import class name " + this.importName);
            this.importClass = this.activeClassHandler.analizeFile(this.importName);            
        }
        return this.importClass!;//puesto que el if de arriba se encarga de evitar los null lo cual es completamente de fiar, ya que en las axn de la gramática se revisará si los nombres de los arch importados corresp a un archivo real, al no ser así, no se add al listado de imports, por esa razón ese listado solo tendrá cosas veraces xD
    }
}

//creo que no pierdo nada con agregar un sourceLocation aquí... auqnue por lo que veo nunca se utilizaría
//pero con tal de tener la ubicación de ellos xD, mejor lo pondré xD