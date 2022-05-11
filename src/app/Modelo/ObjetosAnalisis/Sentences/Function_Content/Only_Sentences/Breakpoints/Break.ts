import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Break extends BreakPoint{
    
    constructor(){
        super();

        this.sentenceName = "BREAK";
    }

    override exe(): Result {
        return new Result(ContentType.BREAK, "");
    }//yo diría que con eso basta xD

}