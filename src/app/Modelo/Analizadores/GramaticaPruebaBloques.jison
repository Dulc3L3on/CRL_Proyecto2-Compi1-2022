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


//PRUEBA, emulando la sintaxis de las operaciones, para crear fácilemente el árbol
//pero no funcionó debido a las sangrías y NL ;-;
/*inicio : clase
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

content : content declaracion_var_global
        | content declaracion_funcion
        | EOF
        ;

declaracion_var_global : declaracion_var NEW_LINE
                       ;

declaracion_var : content_type creacion_vars
                ;

creacion_vars : var_list asignation_value
              ;

var_list : var_list ',' ID
         | ID
         ;

asignacion : ID asignation_value NEW_LINE
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
       
/*expr10 : '(' expr11 ')'
       | expr11
       ;*/

/*expr11 : INTEGER
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

declaracion_funcion : funcion NEW_LINE function_content
                    ;

funcion : content_type ID '(' params ')' ':'        
        | VOID ID '(' params ')' ':'
        | VOID MAIN '(' ')' ':'
        ;

params : lista_params 
       |
       ;

lista_params : lista_params ',' param
             | param
             ;

param : content_type ID
      ;

content_type : INT
             | DOUBLE
             | STRING
             | BOOLEAN
             | CHAR
             ;

function_content : function_content declaracion_var_local ciclo
                 | ciclo
                 ;

declaracion_var_local : SANGRIA content_type creacion_vars NEW_LINE
                      ;

/*declaracion_var_local : SANGRIA declaracion_var NEW_LINE
                      ;*/

/*ciclo : ciclo loop_sentence sentencia_control      
      | sentencia_control
      ;

loop_sentence : SANGRIA loop NEW_LINE
              ;

loop : for
     | while
     ;

/*ciclo : ciclo SANGRIA for sentencia_control
      | ciclo SANGRIA while sentencia_control
      | sentencia_control
      ;*/

/*for : PARA ( INT ID '=' INTEGER ';' expr ';' INCREMENTO) ':'
    ;

while : MIENTRAS '(' expr ')' ':'
      ;

sentencia_control : sentencia_control control_sentence cierre                  
                  | cierre
                  ;

control_sentence : SANGRIA control_structures NEW_LINE
                 ;

control_structures : if 
                   | if_else
                   ;

if : SI '(' expr ')' ':'
   ;

if_else : SINO ':'
        ;
       
cierre : RETORNO expr
       | RETORNO
       | function_content
       //| content
       |
       ;*/

/*inicio : clase EOF
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

content : content declaracion_funcion
        | declaracion_funcion
        ;

declaracion_funcion : funcion
                    | metodo
                    | main
                    ;

funcion : content_type ID '(' params ')' ':' NEW_LINE bloque_tipo1
        ;

metodo : VOID ID '(' params ')' ':' NEW_LINE bloque_tipo2
       ;

main : VOID MAIN '(' ')' ':' NEW_LINE bloque_tipo2
     ;

params : lista_params 
       |
       ;

lista_params : lista_params ',' param
             | param
             ;

param : content_type ID
      ;

bloque_tipo1 : bloque valor_retorno NEW_LINE
             | valor_retorno NEW_LINE
             ;

bloque_tipo2 : bloque
             | bloque return NEW_LINE
             | return NEW_LINE
             ;

bloque : bloque sentencias
       | sentencias
       ;

sentencias : SANGRIA sent_elements
           ;

sent_elements : definicion_var/*tb pudiste haber colocado aquí def_var y ponerle la sangría xD, pero por la existencia de la pila y que al recibir una var global, esta no cae a ella, o al nada más caer es add a la TS global, entonces pienso que esto podría ser útil xD
              | asignacion
              | ciclo
              | sentencia_control
              | mostrar
              | dibujar
              ;

ciclo: for
     | while
     ;

for : PARA ( INT ID '=' INTEGER ';' expr ';' INCREMENTO) ':' NEW_LINE bloque_ciclos
    ;

while : MIENTRAS '(' expr ')' ':' NEW_LINE bloque_ciclos
      ;

bloque_ciclos : contenido_bloque_ciclo stream_handler
              | contenido_bloque_ciclo
              | stream_handler_elements
              ;

stream_handler : SANGRIA stream_handler_elements NEW_LINE              
               ;

/*bloque_ciclos : contenido_bloque_ciclo stream_handler
              //| contenido_bloque_ciclo
              | stream_handler_elements
              ;

stream_handler : SANGRIA stream_handler_elements NEW_LINE
               | 
               ;*///genera la misma cdad de errores, que tener descomentado contenido_b_B y que éste no tenga lambda...

/*stream_handler_elements : CONTINUAR
                        | DETENER
                        | RETORNO
                        | valor_retorno
                        ;

contenido_bloque_ciclo : contenido_bloque_ciclo sentencias_ciclo
                       | sentencias_ciclo
                       ;

sentencias_ciclo : SANGRIA sent_elements_ciclo
           ;

sent_elements_ciclo : definicion_var/*tb pudiste haber colocado aquí def_var y ponerle la sangría xD, pero por la existencia de la pila y que al recibir una var global, esta no cae a ella, o al nada más caer es add a la TS global, entonces pienso que esto podría ser útil xD
              | asignacion
              | ciclo
              //| sentencia_control
              | sentencia_control_ciclos
              | mostrar
              | dibujar
              ;

/*sentencia_control_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos
                         | SI '(' expr ')' ':' NEW_LINE bloque_ciclos else_ciclos                         
                         ;

else_ciclos : SINO ':' NEW_LINE bloque_ciclos
            |
            ;*///da más conflictos que al usar el lambda... que utilicé ntes de esto [está justo abajito xD]

/*sentencia_control_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos else_ciclos                         
                         ;

else_ciclos : SINO ':' NEW_LINE bloque_ciclos
            |
            ;

/*sentencia_control_ciclos : if_ciclos else_ciclos                         
                         ;

if_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos          
          ;

else_ciclos : SINO ':' NEW_LINE bloque_ciclos
            | 
            ;*/

/*
sentencias_ciclo : sentencias
                 | SANGRIA sentencia_control_ciclos /*con tal de seguir el mismo patrón que en sentencias...
                 ;

sentencia_control_ciclos : if_ciclos
                         | if_ciclos SINO ':' NEW_LINE bloque_ciclos
                         ;

if_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos
          ;*/

/*sentencia_control : SI '(' expr ')' ':' NEW_LINE bloque_control sentencia_else                  
                 ;

sentencia_else : SINO ':' NEW_LINE bloque_control
               | 
               ;

/*sentencia_control : sentencia_if
                  | sentencia_if SINO ':' NEW_LINE bloque_control
                  ;

sentencia_if : SI '(' expr ')' ':' NEW_LINE bloque_control
             ;*/

/*expre_booleana : expr_booleana
               | booleano
               | contenido_var
               ;*/

/*bloque_control : bloque tipos_retorno
               | valor_retorno NEW_LINE               
               | return NEW_LINE
               ;

tipos_retorno : valor_retorno NEW_LINE
              | return NEW_LINE
              | 
              ;

/*bloque_control : bloque valor_retorno NEW_LINE
               | valor_retorno NEW_LINE
               | bloque
               | bloque return NEW_LINE
               | return NEW_LINE
               ;*/

/*bloque_control : bloque_tipo1
               | bloque_tipo2
               ;*/

/*mostrar : MOSTRAR '(' CADENA contenido_asignacion ')' NEW_LINE
        ;

contenido_asignacion : contenido_asignacion ',' expr
                     | expr
                     ;

dibujar : DRAW_AST '(' ID ')' NEW_LINE
        | DRAW_EXP '(' expr ')' NEW_LINE
        | DRAW_TS '(' ')' NEW_LINE
        ;

valor_retorno : RETORNO expr
              ;
*///forma con los bloques separados...