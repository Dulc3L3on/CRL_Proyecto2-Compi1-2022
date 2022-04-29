import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {  
  //@ViewChild('option') optionPressed: ElementRef;
  @Output() senderSelection : EventEmitter<number> = new EventEmitter<number>();
  opcion:number= 1;
  selectedState: string = "selected";
  unselectedState: string = "unselected";

  constructor() { }

  ngOnInit(): void {
  }

  sendSelection(seleccion: number):void{          
    //recuerdo que se podía hacer tb con un eqq de document.getElementById... sin necesidad de JS y añadido aquí directamente, solo que se debía hacer el casteo al elemento correspondiente, que podría provocar un error en tiempo de exe, en caso no corresp, pero no me acuerdo con qué se invocava ese getElement...    
    this.opcion = seleccion;
    this.senderSelection.emit(seleccion);    
  }

}
