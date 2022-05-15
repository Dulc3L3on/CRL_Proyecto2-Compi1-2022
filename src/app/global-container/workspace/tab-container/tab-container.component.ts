import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/Services/FileService';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css']
})
export class TabContainerComponent implements OnInit {      
  @Input() sizeAdapter: string= "normal";  

  constructor(public fileService_tc:FileService){ }//lo hice público con tal que pueda ser accedido desde el .html

  ngOnInit(): void { }

  showOrHide(isShow: boolean, indice: number){
    console.log('close'+indice);
    document.getElementById('close'+indice)!.style.visibility = (isShow)?"visible":"hidden";
  }

  closeTab(indice: number){//no habrá problemas con los null, pues si no hay pestañas, entonces no hay botón de cerrar xD 
    this.fileService_tc.deleteActiveFile(indice);
  }//iba a hacer la eliminación aquí, pero puesto que este elemento se volverá a leer después de esto, entonces la modif que haga en el workspace, se correrá hacia aquí xD    

}
