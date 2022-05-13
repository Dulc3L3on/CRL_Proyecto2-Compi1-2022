import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {
  //filesName = [""];
  @Output() senderSelectedFile: EventEmitter<number> = new EventEmitter<number>();
  @Output() senderFiles : EventEmitter<Array<CRL_File>> = new EventEmitter<Array<CRL_File>>();
  CRL_files: Array<CRL_File> = new Array<CRL_File>();
  texto: string = "'''Type your code here :D'''";

  constructor() { }

  ngOnInit(): void {
  }

  addFile():void{
    const inputText = document.getElementById('input-file') as HTMLInputElement;
  
    this.addUniqueFile(inputText.value, this.texto);    

    //para así enviar la info al contenedor de páginas
    this.sendCRLFiles();
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
      this.sendCRLFiles();
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
    if(this.ensureUniqueness(fileName)){
      this.CRL_files.push(new CRL_File(fileName, content));  
    }
  }

  private ensureUniqueness(fileName:string){
    for(let index:number = 0; index < this.CRL_files.length; index++)
        if(this.CRL_files[index].getName() == fileName){
          return false;
        }    
    return true;
  }

  selectTab(index:number){
    this.senderSelectedFile.emit(index);
  }

  sendCRLFiles(){
    this.senderFiles.emit(this.CRL_files);
  }

}
