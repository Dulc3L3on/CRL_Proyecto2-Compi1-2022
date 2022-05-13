import { ContentType } from "../../../Class_Content/ContentType";
import { Result } from "../../Content/Result";
import { BreakPoint } from "./BreakPoint";

export class Continue extends BreakPoint{

    constructor(){
        super();

        this.sentenceName = "CONTINUE";
    }
    
    override exe(): Result {
        return new Result(ContentType.CONTINUE);
    }

}