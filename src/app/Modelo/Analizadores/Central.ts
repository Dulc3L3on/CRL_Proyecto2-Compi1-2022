import { Clase } from "../ObjetosAnalisis/Clase";

export class Central{

    initAnalisis(): number{



        return 1;//SUCCESS
    }

    private createDiagramRelation(imports: string[], content: string, clase:Clase): boolean{
        if(imports != null){
            let indice = 0;

            while(indice < imports.length){
                var importada:Clase = new Clase();
                const totalContent = this.getTotalContent(imports[indice]);

            //    this.createDiagramRelation(this.getImports(totalContent), );
            }
        }

        return true;
    }

    private getTotalContent(fileName: string): string{
        return "";
    }

    /*private getImports(totalContent: string):string[]{
        //let imports: number = ((totalContent.indexOf("void"))>);

        //return imports;
        return "";
    }*/

}