import { Definicion } from "./Instrucciones/Definiciones/Definicion";
import { TAS } from "./TablaSimbolos/TAS";

export class Clase{
    tablaSimbolos: TAS;

    imports: Array<Clase> = new Array<Clase>();
    definiciones: Array<Definicion> = new Array<Definicion>();//pienso que convedría más que fuera una HASH... para que aśi concuerde con la definición de tabla...
}