//////////////////////[ 0. SETTINGS ]///////////////////////
//[0.1] imports 
%{      
      const {HierarchyStack} = require("../Prev-Ejecucion/HierarchyStack.ts");
      const {ActiveFileHandler} = require("../Handlers/ActiveFileHandler.ts");      
      
      const {Import} = require("../ObjetosAnalisis/Sentences/Class_Content/Import.ts");      
      const {Incertitude} = require("../ObjetosAnalisis/Sentences/Class_Content/Incertitude.ts");

      const {Sentence} = require("../ObjetosAnalisis/Sentences/Sentence.ts");
      //const {Container} = require("../ObjetosAnalisis/Sentences/Container.ts");
      const {GlobalContainer} = require("../ObjetosAnalisis/Sentences/GlobalContainer.ts");      
      const {LocalContainer} = require("../ObjetosAnalisis/Sentences/LocalContainer.ts");
      const {Directive} = require("../ObjetosAnalisis/Sentences/Directive.ts");      

      const {Variable_Declaration} = require("../ObjetosAnalisis/Sentences/Variable_Declaration.ts");
      const {Function} = require("../ObjetosAnalisis/Sentences/Class_Content/Function.ts");

      const {Main} = require("../ObjetosAnalisis/Sentences/Class_Content/Main.ts");
      const {Complex_Function} = require("../ObjetosAnalisis/Sentences/Class_Content/Complex_Function.ts");
      const {Void_Function} = require("../ObjetosAnalisis/Sentences/Class_Content/Void_Function.ts");

      const {Control_Sentence} = require("../ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/Control_Sentence.ts");
      const {If} = require("../ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/If.ts");
      const {Else} = require("../ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/Else.ts");

      const {Loop} = require("../ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/Loop.ts");
      const {For} = require("../ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/For.ts");
      const {While} = require("../ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/While.ts");      

      const {Breakpoint} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/BreakPoint.ts");
      const {Break} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Break.ts");
      const {Continue} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Continue.ts");
      const {Return} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Return.ts");      

      const {Dibujar} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/Dibujar.ts");
      const {DibujarAST} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DibujarAST.ts");
      const {DibujarEXP} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DibujarEXP.ts");
      const {DibujarTS} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DIbujarTS.ts");

      const {Asignacion} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Asignacion.ts");
      const {Mostrar} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Mostrar.ts");

      const {Expresion} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion.ts");
      const {ContentType} = require("../ObjetosAnalisis/Sentences/Class_Content/ContentType.ts");
      const {Invocacion} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Invocacion.ts");      
      const {Variable} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Variable.ts");      
      const {Result} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Result.ts");
      const {OperationHandler} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/OperationHandler.ts");
      const {Operator} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Operator.ts");
      const {OperatorType} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/OperatorType.ts");
      const {OperatorResult} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/OperationResult.ts");
      const {AddResult} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/AddResult.ts");
%}

//[0.2] options
/*%options flex 
         case-sensitive*///probé y no se app lo de flex, es decir no busca la regla con la que haga mayor coincidencia antes de escoger la 1ra que aparezca :C XD
%options case-sensitive         

//[0.3] user code
%{
      let lexer_error= "";      
      let clase = new GlobalContainer();//puesto que aquí se van a setear todos los obj creados
      
      let activeFileHandler = ActiveFileHandler.getInstance();

      let hierarchyStack = new HierarchyStack();
      let isADirective;
      let isAVariableDeclaration;
      let isAList;//Esta es solo para dar un msje más informativo al momento consolear xD el objeto creado

      var varList = [];

   //HEADERS
      function addImport(importClassName){
            if(activeFileHandler.isExistFile(importClassName)){
                  if(!activeFileHandler.isMainFile(importClassName)){
                        console.log("[S] Header content: IMPORT [ "+ importClassName+" ]");
                        clase.addImport(new Import(importClassName));
                  }else{
                        //Se add el error, puesto que el archivo Main no tendría porque poder importarse, ya que eso no impediría que se pudiera invocar el método Main de nuevo, y así provocar un error por quedarse enciclado...
                  }                  
            }else{
                  //Se add el error al manejador de errores, el cual se encarga de llevar el conteo y addlos de una vez a la consola...
            }            
      }

      function addIncertitude(expression){
            //Simplemente se debe crear el obj y addlo al globalContent (lo cual se puede hacer sin problema, pruesto que para que pudiera ser seteada al contenido se hizo que heredara de Directive...), puesto que la revisión profunda [con respecto a la exp], se hace en la clase Incert...
            console.log("[S] Header content: INCERTITUDE "+expression);
            clase.addGlobalContent(new Incertitude(expression));
      }

  //CLASS CONTENT

      function getHierarchy(sangria){
            let lexema = sangria.split("");//sangria.charAt();//si no funciona usa split y "" nada xD
            console.log("[S] Hierarchy [SANGRIA]: "+lexema.length);

            return lexema.length;
      }

      function addClassContent(declaratedVars, theFunction){
            if(theFunction == null){//no reviso si el listado está vacío, porque bien podría ser que el dato que se envió fue el de una declaración, pero que... iba a decir que no contenga vars, pero en ese caso tendría que haber sucedido un error para que llegue vacía la lista...
                  hierarchyStack.reduceStack();//se hace aquí puesto que el for es para add cada var que se colocó en una misma línea de creación

                  for(let index = 0; index < declaratedVars.length; index++){                        
                        declaratedVars[index].setScope(0);
                        console.log("seteo el scope en var global");
                        declaratedVars[index].setFather(clase);
                        clase.addGlobalContent(declaratedVars[index]);
                  }
                  console.log("[S] Class content: VAR DECLARATION");                  
            }else{
                  //la función ya tiene por defecto scope = 0, entonces no hay que hacer eso aquí
                  //tb ya tiene seteado su respectivo padre xD
                  clase.addGlobalContent(theFunction);//que se quede, puesto que encaja con las axn del stack xD                  
                  hierarchyStack.addFunction(theFunction);

                  console.log(theFunction);
                  console.log("[S] Class content: FUNCTION");                  
            }
      }//por la RP que contiene ambos tipos de contenido, se me ocurrió que quizá podría hacer el seteo de cada contenido, por medio de difernetes métodos, además como el proceso de seteo varía, puesto que en uno va directo al padre y en el otro directo a la func que está al ini de la pila o dir a la pila, entonces... xD      

      function addFunctionContent(scope, content){            
            console.log("content ");
            console.log(content);
            console.log("scope "+scope);            

            if(isADirective){           
                  if(isAVariableDeclaration){
                        for(let index = 0; index < content.length; index++){
                              content[index].setScope(scope);
                              console.log("content name: " + content[index].getSentenceName());
                              hierarchyStack.addLocalDirective(content[index]);
                              console.log("[S] Function content: SANGRIA [ directive on "+scope +" level]");
                        }

                        isAVariableDeclaration = false;//sino provocará problemas xD
                  }else{
                        content.setScope(scope);
                        console.log("content name: " + content.getSentenceName());
                        hierarchyStack.addLocalDirective(content);
                        console.log("[S] Function content: SANGRIA [ directive on "+scope +" level]");
                  }                  
            }else{
                  content.setScope(scope);                  
                  console.log("content name: " + content.getSentenceName());
                  hierarchyStack.addLocalContainer(content);
                  console.log("[S] Function content: SANGRIA [ sentence on "+scope +" level]");
            }//no tengo que resetear la var isADirective, puesto que no se va a llegar a la RP que invoca a este método, sin haber caido en la axn que setea esta var xD
      }

      function createVarDeclaration(type, varList, asignatedValue){//Este último puede ser null, puesto que no es obligatorio que especifiquen este valor...
            let declaratedVars = [];//new Array<Variable_Declaration>()
            console.log("list size "+varList.length);

            for(let index = 0; index < varList.length; index++){
                  declaratedVars.push(new Variable_Declaration(type, varList[index], asignatedValue));
            }

            console.log("[S] (G/L) content: DECLARATION [ "+((varList.length>0)?"var list":"var")+((asignatedValue != null)?" + expr":"")+ " ]");
            return declaratedVars;//pongo G/L, puesto que esta se usa para un decl en general, no para un tipo de decl en específico
      }//sin importar que sea G o L, puesto que esto se determina en prod más arriba de la RP en donde se crea el obj xD      

      function createFunction(functionType, returnType, name, params){
            switch(functionType){
                  case "SIMPLE":
                        console.log("[S] Global content: S_FUNCTION [ "+returnType +", " + name + ((params.length>0)?", params":"")+" ]");
                        return new Void_Function(clase, returnType, name, params);
                  case "COMPLEX":
                        console.log("[S] Global content: C_FUNCTION [ "+returnType +", " + name + ((params.length>0)?", params":"")+" ]");
                        return new Complex_Function(clase, returnType, name, params);
                  case "MAIN":
                        console.log("[S] Global content: MAIN [ "+returnType +", "+name+" ]");
                        return new Main(clase);
            }
            return null;//pero nunca se va a caer acá...
      }//LISTO

      function createParam(type, name){
            console.log("[S] Function sub-content: PARAM ["+type+", "+name+"]");
            return new Variable(type, name);
      }      

 //FUNCTION CONTENT

      function createAsignation(name, expr){
            console.log("[S] Function content: ASIGNATION [ "+name+" + expr ]");
            return new Asignacion(name, expr);
      }

   //EXPRESSIONS
      function createExpr_Operation(operationType, left, symbol, right){//ya sea la root o no
            console.log("[S] Function content: EXPR-OPERATION [ "+symbol+" ]");
            return new Expresion(left, createExp_Operator(operationType, symbol), right);
      }//se creó el método solo con tal que no esté así explícito en las axn xD, porque en realidad lo único que se hará aquí es crear el objeto y devolverlo :v xD

      function createExp_Operator(type, symbol){
            switch(symbol){
               //ARITMETIC
                  case "+":
                        return new Operator(type, OperatorType.ADD);
                  case "-":
                        return new Operator(type, OperatorType.MINUS);
                  case "*":
                        return new Operator(type, OperatorType.TIMES);
                  case "/":
                        return new Operator(type, OperatorType.DIV);
                  case "%":
                        return new Operator(type, OperatorType.MOD);
                  case "^":                  
                        return new Operator(type, OperatorType.POW);
               //RELATIONAL
                  case "==":
                        return new Operator(type, OperatorType.EQUALS_TO);
                  case "!=":
                        return new Operator(type, OperatorType.DIFERENT);
                  case ">":
                        return new Operator(type, OperatorType.MORE);
                  case "<":
                        return new Operator(type, OperatorType.LESS);
                  case ">=":
                        return new Operator(type, OperatorType.MORE_EQUALS);
                  case "<=":
                        return new Operator(type, OperatorType.LESS_EQUALS);
                  case "~":
                        return new Operator(type, OperatorType.INCERTITUDE);
               //LOGIC
                  case "&&":
                        return new Operator(type, OperatorType.AND);
                  case "||":
                        return new Operator(type, OperatorType.OR);
                  case "|&":
                        return new Operator(type, OperatorType.XOR);
                  case "!":
                        return new Operator(type, OperatorType.NOT);
                  case "()":
                        return new Operator(type, OperatorType.AGRUP);
            }
            return null; //pero nunca se llegará hasta acá xD
      }

      function createExpr_Value(valueType, content){
            console.log("[S] Function content: EXPR-VALUE [ "+valueType+", "+content+" ]");

            switch(valueType){
                  case "INTEGER"://no lo dejo como number, puesto que si lo hago así, no tendría oportunidad de setear los decimales
                        return new Expresion(null, new Number(content), null);
                  case "DECIMAL":
                        return new Expresion(null, new Number(content), null);//para tratarlo como decimal, es que se hará las respectivas revisiones en la parte de la clase Expresión...                   
                  case "CADENA":
                        return new Expresion(null, new String(content), null);
                  case "BOOLEAN":
                        return new Expresion(null, new Boolean(content), null);
                  case "CHARACTER":
                        return new Expresion(null, new String(content), null);
                  case "VARIABLE":
                        return new Expresion(null, new Variable(null, content, null), null);//para este caso el argu para el valor, en realidad será el nombre xD
            }
            return null;//no se llegará aquí, puesto que el tipo siempre será enviado por mí xD, a lo que voy es que será certero jaja xD
      }//Este se utilizará en las producciones de las expr que corresp a valores no a ops obvi xD     
      //fin de los métodos para expresión

      function createInvocation(invocatedFunction, argumentos){
            console.log("[S] Function content: INVOCATION [ arguments? "+ ((argumentos.length>0)?"T":"F") + " list? "+ isAList+" ]");
            return new Invocacion(invocatedFunction, argumentos);
      }

      function createMostrar(stringBase, argumentos){//simi a los de la func... o yo creo que iguales xD
            console.log("[S] Function content: MOSTRAR [arguments? "+ ((argumentos.length>0)?"T":"F") + "list? "+isAList);
            return new Mostrar(stringBase, argumentos);
      }

      function createDraw_AST(functionName){
            console.log("[S] Function content: DRAW_AST of "+functionName);
            return new DibujarAST(functionName);
      }

      function createDraw_EXP(expression){
            console.log("[S] Function content: DRAW_EXPR");
            return new DibujarEXP(expression);
      }     

      function createDraw_TS(){
            console.log("[S] Function content: DRAW_TS");
            return new DibujarTS();
      }//mejor cree 3 para cada uno, puesto que los tipos de param varían y son algo diferentes xD, pero si no es nec, entonces solo los fusionas y luego les indicas su tipo, para que sepa a que obj crear y poor ello devolver xD

      function createBreakPoint(breakpointType, expr){//solo tendrá valor != null cuando el breakpoint a crear se un return complejo...
            console.log("[S] Function subcontent: BREAKPOINT [ "+breakpointType+((breakpointType == "RETURN" && expr != null)?+"+ expr":""));

            switch(breakpointType){
                  case "RETURN":
                        return new Return(expr);//si es simple pues recibirá null, sino la expr xD, así que NO PROBLEM jaja xD
                  case "CONTINUE":
                        return new Continue();
                  case "BREAK":
                        return new Break();
            }
            return null;//pero no se llegará hasta aquí xD
      }     

      function createFor(variable, condition, incremento){
            console.log("[S] Function content: FOR");
            return new For(variable, condition, ((incremento == "++")?1:-1));
      } 

      function createForVar(variableName, value){//este valor siempre será un entero, por lo que dijo el aux, aunque creo que en os objetos tengo ahí una expr xD
            console.log("[S] Function subcontent: FOR-VAR [ "+variableName+" ]");
            return new Variable(ContentType.INTEGER, variableName, value);
      }

      function createWhile(condition){
            console.log("[S] Function content: WHILE");
            return new While(condition);
      }      

      function createControl_Sentence(expre){//será null cuando la sent a crear sea else xD
            if(expre == null){
                  console.log("[S] Function content: ELSE");
                  return new Else();
            }
            console.log("[S] Function content: IF");
            return new If(expre);
      }                  

      function handleLexerError(lexema){
            lexer_error += lexema;
      }

      function addError(line, column){
            //se setea lo recolectado en el manejador de errores
            console.log("[L] ERROR: " + lexer_error);
            lexer_error = "";//Se limpia la variable, para dejar paso libre a los errores que se vayan a hallar xD            
      }
%}

//////////////////////[ 1. LEXER ]/////////////////////////
%lex

%options ranges

//[1.1] macros 
//generales
//sangria       [\n\t]+
//number        [0-9]+\b
//decimal       {digito}+("."{digito}+)?\b
letra           [a-zA-Z\u00f1\u00d1]      
//blank           [" "" "" "" "]

%s ERROR
%%

//"!!"[^\n]*                                                                  {console.log("[L] comentario: "+ yytext);/*ignore*/}

//\n+                                                                         {console.log("[L] especial: NL"); return 'NEW_LINE';}
//(\n|\r|\v)+                                                                   {console.log("[L] especial: NL"); return 'NEW_LINE';}//esta es la solución para que acepte los |, lo que pasa es que toma al | como si fuera parate del conjunto de estudio, supongo que es por los [], que ahí se colocan listados y por lo tanto NO deben ponerse, a dif de los (), que toman todo como un todo a menos que se les diga que son dif ops xD, o eso es lo que entiendo xD
[\n|\r|\v]+                                                                 {console.log("[L] especial: NL"); return 'NEW_LINE';}

\t+                                                                         {console.log("[L] especial: SANGRIA"); return 'SANGRIA';}

//{blank}+                                                                    {console.log("[L] especial: SANGRIA"); return 'SANGRIA';}

\s                                                                           /*ignored*/

\r                                                                           /*ignored*/

" "                                                                         /*ignored*/

"!!"[^\n]*                                                                  {console.log("[L] S_comentario: "+ yytext);}/*ignored*/

(\'\'\')([^']*)(\'\'\')                                                     {console.log("[L] M_comentario: "+ yytext);}/*ignored*/

//[1.2] ER
//reservadas
"Importar"                                                                  {console.log("[L] reservada: IMPORT"); return 'IMPORT';}
"Incerteza"                                                                 {console.log("[L] reservada: INCERTEZA"); return 'INCERTEZA';}
"Principal"                                                                 {console.log("[L] reservada: PRINCIPAL"); return 'MAIN';}
"Int"                                                                       {console.log("[L] reservada: INT"); return 'INT';}
"Double"                                                                    {console.log("[L] reservada: DOUBLE"); return 'DOUBLE';}
"String"                                                                    {console.log("[L] reservada: STRING"); return 'STRING';}
"Boolean"                                                                   {console.log("[L] reservada: BOOLEAN"); return 'BOOLEAN';}
"Char"                                                                      {console.log("[L] reservada: CHAR"); return 'CHAR';}
"Void"                                                                      {console.log("[L] reservada: VOID"); return 'VOID';}
"Si"                                                                        {console.log("[L] reservada: SI"); return 'SI';}    
"Sino"                                                                      {console.log("[L] reservada: SINO"); return 'SINO';}
"Para"                                                                      {console.log("[L] reservada: PARA"); return 'PARA';}
"Mientras"                                                                  {console.log("[L] reservada: MIENTRAS"); return 'MIENTRAS';}
"Detener"                                                                   {console.log("[L] reservada: DETENER"); return 'DETENER';}
"Continuar"                                                                 {console.log("[L] reservada: CONTINUAR"); return 'CONTINUAR';}
"Mostrar"                                                                   {console.log("[L] reservada: MOSTRAR"); return 'MOSTRAR';}
"DibujarAST"                                                                {console.log("[L] reservada: DRAW_AST"); return 'DRAW_AST';}
"DibujarEXP"                                                                {console.log("[L] reservada: DRAW_EXP"); return 'DRAW_EXP';}
"DibujarTS"                                                                 {console.log("[L] reservada: DRAW_TS"); return 'DRAW_TS';}
"true"                                                                      {console.log("[L] reservada: TRUE"); return 'TRUE';}
"false"                                                                     {console.log("[L] reservada: FALSE"); return 'FALSE';}
"++"                                                                        {console.log("[L] reservada: ++"); return 'INCREMENTO';}
"--"                                                                        {console.log("[L] reservada: --"); return 'INCREMENTO';}
"+"                                                                         {console.log("[L] reservada: +"); return '+';}
"-"                                                                         {console.log("[L] reservada: -"); return '-';}
"*"                                                                         {console.log("[L] reservada: *"); return '*';}
"/"                                                                         {console.log("[L] reservada: /"); return '/';}
"%"                                                                         {console.log("[L] reservada: %"); return '%';}
"^"                                                                         {console.log("[L] reservada: ^"); return '^';}
"=="                                                                        {console.log("[L] reservada: =="); return '==';}
"!="                                                                        {console.log("[L] reservada: !="); return '!=';}
"<="                                                                        {console.log("[L] reservada: <="); return '<=';}
">="                                                                        {console.log("[L] reservada: >="); return '>=';}
"<"                                                                         {console.log("[L] reservada: <"); return '<';}
">"                                                                         {console.log("[L] reservada: >"); return '>';}
"~"                                                                         {console.log("[L] reservada: ~"); return '~';}
"&&"                                                                        {console.log("[L] reservada: &&"); return '&&';}
"||"                                                                        {console.log("[L] reservada: ||"); return 'OR';}
"|&"                                                                        {console.log("[L] reservada: |&"); return 'XOR';}
"!"                                                                         {console.log("[L] reservada: !"); return '!';}
"("                                                                         {console.log("[L] reservada: ("); return '(';}
")"                                                                         {console.log("[L] reservada: )"); return ')';}
":"                                                                         {console.log("[L] reservada: :"); return ':';}
"="                                                                         {console.log("[L] reservada: ="); return '=';}
","                                                                         {console.log("[L] reservada: ,"); return ',';}
";"                                                                         {console.log("[L] reservada: ;"); return ';';}
"Retorno"                                                                   {console.log("[L] reservada: RETORNO"); return 'RETORNO';}
"."                                                                         {console.log("[L] reservada: ."); return '.';}
"crl"                                                                       {console.log("[L] reservada: crl"); return 'CRL';}

(\"[^\"]*\")                                                                {console.log("[L] ER: CADENA "+ (yytext.substring(1, yyleng -1)));
                                                                             yytext = yytext.substring(1, yyleng -1);
                                                                             return 'CADENA';}

//(("$"|{letra})|("_"|"$"|{letra})("_"|"$"|{letra}|[0-9]))+                   {console.log("[L] ER: ID "+console.log(yytext)); return 'ID';}
("_"|"$"|{letra})("_"|"$"|{letra}|[0-9])*                                   {console.log("[L] ER: ID "+console.log(yytext)); return 'ID';}

[0-9]+("."[0-9]+)                                                           {console.log("[L] ER: DEC"); return 'DECIMAL';}
[0-9]+                                                                      {console.log("[L] ER: INT"); return 'INTEGER';}

"'"{letra}|\s"'"                                                            {console.log("[L] ER: CHAR"); return 'CHARACTER';}

<<EOF>>                                                                     {console.log("[L] EOF"); return 'EOF';}
 
<ERROR>\s+                                                                  {addError(yylloc.first_line, yylloc.first_column); this.popState();}//aquí se invoca a la función que se encarga de recisar lo de substring de reservadas xD

[.]                                                                         {handleLexerError(); this.yybegin('ERROR');}//Aquí se debe hacer la concat de los errores     

//me da duda lo de los errores, lo del string y las macros... si no funciona lo de los errores, entonces usa [.]+ para que aśi lo agrupe, según vi en la docu... y si no funciona lo de los string, quizá sea util usar, el string de la docu...

/lex
////////////////[ 1.3. asociatividad y precedencia ]////////////////

%left '+' '-'
%left '*' '/' '%'
%right '^'
%nonassoc UMINUS
%nonassoc '==' '!=' '<' '>' '<=' '>=' '~'
%left OR
%left XOR
%left '&&'
%left '!'
%nonassoc '(' ')'

//////////////////////////[ 2 PARSER ]////////////////////////////

///////////////////////////[ 2.1 start ]//////////////////////////
%start inicio

%%

//////////////////////////[ 3.2 grammar ]////////////////////////
inicio : clase EOF                        { console.log("---Parser process terminated---");
                                            return clase; }
                                           // se hace el return del objeto creado para que pueda setearse en la lista que posee el CompilerCenter...}
       ;

clase : nl class_elements      
      | SANGRIA nl class_elements
      | class_elements
      ;//sangría de por sí sola NO, porque ellos no deben tener nada de ese tipo de espacios!

class_elements : header content                    {console.log("[S] Header + Content");}
               | content                           {console.log("[S] Only Body");}
               ;

header : imports incerteza                {console.log("[S] Header: Import + Incertitude");}
       | imports                          {console.log("[S] Header: Import");}
       | incerteza                        {console.log("[S] Header: Incertitude");}
       ;

imports : imports import                  {console.log("[S] Header: +1 import");}
        | import                          {console.log("[S] Header: 1st import");}
        ;

import : IMPORT ID '.' CRL nl                       {addImport($2);}       
       ;

incerteza : INCERTEZA expression nl                       {addIncertitude($2);}     
          ;

content : content sentences                       {console.log("[S] Content: +1 sentence");}
        | sentences                               {console.log("[S] Content: 1st sentence");}
        ;

sentences : class_content                       {console.log("[S] CLASS- content added");}//La axn se implementará aquí puest aquí ya no habrá oportunidaa de que exista error, eso si, como aún no se qué obtendría el método si null o si al intentar acceder al valor de esa var, por el hecho que hubo un err y no se le seteó algo, vaya a dar erro, quizá por esa razón sea mejor hacer el seteo en el método de la RP de abajito [la que contiene el NL...]
          | function_content                    {console.log("[S] FUN- content added");}
          ;

class_content: class_content_elements nl                    //no se tiene nada por hacer, puseto que el contenido ya se add abajito, al hacerlo así, quiere decir que en caso no hayan colocado NL, esto no afectará a la sentencia que obvi dobi estaba bien formada xD
             ;

class_content_elements : declaracion_var_global                   { addClassContent($1, null); }
                       | declaracion_funcion                      { addClassContent(null, $1); }
                       ;

declaracion_var_global : declaracion_var                     {console.log("[S] ClassC: "+ $1.length +"GLOBAL var created");
                                                              $$ = $1; }
                       ;

declaracion_var : content_type creacion_vars asignation_value                        { console.log("var_list-Dec "+ $2);
                                                                                       $$ = createVarDeclaration($1, $2, $3); }
                | content_type creacion_vars                                         { $$ = createVarDeclaration($1, $2, null); }
                ;

creacion_vars : var_list                        { $$ = $1;
                                                  console.log("var_list-crec "+$$); }
              ;

var_list : var_list ',' ID                      { $1.push($3); 
                                                  $$ = $1;
                                                  console.log("var_list "+$$); }
         | ID                                   { console.log("id-element_list "+$1);
                                                  $$ = [yytext]; }//Aunue tb hubieras podido probar así como lo tenías antes, si se puede ini desde la instaciación [por medio de enviar un argu a los parám xD]
         ;

content_type : INT                        { $$ = ContentType.INTEGER; }
             | DOUBLE                     { $$ = ContentType.DOUBLE; }
             | STRING                     { $$ = ContentType.STRING; }
             | BOOLEAN                    { $$ = ContentType.BOOLEAN; }
             | CHAR                       { $$ = ContentType.CHAR; }
             ;

declaracion_funcion : content_type ID '(' params ')' ':'                      { $$ = createFunction("COMPLEX", $1, $2, $4); }
                    | VOID ID '(' params ')' ':'                              { $$ = createFunction("SIMPLE", $1, $2, $4); }
                    | VOID MAIN '(' ')' ':'                                   { $$ = createFunction("MAIN", $1, $2, []); }
                    ;

params : params_list                        { $$ = $1; }
       |                                    { $$ = []; }
       ;

params_list : params_list ',' param                   { $1.push($3); 
                                                        $$ = $1;
                                                        console.log("param_list "+$$); }
            | param                                   { $$ = [];                                                        
                                                        $$.push($1);
                                                        console.log("element_param_list "+$$); }
            ;
      
param : content_type ID                       { $$ = createParam($1, $2); }
      ;

function_content : SANGRIA function_sentence nl                        { addFunctionContent(getHierarchy($1), $2); }
                 ;

function_sentence : only_sentence                       { isADirective = true;
                                                          $$ = $1; }
                  | loop_sentence                       { isADirective = false;
                                                          $$ = $1; }
                  | control_sentence                    { isADirective = false;
                                                          $$ = $1; }
                  ;

only_sentence : declaracion_var                       { isAVariableDeclaration = true;//Esto lo coloco pues es el único contenido de una función que puede ser una lista, por lo cual debe ser tratado de manera diferente
                                                        $$ = $1; }
              | asignacion_var                        { $$ = $1; }
              | invocacion                            { $$ = $1; }
              | mostrar                               { $$ = $1; }
              | dibujar                               { $$ = $1; }
              | breakpoints                           { $$ = $1; }
              ;//no son acumulados directamente en la pila, sino que se add a la struct contenedora que les corresponde, luego de hacer las revisiones y ajustes correspondientes al tipo de only_sentence xD

asignacion_var : ID asignation_value                        { $$ = createAsignation($1, $2); }
               ;

asignation_value : '=' expression                    { $$ = $2; }
                 ;

expression : expr                         { $$ = $1;
                                            console.log("expresión "+$$); }
           ;

expr : expr '+' expr2                       { $$ = createExpr_Operation(OperatorType.ARITMETIC, $1, $2, $3); }               
     | expr '-' expr2                       { $$ = createExpr_Operation(OperatorType.ARITMETIC, $1, $2, $3); }
     | expr2                                { $$ = $1; }//puesto que hace una de dos cosas, subir el resultado o nada xD, ahora que lo pienso quizá debería subirse xD
     ;

expr2 : expr2 '*' expr3                   { $$ = createExpr_Operation(OperatorType.ARITMETIC, $1, $2, $3); }
      | expr2 '/' expr3                   { $$ = createExpr_Operation(OperatorType.ARITMETIC, $1, $2, $3); }
      | expr2 '%' expr3                   { $$ = createExpr_Operation(OperatorType.ARITMETIC, $1, $2, $3); }
      | expr3                             { $$ = $1; }
      ;

expr3 : expr4 '^' expr3                   { $$ = createExpr_Operation(OperatorType.ARITMETIC, $1,$2, $3); }
      | expr4                             { $$ = $1; }
      ;//puesto que la aso es hacia la derecha

expr4 : '-' expr5   %prec UMINUS                      { let expre = new Expresion(null, 0, null);
                                                        expre.getValue();//puesto que el operate es de acceso privado xD
                                                        $$ = createExpr_Operation(OperatorType.ARITMETIC, expre, $1, $2); }
      | expr5                                         { $$ = $1; }
      ;

expr5 : expr5 '==' expr6                        { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr5 '!=' expr6                        { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr5 '<' expr6                         { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr5 '>' expr6                         { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr5 '<=' expr6                        { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr5 '>=' expr6                        { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr5 '~' expr6                         { $$ = createExpr_Operation(OperatorType.RELATIONAL, $1, $2, $3); }
      | expr6                                   { $$ = $1; }
      ;

expr6 : expr6 OR expr7                        { $$ = createExpr_Operation(OperatorType.LOGIC, $1, $2, $3); }
      | expr7                                   { $$ =  $1; }
      ;

expr7 : expr7 XOR expr8                        { $$ = createExpr_Operation(OperatorType.LOGIC, $1, $2, $3); 
                                                   console.log("XOR "+$2);}
      | expr8                                   { $$ = $1; }
      ;
      
expr8 : expr8 '&&' expr9                        { $$ = createExpr_Operation(OperatorType.LOGIC, $1, $2, $3); }
      | expr9                                   { $$ = $1; }
      ;

expr9 : '!' expr10                        { $$ = createExpr_Operation(OperatorType.LOGIC, null, $2, $3); }
       | expr10                           { $$ = $1; }
       ;

expr10 : INTEGER                    { $$ = createExpr_Value("INTEGER", $1); }
       | DECIMAL                    { $$ = createExpr_Value("DECIMAL", $1); }
       | CADENA                     { $$ = createExpr_Value("CADENA", $1); }
       | booleano                   { $$ = createExpr_Value("BOOLEAN", $1); }
       | CHARACTER                  { $$ = createExpr_Value("CHARACTER", $1); }
       | contenido_var              { $$ = $1; }
       | '(' expr ')'               { $$ = createExpr_Operation(OperatorType.AGRUP, $2, "()", null); }//puesto que en realidad no pertenece a ninguno de los 3 grandes grupos
       ;

booleano : TRUE                     { $$ = $1; }//también hubieramos podido crear el value desde aquí y ya solo enviarlo a la RP que invoca a "booleano" de arribita, pero para que todo se vea igual xD
         | FALSE                    { $$ = $1; }
         ;      

contenido_var : ID                  { $$ = createExpr_Value("VARIABLE", $1); }
              | invocacion          { $1.setIsOnlyInvocated(false);//puesto que si vino aquí, pues no lo es xD
                                      $$ = $1; }
              ;

invocacion : ID '(' argumentos ')'                    { $$ = createInvocation($1, $3); }
           | ID '(' ')'                               { $$ = createInvocation($1, []); }
           ;

mostrar : MOSTRAR '(' CADENA contenido_asignacion ')'                   { $$ = createMostrar($3, $4); }
        ;

contenido_asignacion : ',' argumentos                       { $$ = $2; }
                     |                                      { $$ = []; }
                     ;

argumentos : argumentos ',' expression                      { $1.push($3); 
                                                              $$ = $1; 
                                                              console.log("argu_list "+$$);
                                                              isAList = true; }//la verdad no estoy segura que deba ser $1, en todo caso si prefiriría crear una lista aparte para que aquí solo se seteen los datos...
           | expression                                     { $$ = [];
                                                              $$.push($1);
                                                              console.log("element_argu_list "+$$);
                                                              isAList = false; }
           ;

dibujar : DRAW_AST '(' ID ')'                   { $$ = createDraw_AST($3); }
        | DRAW_EXP '(' expression ')'           { $$ = createDraw_EXP($3); }
        | DRAW_TS '(' ')'                       { $$ = createDraw_TS(); }
        ;

breakpoints : RETORNO                      { $$ = createBreakPoint("RETURN", null); }
            | RETORNO expression           { $$ = createBreakPoint("RETURN", $2); }
            | CONTINUAR                   { $$ = createBreakPoint("CONTINUE", null); }
            | DETENER                     { $$ = createBreakPoint("BREAK", null); }
            ;

loop_sentence : PARA '(' for_var ';' expression ';' INCREMENTO ')' ':'                    { $$ = createFor($3, $5, $7); }
              | MIENTRAS '(' expression ')' ':'                                      { $$ = createWhile($3); }
              ;

for_var : INT ID '=' INTEGER                      { $$ = createForVar($2, $4); }
        ;

control_sentence : SI '(' expression ')' ':'                      { $$ = createControl_Sentence($3); }
                 | SINO ':'                                       { $$ = createControl_Sentence(null); }
                 ;

nl : nl NEW_LINE
   | NEW_LINE
   ;//Agregué esta RP, puesto que por cada aparición de comentario, un grupo NL es agregado, lo cual provocaría errores, aún cuando no deberían existir