import { Injectable } from "@angular/core";
import { CRL_File } from "../Modelo/CRL_File";

@Injectable({
    providedIn: 'root'
})
export class FileService{  
    all_Files:Array<CRL_File> = new Array<CRL_File>();
    active_Files:Array<CRL_File> = new Array<CRL_File>();//estos se obtienen del arreglo original... quizá mejor debería almacenarse los índices y a partir de ellos formar el arreglo a enviar para no tener problemas con que un objeto con el mismo nombre tenga diferente contenido
    //ya que son referencias entonces se modificará el contenido, o eso esperaría, sino ahí si deplano que se convertirá este arreglo a uno que almacene números

    addFile(name:string, text:string){
        this.addUniqueFile(name, text);
    }

    addActiveFile(indice:number){
        let esRepetido:boolean = false;

        if(indice != -1){//no tendría que llegar a serlo, puesto que se dispará al exe el evt
          for(let actual: number = 0; actual < this.active_Files.length; actual++){        
            if(this.active_Files[actual].name == this.all_Files[indice].name &&
              this.active_Files[actual].content == this.all_Files[indice].content){//yo digo que con el nombre bastaría, y aquí sería donde se comprobaría si el contenido se actualizar en la copia de los active file, entonces para comprobar eso seleccionarás un archivo que ya esté en las pestañas y si se add entonces deberás implementar la lista de números
                esRepetido = true;
                break;
            }                
          } 
          
          if(!esRepetido){
            this.active_Files.push(this.all_Files[indice]);
          }      
        }   
    }

    private addUniqueFile(fileName:string, content:string){
        if(this.ensureUniqueness(fileName)){
          this.all_Files.push(new CRL_File((this.all_Files.length), fileName, content));//Así comienza desde 0 xD
        }
      }
    
    private ensureUniqueness(fileName:string){
        for(let index:number = 0; index < this.all_Files.length; index++)
            if(this.all_Files[index].getName() == fileName){
              return false;
            }    
        return true;
      }

    resetContentOfFile(ID:number, content:string){//puesto que será una sola lista, entonces no hay pena xD
        for(let index:number = 0; index < this.all_Files.length; index++){
            if(this.all_Files[index].getID() == ID){
                this.all_Files[index].resetContent(content);
                break;
            }
        }
    }

    deleteActiveFile(indice:number){
      if(indice != -1){//sé que no sucederpa, puesto que solo podrá cerrar si hay pestañas y el número que se reciba siempre será de 0-n, puesto que se add con el for, pero por si xD
        this.active_Files.splice(indice, 1);
      }
    }

    downloadFile(indice:number){
      if(indice != -1){
        var blob = new Blob([this.active_Files[indice].getContent()], {type: "text/plain"});
        var url = window.URL.createObjectURL(blob);
        var ancla = document.createElement("a");
        ancla.download = this.active_Files[indice].getName();
        ancla.href = url;
        ancla.click();
      }
    }

    getFile(fileID:number, isOriginal:boolean):CRL_File|null{
        let fileList:Array<CRL_File> = ((isOriginal)?this.all_Files:this.active_Files);

        for(let index:number=0; index < fileList.length; index++){
            if(fileList[index].getID() == fileID){
                return fileList[index];
            }//puesto que no se aceptan nombres repetidos entonces no hay pena xD y como no implementé que se les pudiera cb los nombres, entonces... xD
            //si se hubiera implementado el cb de nombre, la comparación tendrías que hacer con objeto, puseto que sería el mismo [bueno aunque quizá no, porque otro obj recibiría la ref del original]
            //o en su defecto addle un hash y así no cabría duda alguna en la comparación
        }        

        return null;//pero no se llegará aquí
    }
    //NOTA, aunque ahora por la existencia del ID, la info solo deberías
    //obtenerla del listado que contiene los archivos originales, y usar la
    //lista de activos, indep de cómo la crees, (pienso que si puede funcionar
    //que sea una lista de CRL_File) solo para mostrar los datos al user xD
      //los cb tb solo a la lista original, puesto que los cb directos (los 
      //que app el usuario) ya los tiene app la lista de arch activos, por lo
      //tanto ya solo quedaría applos al archivo original correspondiente

    getAllFiles():Array<CRL_File>{
        return this.all_Files;
    }

    getActiveFiles():Array<CRL_File>{
        return this.active_Files;
    }
}