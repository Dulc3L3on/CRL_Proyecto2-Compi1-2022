import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Break extends BreakPoint{
    
    override exe(): Result {
        return new Result(ContentType.BREAK, "");
    }//yo diría que con eso basta xD

}