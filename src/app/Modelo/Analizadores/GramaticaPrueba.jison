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
//caracter        "'"[{letra}\s]"'"

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
//{caracter}                                                                  return 'CHARACTER';
//"'"[a-zA-Z\u00f1\u00d1]"'"                                                  return 'CHARACTER';

"."                                                                         return '.';
"crl"                                                                       return 'CRL';

("$"|{letra})|("_"|"$"|{letra})("_"|"$"|{letra}|[0-9])+                     return 'ID';
//("$"|[a-zA-Z])|("_"|"$"|[a-zA-Z])("_"|"$"|[a-zA-Z]|[0-9])+                  return 'ID';

"!!".*                                                                      {/*ignore*/}

"'''"                                                                       {this.begin('COMMENT');}
<COMMENT>"'''"                                                               this.popState();
<COMMENT>.                                                                   /*ignore*/

["]                                                                         {this.begin('STRING');}
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

////////////////////////[ 2 PARSER ]////////////////////////
//%parser-type lalr
////////////////////////[ 2.1 start ]//////////////////////
//%start expr
%start body

%%

//////////////////////////[ 3.2 grammar ]////////////////////////

//bloques

body : body declaracion_funcion
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

sent_elements : definicion_var/*tb pudiste haber colocado aquí def_var y ponerle la sangría xD, pero por la existencia de la pila y que al recibir una var global, esta no cae a ella, o al nada más caer es add a la TS global, entonces pienso que esto podría ser útil xD*/
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
              | stream_handler
              ;

stream_handler : SANGRIA stream_handler_elements NEW_LINE
               ;

stream_handler_elements : CONTINUAR
                        | DETENER
                        | RETORNO
                        | valor_retorno
                        ;

contenido_bloque_ciclo : contenido_bloque_ciclo sentencias_ciclo
                       | sentencias_ciclo
                       ;

sentencias_ciclo : SANGRIA sent_elements_ciclo
           ;

sent_elements_ciclo : definicion_var/*tb pudiste haber colocado aquí def_var y ponerle la sangría xD, pero por la existencia de la pila y que al recibir una var global, esta no cae a ella, o al nada más caer es add a la TS global, entonces pienso que esto podría ser útil xD*/
              | asignacion
              | ciclo
              //| sentencia_control
              | sentencia_control_ciclos
              | mostrar
              | dibujar
              ;

sentencia_control_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos else_ciclos                         
                         ;

else_ciclos : SINO ':' NEW_LINE bloque_ciclos
            |
            ;

/*sentencia_control_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos SINO ':' NEW_LINE bloque_ciclos
                         | SI '(' expr ')' ':' NEW_LINE bloque_ciclos
                         ;*/

/*else_ciclos : SINO ':' NEW_LINE bloque_ciclos
            //|
            ;*/

/*sentencia_control_ciclos : if_ciclos
                         | if_ciclos SINO ':' NEW_LINE bloque_ciclos
                         ;

if_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos
          ;*/

/*sentencia_control_ciclos : SI '(' expr ')' ':' NEW_LINE rest_of_control
                         ;

rest_of_control : bloque_control normal_rest
                | bloque_ciclos  ciclos_rest
                ;

normal_rest : SINO ':' NEW_LINE bloque_control
            | 

ciclos_rest : SINO ':' NEW_LINE bloque_ciclos
            | 
            ;*/

/*Intento 1
sentencia_control_ciclos : if_ciclos else_ciclos                         
                         ;

if_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos          
          ;

else_ciclos : SINO ':' NEW_LINE bloque_ciclos
            | 
            ;*/

/*Forma original
sentencias_ciclo : sentencias
                 | SANGRIA sentencia_control_ciclos /*con tal de seguir el mismo patrón que en sentencias...
                 ;

sentencia_control_ciclos : if_ciclos
                         | if_ciclos SINO ':' NEW_LINE bloque_ciclos
                         ;

if_ciclos : SI '(' expr ')' ':' NEW_LINE bloque_ciclos
          ;*/

sentencia_control : SI '(' expr ')' ':' NEW_LINE bloque_control sentencia_else                  
                 ;

sentencia_else : SINO ':' NEW_LINE bloque_control
               | 
               ;

/*sentencia_control : sentencia_if
                  | sentencia_if SINO ':' NEW_LINE bloque_control
                  ;

sentencia_if : SI '(' expr ')' ':' NEW_LINE bloque_control
             ;*/

/*bloque_control : bloque retorno_bloque               
               | tipos_retorno
               ;

retorno_bloque : tipos_retorno
               | 
               :

tipos_retorno : valor_retorno NEW_LINE
              | return NEW_LINE              
              ;*/

/*bloque_control : bloque tipos_retorno
               | bloque
               | tipos_retorno
               ;

tipos_retorno : valor_retorno NEW_LINE
              | return NEW_LINE              
              ;*/

bloque_control : bloque valor_retorno NEW_LINE
               | valor_retorno NEW_LINE
               | bloque
               | bloque return NEW_LINE
               | return NEW_LINE
               ;

/*bloque_control : bloque_tipo1
               | bloque_tipo2
               ;*/

mostrar : MOSTRAR '(' CADENA contenido_asignacion ')' NEW_LINE
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


//EXPR
//forma definitiva, sin ambiguedad [expr :3 xD]
//forma definitiva xD

/*expr : expr '+' expr2
     | expr '-' expr2
     | expr2
     ;

expr2 : expr2 '*' expr3
      | expr2 '/' expr3
      | expr2 '%' expr3
      | expr3
      ;

expr3 : expr3 '^' expr4
      | expr4
      ;

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
       
expr10 : '(' expr11 ')'
       | expr11
       ;

expr11 : INTEGER
       | DECIMAL
       | CADENA
       | booleano
       | CHARACTER
       | contenido_var     
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

argumentos : argumentos ',' value_expr
           | value_expr
           ;*///NICEE!!

//forma definitiva xD

/*expr : expr '+' expr
     | expr '-' expr
     | expr '*' expr
     | expr '/' expr
     | expr '%' expr
     | expr '^' expr
     | '-' expr   %prec UMINUS
     | expr '==' expr
     | expr '!=' expr
     | expr '<' expr
     | expr '>' expr
     | expr '<=' expr
     | expr '>=' expr
     | expr '~' expr
     | expr '||' expr
     | expr '|&' expr
     | expr '&&' expr     
     | '!' expr
     | '!' '(' expr ')'     
     | '(' expr ')'
     | INTEGER
     | DECIMAL
     | CADENA
     | booleano
     | CHARACTER
     | contenido_var     
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

argumentos : argumentos ',' value_expr
           | value_expr
           ;*/

//versión resumida de la forma definitiva...
/*expr : expr '+' expr
     | expr '-' expr
     | expr '*' expr
     | expr '/' expr
     | expr '%' expr
     | expr '^' expr
     | '-' expr   %prec UMINUS
     | expr operador_relacional expr
     | expr operador_logico expr
     | '!' '(' expr ')'
     | '!' expr
     | '(' expr ')'
     | INTEGER
     | DECIMAL
     | CADENA
     | booleano
     | CHARACTER
     | contenido_var     
     ;

operador_relacional : '=='
                    | '!='
                    | '<'
                    | '>'
                    | '<='
                    | '>='
                    | '~'
                    ;

operador_logico : '&&'
                | '||'
                | '|&'
                //| '!'
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

argumentos : argumentos ',' value_expr
           | value_expr
           ;*/

//forma orginal 2 xD
/*expr_booleana : '!' '(' expr_booleana ')'
               | '(' expr_booleana ')'
               | expr_booleana operador_logico expr_booleana
               | expr_booleana operador_relacional expr_booleana               
               | expr_numerica
               | '!' contenido_var
               | '!' booleano
               ;
            
operador_logico : '&&'
                | '||'
                | '|&'
                //| '!'
                ;

operador_relacional : '=='
                    | '!='
                    | '<'
                    | '>'
                    | '<='
                    | '>='
                    | '~'
                    ;

expr_numerica : expr_numerica '+' expr_numerica
              | expr_numerica '-' expr_numerica
              | expr_numerica '*' expr_numerica
              | expr_numerica '/' expr_numerica
              | expr_numerica '%' expr_numerica
              | expr_numerica '^' expr_numerica
              | '-' expr_numerica   %prec UMINUS
              | '(' expr_numerica ')'
              | INTEGER
              | DECIMAL
              | CADENA
              | booleano
              | CHARACTER
              | contenido_var
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

argumentos : argumentos ',' value_expr
           | value_expr
           ;*/