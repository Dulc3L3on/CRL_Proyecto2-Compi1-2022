import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  providers: []
})
export class TabComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() sizeAdapter: string;

  constructor() { }

  ngOnInit(): void {
  }

}
