import { Container } from "../../Container";
import { GlobalContainer } from "../../GlobalContainer";
import { LocalContainer } from "../../LocalContainer";
import { Caster, type_equivalence } from "./Caster";
import { Invocacion } from "./Invocacion";
import { OperationHandler } from "./OperationHandler";
import { OperationResult } from "./OperationResult";
import { Operator } from "./Operator";
import { Result } from "./Result";
import { Variable } from "./Variable";
import { ContentType } from "../../Class_Content/ContentType";
import { OperatorType } from "./OperatorType";
import { Incertitude } from "../../Class_Content/Incertitude";
import { ErrorHandler } from "src/app/Modelo/Handlers/ErrorHandler";
import { Error } from "src/app/Modelo/Tool/Error/Error";
import { ErrorMessage } from "src/app/Modelo/Tool/Error/ErrorMessage";
import { ErrorType } from "src/app/Modelo/Tool/Error/ErrorType";
import { SourceLocation } from "src/app/Modelo/Tool/SourceLocation";

export class Expresion{//no la hago genérica, puesto que no se hará una clase de la que hereden todos para que así al nec un obj de expre, se envíe a los diamantes dicha clase Padre...
    sentenceName:string;
    father:Container;//no sé por qué no hice que heradara de directiva... lo que no tendría es el método exe, pero lo demás si...
    
    left:Expresion|null;
    content:any;
    right:Expresion|null;
    operationResult:OperationResult;

    operationHandler:OperationHandler;    
    caster:Caster;    
    errorHandler:ErrorHandler;
    
    sourceLocation:SourceLocation;//no se si se pueda setear la línea y col, yo diría que sí, porque expresiones no se crean, lo que se setean son los OperationResult xD

    constructor(line:number, column:number, left:Expresion|null, content:any, right:Expresion|null){
        this.left = left;
        this.content = content;//puede ser un Operator o un valor primitivo...
        this.right = right;

        this.caster = new Caster();
        this.operationHandler= new OperationHandler();
        this.errorHandler = ErrorHandler.getInstance();

        this.sentenceName = "EXPRESION";        

        this.sourceLocation = new SourceLocation(line, column);
    }//en el caso de las expresiones que corresp a valores netos, los hijos serán null...
    
    setFather(father:Container){
        this.setFather_Intern(this, father);
    }

    private setFather_Intern(expresion:Expresion|null, father:Container){
        if(expresion != null){
            expresion.setFather_Intern(expresion.getLeftChild(), father);
            expresion.setFather_Intern(expresion.getRightChild(), father);

            expresion.father = father;
        }
    }//puesto que para sino solo la expresión más externa tendría conociemiento de su progenitors. El intern lo coloqué porque setea el padre de las expr más adentro y porque solo deberá poder accederse a este método desde aquí dentro xD

    getValue():Result{
        this.operate(this);

        console.log("getValue() " );
        console.log(this.operationResult.getCompleteResult());
        return this.operationResult.getCompleteResult();    
    }//puedo hacer esto, ya que el obj por el cual se exe este método siempre será la raíz, entonces NO PROBLEM! xD

    private operate(expresion:Expresion|null){
        if(expresion != null){
            expresion.operate(expresion.getLeftChild());
            expresion.operate(expresion.getRightChild());

            expresion.obtainResult();
        }
    }//like as postOrder route

    private obtainResult(){
        console.log("[Expresion] content: "+this.content);        

        if(this.content instanceof Number && this.caster.isADecimal(this.content as number)){//de primero el double por la rev de los deci...
            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(ContentType.DOUBLE, this.content as Number));            
        }else if(this.content instanceof Number){//Debes revisar cómo le hiciste en la practica1, para extraer los decimales de un número double...
            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(ContentType.INTEGER, this.content as Number));            
        }else if(this.content instanceof String && (this.content as String).length == 1){
            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(ContentType.CHAR, this.content as String));            
        }else if((this.content == true || this.content == false)){
            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(ContentType.BOOLEAN, this.content as Boolean));
        }else if(this.content instanceof String){//Debes ver cómo manejar los char...
            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(ContentType.STRING, this.content as String));
        }else if(this.content instanceof Variable){
            let result:Result = this.father.findVariable((this.content as Variable).getName());

            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(result.getType(), result.getValue()));
        } else if(this.content instanceof Invocacion){            
            let invocation:Invocacion = this.content as Invocacion;
            invocation.setFather(this.father);
            let result:Result = invocation.exe();//sale mejor que se repita esta axn a provocar errores y hacer el proceso más largo...

            if(result.getType() == ContentType.NOTHING){//se add un error (a parte del que dará cuando intente operar con el result de tipo incorrecto)cuando el tipo == NOTHING [puesto que para ERR, no tendría reportar otro ERR xD]
                this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.VOID_FUNCTION_INVOCATED_ON_EXPR,
                    this.sourceLocation, this.sentenceName, this.father.getSentenceName()));        
            }//no creo que sea nec colocar el tipo cuando sea nothing como error, puesto que esto se considera en la tabla de tipos...            

            this.operationResult = new OperationResult(OperatorType.VALUE, new Result(result.getType(), result.getValue()));
        }else{
            //Si se llega aquí es porque corrsp a un operador        
            this.operationResult = this.operateExpresion();    
        }        
    }

    private operateExpresion():OperationResult{        
        if((this.content as Operator).getType() == OperatorType.LOGIC 
        || (this.content as Operator).getType() == OperatorType.RELATIONAL){
            return this.realizeCondition((this.content as Operator).getType());
        }else if((this.content as Operator).getType() == OperatorType.ARITMETIC){
            return this.realizeOperation();
        }
        //si se llega a este punto es un hecho que son los ()
        return this.agrupateExpressions();
    }

    private agrupateExpressions():OperationResult{
        return this.left!.getOperationResult();
    }//sea que tenga almacenado ERROR o no, lo único que debe hacer los () es subir este dato y hacer que desde la gramática se cb el orden de operar

    private realizeCondition(operatorType:OperatorType):OperationResult{
        if(operatorType == OperatorType.RELATIONAL){
            return this.relationalEvaluation();
        }
        return this.logicEvaluation();
    }

    private relationalEvaluation():OperationResult{
        if((this.left!.getOperationResultType() == this.right!.getOperationResultType()) && this.left!.getOperationResultType() != ContentType.ERROR){
            switch(this.content.getOperator()){
                case OperatorType.EQUALS_TO:
                    return new OperationResult(OperatorType.CONDITIONAL ,new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() == this.right!.getOperationResultValue())));//hasta donde sé typscript no tiene restricc de valores a los que se les puede app los operadores relacionales...
                case OperatorType.DIFERENT:
                    return new OperationResult(OperatorType.CONDITIONAL , new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() != this.right!.getOperationResultValue())));
                case OperatorType.MORE:
                    return new OperationResult(OperatorType.CONDITIONAL , new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() > this.right!.getOperationResultValue())));
                case OperatorType.LESS:
                    return new OperationResult(OperatorType.CONDITIONAL , new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() < this.right!.getOperationResultValue())));
                case OperatorType.MORE_EQUALS:
                    return new OperationResult(OperatorType.CONDITIONAL , new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() >= this.right!.getOperationResultValue())));
                case OperatorType.LESS_EQUALS:
                    return new OperationResult(OperatorType.CONDITIONAL , new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() <= this.right!.getOperationResultValue())));                    
                case OperatorType.INCERTITUDE:
                    let resultType:ContentType = type_equivalence[this.left!.getOperationResultType()][this.right!.getOperationResultType()];
                    return this.incertitudeCalculus(resultType);
            }
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.EXPRESSION_WITH_ERRORS,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));        
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "Imposible to analize expretions with errors"));
    }

    private incertitudeCalculus(resultType:ContentType):OperationResult{
        let incertitudResult:Result = this.getIncertitude();
        console.log("incertitude analisis -init-");

        if(resultType == ContentType.INTEGER){
            if(Math.abs(this.caster.getInteger(this.left!.getResult()).getValue() - this.caster.getInteger(this.right!.getResult()).getValue())
            <= (incertitudResult.getValue() as number)){
                console.log("incertitude analisis [I]: true");
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, true));
            }else{
                console.log("incertitude analisis [I]: false");
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, false));
            }
        }if(resultType == ContentType.DOUBLE){
            if(Math.abs(this.caster.getDouble(this.left!.getResult()).getValue() - this.caster.getDouble(this.right!.getResult()).getValue())
            <= (incertitudResult.getValue() as number)){
                console.log("incertitude analisis [D]: true");
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, true));
            }else{
                console.log("incertitude analisis [D]: false");
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, false));
            }
        }else if(resultType == ContentType.STRING){
            let stringLeft:string = (this.caster.getString(this.left!.getResult()).getValue() as string).trim().toLowerCase();
            let stringRight:string = (this.caster.getString(this.right!.getResult()).getValue() as string).trim().toLowerCase();
    
            if(stringLeft == stringRight){
                console.log("incertitude analisis [S]: true");
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, true));
            }else{
                console.log("incertitude analisis [S]: false");
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, false));
            }
        }

        console.log("incertitude analisis: error");
        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.INCORRECT_INCERTITUDE_VALUE,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName())); 
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "The incertitude only can be aplicate on numbers and STRINGs"));        
    }

    private getIncertitude():Result{
        let globalContainer:GlobalContainer = this.getGlobalContainer(this.father);
        let index:number = globalContainer.getTAS().findVariable(Incertitude.incertitudeVarName);//siempre va a existir
        
        return globalContainer.getTAS().getVariable(index).getContent();
    }

    private getGlobalContainer(container:Container):GlobalContainer{
        if(!(container instanceof GlobalContainer)){//esto puede hacerese porque fijo fijo, habrá un global container englobando a todos los container locales xD
            return this.getGlobalContainer((container as LocalContainer).getFather());
        }
        return container as GlobalContainer;
    }

    private logicEvaluation():OperationResult{
        if(this.content.getOperator() == OperatorType.NOT){//vamos a acordar que cuando sea NOT, se va a setear únicamente el Right, con tal que las ramas del árbol de abajo no se pierdan y no hayan confusiones...
            if(this.right!.getOperationResultType() == ContentType.BOOLEAN){
                return new OperationResult(OperatorType.CONDITIONAL, new Result (ContentType.BOOLEAN, (!this.right!.getOperationResultValue())));
            }else{

                this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.INCORRECT_NEGATED_VALUE,
                    this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
                return new OperationResult(OperatorType.CONDITIONAL, new Result(ContentType.ERROR, "Cannot negate values isn't be BOOLEAN"));
            }
        }else{
            if(type_equivalence[this.left!.getOperationResultType()][this.right!.getOperationResultType()] == ContentType.BOOLEAN){
                switch(this.content.getOperator()){
                    case OperatorType.AND:
                        return new OperationResult( OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() && this.right!.getOperationResultValue())));//hasta donde sé typscript no tiene restricc de valores a los que se les puede app los operadores relacionales...
                    case OperatorType.OR:
                        return new OperationResult( OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() || this.right!.getOperationResultValue())));
                    case OperatorType.XOR:
                        return new OperationResult( OperatorType.CONDITIONAL, new Result(ContentType.BOOLEAN, (this.left!.getOperationResultValue() != this.right!.getOperationResultValue())));//si da error en tiempo de exe, entonces susti esto por (a || b) && !(a && b)
                }
            }         
            
            this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.BOOLEAN_PART_REQUIRED,
                this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
            return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "A logical expression needs both parts to be boolean"));
        }
    }

    private realizeOperation():OperationResult{//aritméticas, y tb la concat...
        if(this.content.getOperator() == OperatorType.ADD){
            return this.operationHandler.evaluateAddOperator(this.left!, this.right!);
        }else{           
            switch(this.content.getOperator()){
                case OperatorType.MINUS://Aqúi tb va a entrar lo del UMINUS...                    
                    return this.operationHandler.evaluateMinusOperator(this.left!, this.right!);
                case OperatorType.TIMES:
                    return this.operationHandler.evaluateTimesOperator(this.left!, this.right!);
                case OperatorType.DIV:
                    return this.operationHandler.evaluateDivOperator(this.left!, this.right!);
                case OperatorType.MOD:
                    return this.operationHandler.evaluateModOperator(this.left!, this.right!);
                case OperatorType.POW:
                    return this.operationHandler.evaluatePowOperator(this.left!, this.right!);
            }//vamos a acordar que cuando sea NOT, se va a setear únicamente el Right, con tal que las ramas del árbol de abajo no se pierdan y no hayan confusiones...                                 
        }

        this.errorHandler.addMessage(new Error(ErrorType.SEMANTIC, ErrorMessage.EXPRESSION_PART_WITH_ERRORS,
            this.sourceLocation, this.sentenceName, this.father.getSentenceName()));
        return new OperationResult(OperatorType.ERROR, new Result(ContentType.ERROR, "One or more expresions with errors, impossible to operate"));
    }//se supone que si se llegó hasta aquí es porque no surgió error alguno al momento de hacer la evaluación sintáctica...
  
    getSentenceName():string{
        return this.sentenceName;
    }//si me da problemas al momento de ir recorriendo los obj para graficar HAZ QUE HEREDE DE DIRECTIVE!!!, hasta podría tener imple el método de exe, que es lo único que no utilizaría en caso siguiera igual, siendo una sustitución del nombre que tiene el método actual de getValue()...

    getOperationResult():OperationResult{
        return this.operationResult;
    }

    getOperationType():OperatorType{
        return this.operationResult.getOperation();
    }

    getResult(){
        return this.operationResult.getCompleteResult();
    }

    getOperationResultType():ContentType{
        return this.operationResult.getType();
    }

    getOperationResultValue():any{
        return this.operationResult.getValue();
    }

    getLeftChild():Expresion|null{
        return this.left;
    }

    getRightChild():Expresion|null{
        return this.right;
    }

    //este método se exe desde la raíz, se deberá recorrer en inorder
    //y se sabrá que los hijos siempre devolverán un valor con el cuañ
    //trabajar, deplano que será un Result, pero debo ver cómo hacer eso
    //puesto que en el caso de los centros al decir get value, el result se
    //Debe obtener de la op de él y los hijos
        //Deplano que lo que se hará es que al exe getValue en el nodo
        //de expr en cuestión, revisará el tipo
            //si corresponde a un primitivo, simplemente el result obtendrá
            //el valor del nodo
            //Si es una invocación, entonces el valor que devuelva el método
            //exe de la misma
            //si es un operador, entonces asignará al rsult el resultado
            //Que se genere al operar los hijos según el operador que sea



//una expresión va a tener contenido, o sea el nodo
//va a ser un objeto que tenga hijos, izq, der y centro
//qye van a ser tipo expresión
    //primitiva -> typo = tipo; contenido
    //var -> tipo = var; contenido = nombreVar
    //invoc -> "invocacion"; contenido = línea invocación
    
}//será utilizado para representar tanto ops arit como condis, como concat
//Es decir todas las formas posibles de contenido será rep aquí como un árbol...