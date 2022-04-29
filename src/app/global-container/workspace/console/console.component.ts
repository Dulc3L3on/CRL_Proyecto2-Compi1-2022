import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  isHide: boolean = false;
  @Output() minimaxer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  hide(hidden: boolean){
    this.isHide = hidden;

    if(hidden){
      document.getElementById('content')!.style.height="40px";
      document.getElementById('title')!.style.marginTop="104px";      
      /*document.getElementById('host')!.style.marginTop="104px";   
      document.getElementById('host')!.style.height="116px";*/
    }else{
      document.getElementById('content')!.style.height="143px";
      document.getElementById('title')!.style.marginTop="0px";
      /*document.getElementById('host')!.style.marginTop="0px"; 
      document.getElementById('host')!.style.height="220px";*/
    }

    this.minimaxer.emit(hidden);
  }

}
