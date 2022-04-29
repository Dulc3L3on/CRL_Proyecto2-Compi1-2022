import { Component, OnInit } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {  
  CRL_Files: CRL_File[];
  //indexOfSelected: number;//no creo que deba setear un valor para cuando no se halla seleccionado algo se transmita eso hacia el tag container y no se modifique el arreglo de las tab activas... puesto que esto es como un evt, entonces no se activa, hasta que se requiere...
  CRL_Active_Files:Array<CRL_File> = new Array();
  sizeType: string = "normal";

  constructor() { }

  ngOnInit(): void {
  }

  receiveFiles(CRL_Files: CRL_File[]){
    this.CRL_Files = CRL_Files;
  }

  receiveActiveFile(indice: number){
    //this.indexOfSelected = indice;

    this.setActiveTabs(indice);
  }

  setActiveTabs(indice: number){
    let esRepetido:boolean = false;

    if(indice != -1){//no tendría que llegar a serlo, puesto que se dispará al exe el evt
      for(let actual: number = 0; actual < this.CRL_Active_Files.length; actual++){        
        if(this.CRL_Active_Files[actual].name == this.CRL_Files[indice].name &&
          this.CRL_Active_Files[actual].content == this.CRL_Files[indice].content){
            esRepetido = true;
            break;
        }                
      } 
      
      if(!esRepetido){
        this.CRL_Active_Files.push(this.CRL_Files[indice]);
      }      
    }   
  }

  deleteTab(indice: number){
    if(indice!= -1){//sé que no sucederpa, puesto que solo podrá cerrar si hay pestañas y el número que se reciba siempre será de 0-n, puesto que se add con el for, pero por si xD
      this.CRL_Active_Files.splice(indice, 1);
    }
  }

  minimaxer(isMax: boolean){
    this.sizeType = ((isMax == true)?"large":"normal");    
  }

}
