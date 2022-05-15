import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CRL_File } from 'src/app/Modelo/CRL_File';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  providers: []
})
export class TabComponent implements OnInit {
  @Input() ID_File:number;
  @Input() sizeAdapter: string;  

  constructor() { }

  ngOnInit(): void {
  }

}
