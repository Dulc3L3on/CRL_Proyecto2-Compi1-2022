import { GlobalContainer } from "../../GlobalContainer";

export class Import{//a mi parecer no debe heredar de una Sentence, puesto que no tiene necesidad que se le setee un padre, y tampoco nec utilizar un métood llamado exe, o sea podría ponerle ese nombre, pero no sería por el hecho que todos sus demás hermanos, también deberían exe y para evitar tener que colocar switchs entocnes que todos implementen según req ese método
    importName:string;
    importClass:GlobalContainer|null;

    constructor(importName:string){
        this.importName = importName;
        this.importClass = null;
    }

    setImportedClass(importedClass:GlobalContainer){
        this.importClass = importedClass;
    }

    getImportedClass():GlobalContainer{
        if(this.importClass == null){
            //se invoca al servicio [puse servicio pensando en que sería util que la misma instancia fuese accesible para todos, puesto que este objeto, contendrá todas las clases que han sido analizadas]
        }
        return this.importClass!;//puesto que el if de arriba se encarga de evitar los null lo cual es completamente de fiar, ya que en las axn de la gramática se revisará si los nombres de los arch importados corresp a un archivo real, al no ser así, no se add al listado de imports, por esa razón ese listado solo tendrá cosas veraces xD
    }
}