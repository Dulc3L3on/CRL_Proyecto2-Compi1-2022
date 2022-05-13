import { INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';
import { CompilationCenter } from 'src/app/Modelo/Ejecucion/CompilationCenter';

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.css']
})
export class MenuOptionsComponent implements OnInit {
  @Input() files:Array<CRL_File> = new Array<CRL_File>();
  compilationCenter:CompilationCenter;

  constructor() { }

  ngOnInit(): void {
  }  

  compile(){
    this.compilationCenter = new CompilationCenter(this.files);    
    this.compile();
  }

}
