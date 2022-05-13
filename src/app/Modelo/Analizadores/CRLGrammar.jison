//////////////////////[ 0. SETTINGS ]///////////////////////
//[0.1] imports 
%{      
      const {HierarchyStack} = require("../Prev-Ejecucion/HierarchyStack.ts");
      const {ActiveFileHandler} = require("../Handlers/ActiveFileHandler.ts");      

      const {GlobalContainer} = require("../ObjetosAnalisis/Sentences/GlobalContainer.ts");
      const {Import} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Import.ts");      
      const {Incertitude} = require("../ObjetosAnalisis/Incertitude.ts");
      const {Sentence} = require("../ObjetosAnalisis/Sentences/Sentence.ts");
      const {ContentType} = require("../ObjetosAnalisis/Sentences/Class_Content/ContentType.ts");

      const {Variable_Declaration} = require("../ObjetosAnalisis/Sentences/Variable_Declaration.ts");

      const {Function} = require("../ObjetosAnalisis/Sentences/Class_Content/Function.ts");
      const {Main} = require("../ObjetosAnalisis/Sentences/Class_Content/Main.ts");
      const {Complex_Function} = require("../ObjetosAnalisis/Sentences/Class_Content/Complex_Function.ts");
      const {Void_Function} = require("../ObjetosAnalisis/Sentences/Class_Content/Void_Function.ts");

      const {Asignacion} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Asignacion.ts");
      const {Variable} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Variable.ts");
      const {Expresion} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Expresion.ts");
      const {Operator} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Operator.ts");
      const {OperatorType} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/OperatorType.ts");
      
      const {Invocacion} = require("../ObjetosAnalisis/Sentences/Function_Content/Content/Invocacion.ts");      
      
      const {Mostrar} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Mostrar.ts");

      const {DibujarAST} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DibujarAST.ts");
      const {DibujarEXP} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DibujarEXP.ts");
      const {DibujarTS} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Dibujar/DIbujarTS.ts");

      const {Breakpoint} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/BreakPoint.ts");
      const {Break} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Break.ts");
      const {Continue} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Continue.ts");
      const {Return} = require("../ObjetosAnalisis/Sentences/Function_Content/Only_Sentences/Breakpoints/Return.ts");

      const {For} = require("../ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/For.ts");
      const {While} = require("../ObjetosAnalisis/Sentences/Function_Content/Loops_Sentences/While.ts");

      const {If} = require("../ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/If.ts");
      const {Else} = require("../ObjetosAnalisis/Sentences/Function_Content/Control_Sentences/Else.ts");
%}

//[0.2] options
%options flex 
         case-sensitive
//%options case-sensitive
         

//[0.3] user code
%{
      let lexer_error= "";      
      let clase = new GlobalContainer();//puesto que aquí se van a setear todos los obj creados
      
      let activeFileHandler = ActiveFileHandler.getInstance();

      let hierarchyStack = new HierarchyStack();
      let isADirective;

   //HEADERS
      function addImport(importClassName){
            if(activeFileHandler.isExistFile(importClassName)){
                  if(!activeFileHandler.isMainFile(importClassName)){
                        console.log("import: "+ importClassName+" added");
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
            console.log("incertitude added");
            clase.addGlobalContent(new Incertitude(expresion));
      }

  //CLASS CONTENT

      function getHierarchy(){
            //falta implementar

            return 1;
      }

      function addClassContent(declaratedVars, theFunction){
            if(theFunction == null){//no reviso si el listado está vacío, porque bien podría ser que el dato que se envió fue el de una declaración, pero que... iba a decir que no contenga vars, pero en ese caso tendría que haber sucedido un error para que llegue vacía la lista...
                  hierarchyStack.reduceStack();//se hace aquí puesto que el for es para add cada var que se colocó en una misma línea de creación

                  for(let index = 0; index < declaratedVars.lenght; index++){                        
                        declaratedVars[index].setScope(0);
                        declaratedVars[index].setFather(clase);
                        clase.addGlobalContent(declaratedVars[index]);
                  }
            }else{
                  //la función ya tiene por defecto scope = 0, entonces no hay que hacer eso aquí
                  //tb ya tiene seteado su respectivo padre xD
                  clase.addGlobalContent(theFunction);//que se quede, puesto que encaja con las axn del stack xD
                  hierarchyStack.addFunction(theFunction);
            }
      }//por la RP que contiene ambos tipos de contenido, se me ocurrió que quizá podría hacer el seteo de cada contenido, por medio de difernetes métodos, además como el proceso de seteo varía, puesto que en uno va directo al padre y en el otro directo a la func que está al ini de la pila o dir a la pila, entonces... xD      

      function addFunctionContent(scope, content){
            content.setScope(scope);

            if(isADirective){
                  hierarchyStack.addLocalDirective(content);
            }else{
                  hierarchyStack.addLocalContainer(content);
            }//no tengo que resetear la var isADirective, puesto que no se va a llegar a la RP que invoca a este método, sin haber caido en la axn que setea esta var xD
      }

      function createVarDeclaration(type, varList, asignatedValue){//Este último puede ser null, puesto que no es obligatorio que especifiquen este valor...
            let declaratedVars = new Array<Variable_Declaration>();

            for(let index = 0; index < varList.lenght; index++){
                  declaratedVars.push(type, varlist[index], asignatedValue);
            }
            return declaratedVars;
      }//sin importar que sea G o L, puesto que esto se determina en prod más arriba de la RP en donde se crea el obj xD      

      function createFunction(functionType, returnType, name, params){
            switch(functionType){
                  "SIMPLE":
                        return new Void_Function(clase, returnType, name, params);
                  "COMPLEX":
                        return new Complex_Function(clase, returnType, name, params);
                  "MAIN":
                        return new Void_Function(clase);
            }
            return null;//pero nunca se va a caer acá...
      }//LISTO

      function createParam(type, name){
            return new Variable(type, name);
      }      

 //FUNCTION CONTENT

      function createAsignation(name, expr){
            return new Asignacion(name, expr);
      }

   //EXPRESSIONS
      function createExpr_Operation(operationType, left, symbol, right){//ya sea la root o no
            return new Expression(left, createExp_Operator(operationType, symbol), right);
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

      function createExp_Value(valueType, content){
            switch(valueType){
                  "INTEGER"//no lo dejo como number, puesto que si lo hago así, no tendría oportunidad de setear los decimales
                        return new Expresion(null, new Number(content), null);
                  "DECIMAL"
                        return new Expresion(null, new Number(content), null);//para tratarlo como decimal, es que se hará las respectivas revisiones en la parte de la clase Expresión...                   
                  "CADENA"
                        return new Expresion(null, new String(content), null);
                  "BOOLEAN"
                        return new Expresion(null, new Boolean(content), null);
                  "CHARACTER"
                        return new Expresion(null, new String(content), null);
                  "VARIABLE"
                        return new Expresion(null, new Variable(null, content, null), null);//para este caso el argu para el valor, en realidad será el nombre xD
            }
            return null;//no se llegará aquí, puesto que el tipo siempre será enviado por mí xD, a lo que voy es que será certero jaja xD
      }//Este se utilizará en las producciones de las expr que corresp a valores no a ops obvi xD     
      //fin de los métodos para expresión

      function createInvocation(invocatedFunction, argumentos){
            return new Invocacion(invocatedFunction, argumentos);
      }

      function createMostrar(stringBase, argumentos){//simi a los de la func... o yo creo que iguales xD
            return new Mostrar(stringBase, argumentos);
      }

      function createDraw_AST(functionName){
            return new DibujarAST(functionName);
      }

      function createDraw_EXP(expression){
            return new DibujarEXP(expression);
      }     

      function createDraw_TS(){
            return new DibujarTS();
      }//mejor cree 3 para cada uno, puesto que los tipos de param varían y son algo diferentes xD, pero si no es nec, entonces solo los fusionas y luego les indicas su tipo, para que sepa a que obj crear y poor ello devolver xD

      function createBreakPoint(breakpointType, expr){//solo tendrá valor != null cuando el breakpoint a crear se un return complejo...
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
            return new For(variable, condition, incremento);
      } 

      function createForVar(variableName, value){//este valor siempre será un entero, por lo que dijo el aux, aunque creo que en os objetos tengo ahí una expr xD
            return new Variable(ContentType.INTEGER, variableName, value);
      }

      function createWhile(condition){
            return new While(condition);
      }      

      function createControl_Sentence(expre){//será null cuando la sent a crear sea else xD
            if(expre == null){
                  return new Else();
            }
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


//[1.1] macros 
//generales
//sangria       [\n\t]+
//number        [0-9]+\b
//decimal       {digito}+("."{digito}+)?\b
letra           [a-zA-Z\u00f1\u00d1]          

%x COMMENT
%s SSTRING ERROR
%%

//[1.2] ER
//reservadas
"Importar"                                                                  {console.log("[L] reservada: IMPORT"); return 'IMPORT';}
"Incerteza"                                                                 {console.log("[L] reservada: INCERT"); return 'INCERTEZA';}
"Principal"                                                                 {console.log("[L] reservada: PRINCI"); return 'MAIN';}
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
"DibujarTS"                                                                 {console.log("[L] reservada: DRAW_ES"); return 'DRAW_TS';}
"true"                                                                      {console.log("[L] reservada: TRUE"); return 'TRUE';}
"false"                                                                     {console.log("[L] reservada: FALSE"); return 'FALSE';}
"+"                                                                         {console.log("[L] reservada: +"); return '+';}
"-"                                                                         {console.log("[L] reservada: -"); return '-';}
"*"                                                                         {console.log("[L] reservada: *"); return '*';}
"/"                                                                         {console.log("[L] reservada: /"); return '/';}
"%"                                                                         {console.log("[L] reservada: %"); return '%';}
"^"                                                                         {console.log("[L] reservada: ^"); return '^';}
"=="                                                                        {console.log("[L] reservada: =="); return '==';}
"!="                                                                        {console.log("[L] reservada: !="); return '!=';}
"<"                                                                         {console.log("[L] reservada: <"); return '<';}
">"                                                                         {console.log("[L] reservada: >"); return '>';}
"<="                                                                        {console.log("[L] reservada: <="); return '<=';}
">="                                                                        {console.log("[L] reservada: >="); return '>=';}
"~"                                                                         {console.log("[L] reservada: ~"); return '~';}
"&&"                                                                        {console.log("[L] reservada: &&"); return '&&';}
"||"                                                                        {console.log("[L] reservada: ||"); return '||';}
"|&"                                                                        {console.log("[L] reservada: |&"); return '|&';}
"!"                                                                         {console.log("[L] reservada: !"); return '!';}
"++"                                                                        {console.log("[L] reservada: ++"); return 'INCREMENTO';}
"--"                                                                        {console.log("[L] reservada: --"); return 'INCREMENTO';}
"("                                                                         {console.log("[L] reservada: ("); return '(';}
")"                                                                         {console.log("[L] reservada: )"); return ')';}
":"                                                                         {console.log("[L] reservada: :"); return ':';}
"="                                                                         {console.log("[L] reservada: ="); return '=';}
","                                                                         {console.log("[L] reservada: ,"); return ',';}
";"                                                                         {console.log("[L] reservada: ;"); return ';';}
"Retorno"                                                                   {console.log("[L] reservada: RETORNO"); return 'RETORNO';}

\n+                                                                         {console.log("[L] especial: NL"); return 'NEW_LINE';}
\t+                                                                         {console.log("[L] especial: SANGRIA"); return 'SANGRIA';}

[0-9]+\b                                                                    {console.log("[L] ER: INT"); return 'INTEGER';}
[0-9]+("."[0-9]+)?\b                                                        {console.log("[L] ER: DEC"); return 'DECIMAL';}
"'"{letra}|\s"'"                                                            {console.log("[L] ER: CHAR"); return 'CHARACTER';}

"."                                                                         {console.log("[L] reservada: ."); return '.';}
"crl"                                                                       {console.log("[L] reservada: .crl"); return 'CRL';}


("$"|{letra})|("_"|"$"|{letra})("_"|"$"|{letra}|[0-9])+                     {console.log("[L] ER: ID"); return 'ID';}

"!!".*                                                                      {console.log("[L] comentario: "+ yytext);/*ignore*/}

"'''"                                                                       {this.begin('COMMENT');}
<COMMENT>"'''"                                                              {console.log("[L] comentario"); this.popState();}
<COMMENT>.                                                                   /*ignore*/

["]                                                                         {this.begin('SSTRING');}
<SSTRING>[^"\n]*                                                            {console.log("ER: CADENA: "+yytext);return 'CADENA';}/*quizá si vaya aquí, como ignora todo lo que sea un \n o "*/
<SSTRING>[\n]                                                               {this.yybegin('ERROR');}
<SSTRING><<EOF>>                                                            {this.yybegin('ERROR');}
<SSTRING>["]                                                                {this.popState();}

<<EOF>>                                                                     {console.log("[L] EOF"); return 'EOF';}
 
<ERROR>\s+                                                                  {addError(yyloc.first_line, yylloc.first_column); this.popState();}//aquí se invoca a la función que se encarga de recisar lo de substring de reservadas xD

[.]                                                                         {handleLexerError(); this.yybegin('ERROR');}//Aquí se debe hacer la concat de los errores     

//me da duda lo de los errores, lo del string y las macros... si no funciona lo de los errores, entonces usa [.]+ para que aśi lo agrupe, según vi en la docu... y si no funciona lo de los string, quizá sea util usar, el string de la docu...

/lex
////////////////[ 1.3. asociatividad y precedencia ]////////////////

%left '+' '-'
%left '*' '/' '%'
%right '^'
%nonassoc UMINUS
%nonassoc '==' '!=' '<' '>' '<=' '>=' '~'
%left '||'
%left '!&'
%left '&&'
%left '!'
%nonassoc '(' ')'

//////////////////////////[ 2 PARSER ]////////////////////////////

///////////////////////////[ 2.1 start ]//////////////////////////
%start inicio

%%

//////////////////////////[ 3.2 grammar ]////////////////////////
inicio : clase EOF                        {console.log("---Parser process terminated---");}
                                           // se hace el return del objeto creado para que pueda setearse en la lista que posee el CompilerCenter...}
       ;

clase : header content                    {console.log("Header + Content");}
      | content                           {console.log("Only Body");}
      ;

header : imports incerteza                {console.log("Header: Import + Incertitude");}
       | imports                          {console.log("Header: Import");}
       | incerteza                        {console.log("Header: Incertitude");}
       ;

imports : imports import                  {console.log("Header: +1 import");}
        | import                          {console.log("Header: 1st import");}
        ;

import : IMPORT ID '.' CRL NEW_LINE                       {addImport($2);}       
       ;

incerteza : INCERTEZA expression NEW_LINE                       {addIncertitude($2);}     
          ;

content : content sentences                       {console.log("Content: +1 sentence");}
        | sentences                               {console.log("Content: 1st sentence");}
        ;

sentences : class_content                       {console.log("CLASS- content added");}//La axn se implementará aquí puest aquí ya no habrá oportunidaa de que exista error, eso si, como aún no se qué obtendría el método si null o si al intentar acceder al valor de esa var, por el hecho que hubo un err y no se le seteó algo, vaya a dar erro, quizá por esa razón sea mejor hacer el seteo en el método de la RP de abajito [la que contiene el NL...]
          | function_content                    {console.log("FUN- content added");}
          ;

class_content: class_content_elements NEW_LINE                    //no se tiene nada por hacer, puseto que el contenido ya se add abajito, al hacerlo así, quiere decir que en caso no hayan colocado NL, esto no afectará a la sentencia que obvi dobi estaba bien formada xD
             ;

class_content_elements : declaracion_var_global                   { addClassContent($1, null); }
                       | declaracion_funcion                      { addClassContent(null, $1); }
                       ;

declaracion_var_global : declaracion_var                     {console.log("ClassC: "+ $1.lenght +"GLOBAL var created");
                                                              $$ = $1; }
                       ;

declaracion_var : content_type creacion_vars asignation_value                        { $$ = createVarDeclaration($1, $2, $3); }
                ;

creacion_vars : var_list                        { $$ = $1; }
              ;

var_list : var_list ',' ID                      { $$ = $$.push($1); }
         | ID                                   { $$ = new Array<string>();
                                                  SS.push($1); }//Aunue tb hubieras podido probar así como lo tenías antes, si se puede ini desde la instaciación [por medio de enviar un argu a los parám xD]
         ;

content_type : INT                        { $$ = ContentType.INTEGER; }
             | DOUBLE                     { $$ = ContentType.DOUBLE; }
             | STRING                     { $$ = ContentType.STRING; }
             | BOOLEAN                    { $$ = ContentType.BOOLEAN; }
             | CHAR                       { $$ = ContentType.CHAR; }
             ;

declaracion_funcion : content_type ID '(' params ')' ':'                      { createFunction("COMPLEX", $1, $2, $4); }
                    | VOID ID '(' params ')' ':'                              { createFunction("SIMPLE", $1, $2, $4); }
                    | VOID MAIN '(' ')' ':'                                   { createFunction("MAIN", $1, $2, new Array<Variable>()); }
                    ;

params : params_list                        { $$ = $1; }
       |                                    { $$ = new Array<Variable>(); }
       ;

params_list : params_list ',' param                   { $$ = $1.push($3); }
            | param                                   { $$ = new Array<Variable>();
                                                        $$.push($1); }
            ;
      
param : content_type ID                       { $$ = createParam($1, $2); }
      ;

function_content : SANGRIA function_sentence NEW_LINE                        { addFunctionContent(getHierarchy($1), $2); }
                 ;

function_sentence : only_sentence                       { isADirective = true;
                                                          $$ = $1; }
                  | loop_sentence                       { isADirective = false;
                                                          $$ = $1; }
                  | control_sentence                    { isADirective = false;
                                                          $$ = $1; }
                  ;

only_sentence : declaracion_var                       { $$ = $1; }
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

expression : expr                         { $$ = $1; }
           ;

expr : expr '+' expr2                       { $$ = createOperation($1, $2, $3); }               
     | expr '-' expr2                       { $$ = createOperation($1, $2, $3); }
     | expr2                                { $$ = $1; }//puesto que hace una de dos cosas, subir el resultado o nada xD, ahora que lo pienso quizá debería subirse xD
     ;

expr2 : expr2 '*' expr3                   { $$ = createOperation($1, $2, $3); }
      | expr2 '/' expr3                   { $$ = createOperation($1, $2, $3); }
      | expr2 '%' expr3                   { $$ = createOperation($1, $2, $3); }
      | expr3                             { $$ = $1; }
      ;

expr3 : expr4 '^' expr3                   { $$ = createOperation($1,$2, $3); }
      | expr4                             { $$ = $1; }
      ;//puesto que la aso es hacia la derecha

expr4 : '-' expr5   %prec UMINUS                      { let expre = new Expresion(null, 0, null);
                                                        expre.getValue();//puesto que el operate es de acceso privado xD
                                                        $$ = createOperation(expre, $1, $2); }
      | expr5                                         { $$ = $1; }
      ;

expr5 : expr5 '==' expr6                        { $$ = createOperation($1, $2, $3); }
      | expr5 '!=' expr6                        { $$ = createOperation($1, $2, $3); }
      | expr5 '<' expr6                         { $$ = createOperation($1, $2, $3); }
      | expr5 '>' expr6                         { $$ = createOperation($1, $2, $3); }
      | expr5 '<=' expr6                        { $$ = createOperation($1, $2, $3); }
      | expr5 '>=' expr6                        { $$ = createOperation($1, $2, $3); }
      | expr5 '~' expr6                         { $$ = createOperation($1, $2, $3); }
      | expr6                                   { $$ = $1; }
      ;

expr6 : expr6 '||' expr7                        { $$ = createOperation($1, $2, $3); }
      | expr7                                   { $$ =  $1; }
      ;

expr7 : expr7 '|&' expr8                        { $$ = createOperation($1, $2, $3); }
      | expr8                                   { $$ = $1; }
      ;
      
expr8 : expr8 '&&' expr9                        { $$ = createOperation($1, $2, $3); }
      | expr9                                   { $$ = $1; }
      ;

expr9 : '!' expr10                        { $$ = createOperation(null, $2, $3); }
       | expr10                           { $$ = $1; }
       ;

expr10 : INTEGER                    { $$ = createValue("INTEGER", $1); }
       | DECIMAL                    { $$ = createValue("DECIMAL", $1); }
       | CADENA                     { $$ = createValue("CADENA", $1); }
       | booleano                   { $$ = createValue("BOOLEAN", $1); }
       | CHARACTER                  { $$ = createValue("CHARACTER", $1); }
       | contenido_var              { $$ = $1; }
       | '(' expr ')'               { $$ = createOperation($2, "()", null); }
       ;

booleano : TRUE                     { $$ = $1; }//también hubieramos podido crear el value desde aquí y ya solo enviarlo a la RP que invoca a "booleano" de arribita, pero para que todo se vea igual xD
         | FALSE                    { $$ = $1; }
         ;      

contenido_var : ID                  { $$ = createValue("VARIABLE", $1); }
              | invocacion          { $1.setIsOnlyInvocated(false);//puesto que si vino aquí, pues no lo es xD
                                      $$ = $1; }
              ;

invocacion : ID '(' argumentos ')'                    { $$ = createInvocation($1, $3); }
           | ID '(' ')'                               { $$ = createInvocation($1, new Array<Expresion>()); }
           ;

mostrar : MOSTRAR '(' CADENA contenido_asignacion ')'                   { $$ = createMostrar($3, $4); }
        ;

contenido_asignacion : ',' argumentos                       { $$ = $2; }
                     |                                      { $$ = new Array<Expresion>(); }
                     ;

argumentos : argumentos ',' expression                      { $$ = $1.push($3); }//la verdad no estoy segura que deba ser $1, en todo caso si prefiriría crear una lista aparte para que aquí solo se seteen los datos...
           | expression                                     { $$ = new Array<Expresion>();
                                                              $$.push($1); }
           ;

dibujar : DRAW_AST '(' ID ')'                   { $$ = createDraw_AST($3); }
        | DRAW_EXP '(' expression ')'           { $$ = createDraw_EXP($3); }
        | DRAW_TS '(' ')'                       { $$ = createDraw_TS(); }
        ;

breakpoints : return                      { $$ = createBreakPoint("RETURN", null); }
            | return expression           { $$ = createBreakPoint("RETURN", $2); }
            | CONTINUAR                   { $$ = createBreakPoint("CONTINUE", null); }
            | DETENER                     { $$ = createBreakPoint("BREAK", null); }
            ;

loop_sentence : PARA ( for_var ';' expression ';' INCREMENTO) ':'                    { $$ = createFor($3, $5, $7); }
              | MIENTRAS '(' expression ')' ':'                                      { $$ = createWhile($3); }
              ;

for_var : INT ID '=' INTEGER                      { $$ = createForVar($2, $4); }
        ;

control_sentence : SI '(' expression ')' ':'                      { $$ = createControl_Sentence($3); }
                 | SINO ':'                                       { $$ = createControl_Sentence(null); }
                 ;