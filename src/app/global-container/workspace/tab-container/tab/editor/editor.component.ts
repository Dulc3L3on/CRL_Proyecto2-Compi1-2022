import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import * as ace from "ace-builds";

@Component({
  selector: "editor",
  templateUrl: './editor.component.html',//height: 455px
  //template: ``,
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements AfterViewInit {
  @Input() content: string;
  // 3️
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @Input() sizeAdapter: string;
  line: string;
  column: string;
  aceEditor: any;

  // 4️
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
     this.aceEditor= ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue(this.content);

    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');

    this.aceEditor.setTheme('ace/theme/dracula');//dracula :3, nord_dar :0
    this.aceEditor.session.setMode('ace/mode/html');

    this.aceEditor.on("change", () => {
      //console.log(this.aceEditor.getValue());

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
  
}
