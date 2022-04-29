import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleComponent } from './console/console.component';
import { TabContainerModule } from './tab-container/tab-container.module';
import { WorkspaceComponent } from './workspace.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';

@NgModule({
  declarations: [   
    WorkspaceComponent,
    ConsoleComponent,
    TabBarComponent          
  ],
  imports: [
    CommonModule,
    TabContainerModule
  ],
  exports:[
    //tendría que ad el módulo de tab?? yo digo que sí xD
    WorkspaceComponent,
    //TabContainerModule//jsjs, luego de resolver el error que Angular detectó por falta de una exportación, no se si es porque en realidad se confunció o poque ahora ya tiene lo que necesitaba, pero después que la compilación pase con éxito, puedo comentar el/los export que add para resolver el problema, sin volver a provocarlo xD
  ]

})
export class WorkspaceModule { }
