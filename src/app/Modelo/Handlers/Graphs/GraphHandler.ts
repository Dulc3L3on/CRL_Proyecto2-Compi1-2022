import { Graph } from "./Graph";

export class GraphHandler{   
    private static instance:GraphHandler;

    private graphs:Array<Graph>

    private constructor(){
        this.graphs = new Array<Graph>();
    }

    public static getInstance():GraphHandler{
        if(GraphHandler.instance == null){
            GraphHandler.instance = new GraphHandler();
        }

        console.log("new instance GraphHandler");
        return GraphHandler.instance;
    }

    setInfo(graph:Graph){
        this.graphs.push(graph);
    }
   
    public getGraph(index:number):Graph{
        if(index > -1){
            return this.graphs[index];
        }        
        
        return new Graph("", "");//pero ninca sucederá esto, pues me encargaré de bloquear el botón
    }//método empleado en analizeFile xD

    public getGraphs():Array<Graph>{
        return this.graphs;
    }
    
}