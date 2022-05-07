//////////////////////[ 0. SETTINGS ]///////////////////////
//[0.1] imports 
%{


%}

//[0.2] options
%options flex 
//%options case-sensitive
         case-sensitive

//[0.3] user code
%{


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
"Importar"                                                                  return 'IMPORT';
"Incerteza"                                                                 return 'INCERTEZA';
"Principal"                                                                 return 'MAIN';
"Int"                                                                       return 'INT';
"Double"                                                                    return 'DOUBLE';
"String"                                                                    return 'STRING';
"Boolean"                                                                   return 'BOOLEAN';
"Char"                                                                      return 'CHAR';
"Void"                                                                      return 'VOID';
"Si"                                                                        return 'SI';       
"Sino"                                                                      return 'SINO';
"Para"                                                                      return 'PARA';
"Mientras"                                                                  return 'MIENTRAS';
"Detener"                                                                   return 'DETENER';
"Continuar"                                                                 return 'CONTINUAR';
"Mostrar"                                                                   return 'MOSTRAR';
"DibujarAST"                                                                return 'DRAW_AST';
"DibujarEXP"                                                                return 'DRAW_EXP';
"DibujarTS"                                                                 return 'DRAW_TS';
"true"                                                                      return 'TRUE';
"false"                                                                     return 'FALSE';
"+"                                                                         return '+';
"-"                                                                         return '-';
"*"                                                                         return '*';
"/"                                                                         return '/';
"%"                                                                         return '%';
"^"                                                                         return '^';
"=="                                                                        return '==';
"!="                                                                        return '!=';
"<"                                                                         return '<';
">"                                                                         return '>';
"<="                                                                        return '<=';
">="                                                                        return '>=';
"~"                                                                         return '~';
"&&"                                                                        return '&&';
"||"                                                                        return '||';
"|&"                                                                        return '|&';
"!"                                                                         return '!';
"++"                                                                        return 'INCREMENTO';
"--"                                                                        return 'INCREMENTO';
"("                                                                         return '(';
")"                                                                         return ')';
":"                                                                         return ':';
"="                                                                         return '=';
","                                                                         return ',';
";"                                                                         return ';';
"Retorno"                                                                   return 'RETORNO';

\n+                                                                         return 'NEW_LINE'
\t+                                                                         return 'SANGRIA';
[0-9]+\b                                                                    return 'INTEGER';
[0-9]+("."[0-9]+)?\b                                                        return 'DECIMAL';
"'"{letra}|\s"'"                                                            return 'CHARACTER';

"."                                                                         return '.';
"crl"                                                                       return 'CRL';


("$"|{letra})|("_"|"$"|{letra})("_"|"$"|{letra}|[0-9])+                     return 'ID';

"!!".*                                                                      {/*ignore*/}

"'''"                                                                       {this.begin('COMMENT');}
<COMMENT>"'''"                                                               this.popState();
<COMMENT>.                                                                   /*ignore*/

["]                                                                         {this.begin('SSTRING');}
<SSTRING>[^"\n]*                                                            {return 'CADENA';}
<SSTRING>[\n]                                                               {this.yybegin('ERROR');}
<SSTRING><<EOF>>                                                            {this.yybegin('ERROR');}
<SSTRING>["]                                                                {this.popState();}

<<EOF>>                                                                     {return 'EOF';}
 
<ERROR>\s+                                                                  {this.popState();}//aquí se invoca a la función que se encarga de recisar lo de substring de reservadas xD

[.]                                                                         {this.yybegin('ERROR');}        

//me da duda lo de los errores, lo del string y las macros... si no funciona lo de los errores, entonces usa [.]+ para que aśi lo agrupe, según vi en la docu... y si no funciona lo de los string, quizá sea util usar, el string de la docu...

/lex
/////////////[ 1.3. asociatividad y precedencia ]///////////

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

////////////////////////////[ 2 PARSER ]///////////////////////////

////////////////////////////[ 2.1 start ]/////////////////////////
%start inicio

%%

//////////////////////////[ 3.2 grammar ]////////////////////////
inicio : clase EOF
       ;

clase : header content
      | content
      ;

header : imports incerteza
       | imports
       | incerteza
       ;

imports : imports import
        | import
        ;

import : IMPORT ID '.' CRL NEW_LINE
       ;

incerteza : INCERTEZA DECIMAL NEW_LINE
          ;

content : content sentences
        | sentences
        ;

sentences : class_content
          | function_content
          ;

class_content: class_content_elements NEW_LINE
             ;

class_content_elements : declaracion_var_global
                       | declaracion_funcion
                       ;

declaracion_var_global : definicion_var
                       ;

definicion_var : content_type creacion_vars
               ;

creacion_vars : var_list asignation_value
              ;

var_list : var_list ',' ID
         | ID
         ;

declaracion_funcion : content_type ID '(' params ')' ':'
                    | VOID ID '(' params ')' ':'
                    | VOID MAIN '(' ')' ':'
                    ;

content_type : INT
             | DOUBLE
             | STRING
             | BOOLEAN
             | CHAR
             ;

function_content : SANGRIA function_sentence NEW_LINE
                 ;

function_sentence : only_sentence
                  | loop_sentence
                  | control_sentence
                  ;

only_sentence : declaracion_var
              | asignacion_var
              | invocacion
              | mostrar
              | dibujar              
              | breakpoints
              ;//no son acumulados directamente en la pila, sino que se add a la struct contenedora que les corresponde, luego de hacer las revisiones y ajustes correspondientes al tipo de only_sentence xD

asignacion_var : ID asignation_value
               ;

asignation_value : '=' expr
                 ;

expr : expr '+' expr2
     | expr '-' expr2
     | expr2
     ;

expr2 : expr2 '*' expr3
      | expr2 '/' expr3
      | expr2 '%' expr3
      | expr3
      ;

expr3 : expr4 '^' expr3
      | expr4
      ;//puesto que la aso es hacia la derecha

expr4 : '-' expr5   %prec UMINUS
      | expr5
      ;

expr5 : expr5 '==' expr6
      | expr5 '!=' expr6
      | expr5 '<' expr6
      | expr5 '>' expr6
      | expr5 '<=' expr6
      | expr5 '>=' expr6
      | expr5 '~' expr6
      | expr6
      ;

expr6 : expr6 '||' expr7
      | expr7
      ;

expr7 : expr7 '|&' expr8
      | expr8
      ;
      
expr8 : expr8 '&&' expr9
      | expr9
      ;

expr9 : '!' expr10
       | expr10
       ;

expr10 : INTEGER
       | DECIMAL
       | CADENA
       | booleano
       | CHARACTER
       | contenido_var    
       | '(' expr ')'
       ;

booleano : TRUE
         | FALSE
         ;      

contenido_var : ID
              | invocacion
              ;

invocacion : ID '(' argumentos ')'
           | ID '(' ')'
           ;

argumentos : argumentos ',' expr
           | expr
           ;

mostrar : MOSTRAR '(' CADENA contenido_asignacion ')'
        ;

contenido_asignacion : contenido_asignacion ',' expr
                     | ',' expr
                     ;

dibujar : DRAW_AST '(' ID ')'
        | DRAW_EXP '(' expr ')'
        | DRAW_TS '(' ')'
        ;

breakpoints : return 
            | return expr
            | CONTINUAR
            | DETENER
            ;

loop_sentence : PARA ( INT ID '=' INTEGER ';' expr ';' INCREMENTO) ':'
              | MIENTRAS '(' expr ')' ':'
              ;

control_sentence : SI '(' expr ')' ':'
                 | SINO ':' 
                 ;