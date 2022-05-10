import { TAS } from "src/app/Modelo/ObjetosAnalisis/EDDs/TablaSimbolos/TAS";
import { Dibujar } from "./Dibujar";

export class DibujarTS extends Dibujar{

    override generateScript(): string {
        
        return "";
    }

    override generateGraphic(file: string): void {
        
        this.drawTAS();

    }

    drawTAS(){
        let TAS:TAS = this.father.getTAS();
        TAS.draw();//quizá deba quitar ese método de la TAS, puesto que se debe generar un script(texto), para hacer la graficación...
    }
}

//la TAS se obtendrá cuando del atrib father, en el método drawTAS, cuando 
//Se invoque el método exe()