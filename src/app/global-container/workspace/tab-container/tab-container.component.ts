import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';
import { TabContainerService } from './tab-container.service';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {    
  @Input() CRL_Active_Files: Array<CRL_File> = new Array();//no debe ser un @Input(), puesto que el índice será el que se reciba y dep del método al que llegue, se hará la respectiva add o eli...
  @Output() closerTab: EventEmitter<number> = new EventEmitter<number>();
  @Input() sizeAdapter: string= "normal";


  constructor(tabContainer: TabContainerService) { }

  ngOnInit(): void { 
   
  }

  getFile(index: number): any{   

    
  }

  showOrHide(isShow: boolean, indice: number){
    console.log('close'+indice);
    document.getElementById('close'+indice)!.style.visibility = (isShow)?"visible":"hidden";
  }

  closeTab(indice: number){//no habrá problemas con los null, pues si no hay pestañas, entonces no hay botón de cerrar xD    
    this.closerTab.emit(indice);
  }//iba a hacer la eliminación aquí, pero puesto que este elemento se volverá a leer después de esto, entonces la modif que haga en el workspace, se correrá hacia aquí xD

}
