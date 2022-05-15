import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/Services/FileService';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit { 
  texto: string = "'''Type your code here :D'''";

  constructor(public fileService_tb:FileService) { }

  ngOnInit(): void { }

  addFile():void{
    const inputText = document.getElementById('input-file') as HTMLInputElement;
  
    this.addUniqueFile(inputText.value, this.texto);    
  }  

  spreadOutClickFile():void{
    const fileUpLoad = document.getElementById('fileButton') as HTMLInputElement; 
    fileUpLoad.multiple = true;
    
    fileUpLoad.onchange= () =>{ 
        if(fileUpLoad.files != null){          

          for(let actual = 0; actual < fileUpLoad.files!.length; actual++){    
            console.log("Paso#1");    
            this.readFile(fileUpLoad.files[actual]);            
          }
        } 
      //para así enviar la info al contenedor de páginas
      console.log("Paso final");      
    }
    
      fileUpLoad.click(); 
  }

  readFile(file: File): void {
    //this.texto ="Type your code here :D";
    var reader = new FileReader();

    reader.onload = () =>{
      console.log("Paso#3");    
      console.log(reader.result);
      this.texto = reader.result as string;//(reader.result != null)? reader.result as string: "contenido xD"            

      console.log("Paso#4");    
      console.log("[TEXTO]"+this.texto);
      this.addUniqueFile(file.name, this.texto);      
    }

    console.log("Paso#2");    
    reader.readAsText(file, "UTF-8");    
  }

  private addUniqueFile(fileName:string, content:string){
    this.fileService_tb.addFile(fileName, content);
  }

  selectTab(index:number){
    this.fileService_tb.addActiveFile(index);
  } 

}
