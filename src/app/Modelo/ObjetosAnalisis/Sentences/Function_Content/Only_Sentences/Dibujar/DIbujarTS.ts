import { TAS } from "src/app/Modelo/ObjetosAnalisis/EDDs/TablaSimbolos/TAS";
import { Dibujar } from "./Dibujar";

export class DibujarTS extends Dibujar{
    TAS:TAS;    

    setTAS(TAS:TAS){
        this.TAS = TAS;
    }

    override generateScript(): string {
        
        return "";
    }

    override generateGraphic(file: string): void {
        
        this.drawTAS();

    }

    drawTAS(){

    }

}


//el contenedor en el que sea llamado, será del que se haga la rep, es decir no puede ser como
//en dibujarAST, puesto que ahí, se puede y debería xD, ir a buscar el nombre del contenedor
//[puse contenedor, porque me imagino que no será solo de las funciones...]