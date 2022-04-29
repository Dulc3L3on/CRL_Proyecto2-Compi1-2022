import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalContainerComponent } from './global-container.component';
import { WorkspaceModule } from './workspace/workspace.module';
import { ReportSpaceModule } from './report-space/report-space.module';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [
    GlobalContainerComponent,
    MenuBarComponent
  ],
  imports: [
    CommonModule,
    WorkspaceModule,
    ReportSpaceModule
  ],
  exports:[
    GlobalContainerComponent
  ]
})
export class GlobalContainerModule { }
