import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Continue extends BreakPoint{
    
    override exe(): Result {
        return new Result(ContentType.CONTINUE);
    }

}