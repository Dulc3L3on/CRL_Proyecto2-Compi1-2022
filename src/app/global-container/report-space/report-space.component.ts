import { Component, OnInit } from '@angular/core';
import { graphviz } from 'd3-graphviz';
import { GraphHandler } from 'src/app/Modelo/Handlers/Graphs/GraphHandler';

@Component({
  selector: 'app-report-space',
  templateUrl: './report-space.component.html',
  styleUrls: ['./report-space.component.css']
})
export class ReportSpaceComponent implements OnInit {
  public graphHandler:GraphHandler;


  constructor() { 
    this.graphHandler = GraphHandler.getInstance();

  }

  ngOnInit(): void {
  }

  showGraphs(){
    let index = (document.getElementById("graphs") as HTMLSelectElement).selectedIndex;   
    graphviz("#graph").renderDot(this.graphHandler.getGraph(index)!.getContent());
  }

}
