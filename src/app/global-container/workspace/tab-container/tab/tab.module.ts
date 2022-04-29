import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { EditorComponent } from './editor/editor.component';
import { ToolBarModule } from '../../tab-container/tab/tool-bar/tool-bar.module';

@NgModule({
  declarations: [
    TabComponent,
    EditorComponent//seguirá aquí si al editor no llego a addle un module...    
  ],
  imports: [
    CommonModule,
    ToolBarModule    
    //Debo crear un módulo para el editor??
    //o solo me bastará con declarar el componente??
  ],
  exports:[  
    TabComponent    
  ]
})
export class TabModule { }
