import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {    
  sizeType: string = "normal";
  
  constructor() { }

  ngOnInit(): void {
  }

  minimaxer(isMax: boolean){
    this.sizeType = ((isMax == true)?"large":"normal");    
  }
}
