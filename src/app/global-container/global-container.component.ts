import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-global-container',
  templateUrl: './global-container.component.html',
  styleUrls: ['./global-container.component.css']
})
export class GlobalContainerComponent implements OnInit {
  seccion: number = 1;

  constructor() { }

  ngOnInit(): void {

  }

  setSelection(seleccion:number){ 
    this.seccion = seleccion;
  }


}
