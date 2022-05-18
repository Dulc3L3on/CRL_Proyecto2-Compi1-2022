import { ContentType } from "../../../Class_Content/ContentType";
import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Continue extends BreakPoint{

    constructor(line:number, column:number){
        super(line, column);

        this.sentenceName = "CONTINUE";
    }
    
    override exe(): Result {
        console.log("exe (Breakpoint [CONTINUE])");

        return new Result(ContentType.CONTINUE);
    }

}