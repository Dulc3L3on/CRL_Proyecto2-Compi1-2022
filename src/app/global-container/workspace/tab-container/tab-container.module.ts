import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContainerComponent } from './tab-container.component';
import { TabModule } from './tab/tab.module';
import {MatTabsModule} from '@angular/material/tabs'

@NgModule({
  providers:[
  //no pongo el servicio de tabCOntainer, porque ese debería poder ser accedido desde el globalContainer, puesto que ahí se invocará el método para hacer el seteo de la carga, y así addla a la lista de archivos...    
  ],
  declarations: [
    TabContainerComponent,    
  ],
  imports: [
    CommonModule, 
    TabModule,
    MatTabsModule
  ],
  exports:[
    //quizá podría ser necesario acceder a esto desde un componente más arriba en la jerarquí, que invoque a Tab...
    TabContainerComponent,
    //TabModule//yo diría que no, porque el container es el que se encarga de manejar a este...
  ]
})
export class TabContainerModule { }
