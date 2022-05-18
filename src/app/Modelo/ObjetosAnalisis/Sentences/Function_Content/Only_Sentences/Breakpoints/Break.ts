import { ContentType } from "../../../Class_Content/ContentType";
import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Break extends BreakPoint{
    
    constructor(line:number, column:number){
        super(line, column);

        this.sentenceName = "BREAK";
    }

    override exe(): Result {
        console.log("exe (Breakpoint [BREAK])");

        return new Result(ContentType.BREAK, "");
    }//yo diría que con eso basta xD

}