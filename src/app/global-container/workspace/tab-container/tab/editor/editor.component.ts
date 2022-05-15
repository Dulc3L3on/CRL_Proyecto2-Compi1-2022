import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import { CRL_File } from "src/app/Modelo/CRL_File";
import { FileService } from "src/app/Services/FileService";

@Component({
  selector: "editor",
  templateUrl: './editor.component.html',//height: 455px
  //template: ``,
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements AfterViewInit {
  @Input() ID:number;
  // 3️
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @Input() sizeAdapter: string;

  @Output() changedFile:EventEmitter<CRL_File> = new EventEmitter<CRL_File>();
  line: string;
  column: string;
  aceEditor: any;

  constructor(private fileService_ec:FileService){ }

  // 4️
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    this.aceEditor= ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue(this.fileService_ec.getFile(this.ID, true)!.getContent());//NOTA: Al poner false, a pesar que el cb se halla app a los archivos origniales aún así se obtiene el contenido con los cb aplicados, esto indica que SI, por el hecho que el listado de los archivos activos contiene referencias a los objetos de los archivos originales, entonces lso cb le son appdos xD, pero lo dejaremos en true xD xD
    this.aceEditor.session.setUseSoftTabs(false);
    this.aceEditor.session.setTabSize(4);

    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    this.aceEditor.setTheme('ace/theme/dracula');//dracula :3, nord_dar :0
    this.aceEditor.session.setMode('ace/mode/text');//cb el ace/mode/html, puesto que eso hacía que el editor revisara si el contenido correspondía a HTML xD, y eso no es nec aquí xD

    this.aceEditor.on("change", () => {
      this.setFileChanges();
      this.setUbication(0);
    });//nice

    this.aceEditor.on("mousemove", () => {
      this.setUbication(0);
    });//nice

    //estos ya no nice xD
    this.aceEditor.on("keypress", () => {
      this.setUbication(1);
    });

    this.aceEditor.on("keydown", () => {
      this.setUbication(1);
    });
  }

  setUbication(aditional: number):void{
    //this.line = this.aceEditor.selection.getCursor().getLine();
    var cursorPosition = this.aceEditor.getCursorPosition();
    this.line = cursorPosition.row + 1 + aditional;
    this.column = cursorPosition.column;
  }

  setFileChanges(){
    console.log("text changed! ");
    this.fileService_ec.resetContentOfFile(this.ID, this.aceEditor.getValue());
    console.log("new content [editor]: " + this.fileService_ec.getFile(this.ID, true)!.getContent());
  }
  
}
