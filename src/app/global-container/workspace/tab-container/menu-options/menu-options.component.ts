import { INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';
import { CompilationCenter } from 'src/app/Modelo/Ejecucion/CompilationCenter';
import { FileService } from 'src/app/Services/FileService';

@Component({
  selector: 'menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.css']
})
export class MenuOptionsComponent implements OnInit {  
  compilationCenter:CompilationCenter;

  constructor(public fileService_mo:FileService) { }

  ngOnInit(): void { }  

  compile(){
    this.compilationCenter = new CompilationCenter(this.fileService_mo.getAllFiles());    
    let index = (document.getElementById("activeFiles_list") as HTMLSelectElement).selectedIndex;    
    
    let mainFile:CRL_File = this.fileService_mo.getFile(((index == -1)?0:(index-1)), true)!;//esto es para cuando no esté seleccionado archivo alguno, auqnue lo mejor sería activar el btn de compilar hasta que algo estuviera seleccionado    

    console.log("ENTRO AL método compile");    
    console.log("#files: "+this.fileService_mo.getAllFiles());
    console.log("#mainFile: "+(index-1));
    console.log("main file name: "+ mainFile.getName());
    //console.log("new content [mo]: " + this.fileService_mo.getFile(0, true)!.getContent());

    this.compilationCenter.compile(mainFile.getName());
  }


  //debemos hacer que el botón solo esté activo cuando hayan elementos en el array de CRLFiles
  //debemos mostrar un msje cuando el nombre de la clase proporcionada, no corresponda a la
  //que contiene el método MAIN
}
