//////////////////////[ 0. SETTINGS ]///////////////////////
//[0.1] imports 
%{  %}

//[0.2] options
%options flex 
         case-sensitive
//%options case-sensitive
         

//[0.3] user code
%{ %}

//////////////////////[ 1. LEXER ]/////////////////////////
%lex

%options ranges

//[1.1] macros 
//generales
//sangria       [\n\t]+
//number        [0-9]+\b
//decimal       {digito}+("."{digito}+)?\b
letra           [a-zA-Z\u00f1\u00d1]          

%s COMMENT SSTRING ERROR
%%

//"!!"[^\n]*                                                                  {console.log("[L] comentario: "+ yytext);/*ignore*/}

//\n+                                                                         {console.log("[L] especial: NL"); return 'NEW_LINE';}
[\n|\r|\v]+                                                                 {return 'NEW_LINE';}

\t+                                                                         {return 'SANGRIA';}

\s                                                                           /*ignored*/

\r                                                                           /*ignored*/

" "                                                                         /*ignored*/

"!!"[^\n]*                                                                  {console.log("[L] comentario: "+ yytext);}/*ignored*/

"'''"                                                                       {this.begin('COMMENT');}
<COMMENT>"'''"                                                              {console.log("[L] comentario"); this.popState();}
<COMMENT>.                                                                   /*ignore*/

//[1.2] ER
//reservadas
"Importar"                                                                  {return 'IMPORT';}
"Incerteza"                                                                 {return 'INCERTEZA';}
"Principal"                                                                 {return 'MAIN';}
"Int"                                                                       {return 'INT';}
"Double"                                                                    {return 'DOUBLE';}
"String"                                                                    {return 'STRING';}
"Boolean"                                                                   {return 'BOOLEAN';}
"Char"                                                                      {return 'CHAR';}
"Void"                                                                      {return 'VOID';}
"Si"                                                                        {return 'SI';}    
"Sino"                                                                      {return 'SINO';}
"Para"                                                                      {return 'PARA';}
"Mientras"                                                                  {return 'MIENTRAS';}
"Detener"                                                                   {return 'DETENER';}
"Continuar"                                                                 {return 'CONTINUAR';}
"Mostrar"                                                                   {return 'MOSTRAR';}
"DibujarAST"                                                                {return 'DRAW_AST';}
"DibujarEXP"                                                                {return 'DRAW_EXP';}
"DibujarTS"                                                                 {return 'DRAW_TS';}
"true"                                                                      {return 'TRUE';}
"false"                                                                     {return 'FALSE';}
"+"                                                                         {return '+';}
"-"                                                                         {return '-';}
"*"                                                                         {return '*';}
"/"                                                                         {return '/';}
"%"                                                                         {return '%';}
"^"                                                                         {return '^';}
"=="                                                                        {return '==';}
"!="                                                                        {return '!=';}
"<"                                                                         {return '<';}
">"                                                                         {return '>';}
"<="                                                                        {return '<=';}
">="                                                                        {return '>=';}
"~"                                                                         {return '~';}
"&&"                                                                        {return '&&';}
"||"                                                                        {return '||';}
"|&"                                                                        {return '|&';}
"!"                                                                         {return '!';}
"++"                                                                        {return 'INCREMENTO';}
"--"                                                                        {return 'INCREMENTO';}
"("                                                                         {return '(';}
")"                                                                         {return ')';}
":"                                                                         {return ':';}
"="                                                                         {return '=';}
","                                                                         {return ',';}
";"                                                                         {return ';';}
"Retorno"                                                                   {return 'RETORNO';}

[0-9]+("."[0-9]+)                                                           {return 'DECIMAL';}
[0-9]+                                                                      {return 'INTEGER';}

"'"{letra}|\s"'"                                                            {return 'CHARACTER';}

"."                                                                         {return '.';}
"crl"                                                                       {return 'CRL';}


(("$"|{letra})|("_"|"$"|{letra})("_"|"$"|{letra}|[0-9]))+                     {return 'ID';}

["]                                                                         {this.begin('SSTRING');}
<SSTRING>[^"\n]*                                                            {console.log("ER: CADENA: "+yytext);return 'CADENA';}/*quizá si vaya aquí, como ignora todo lo que sea un \n o "*/
<SSTRING>[\n]                                                               {this.yybegin('ERROR');}
<SSTRING><<EOF>>                                                            {this.yybegin('ERROR');}
<SSTRING>["]                                                                {this.popState();}

<<EOF>>                                                                     {console.log("[L] EOF"); return 'EOF';}
 
<ERROR>\s+                                                                  {this.popState();}//aquí se invoca a la función que se encarga de recisar lo de substring de reservadas xD

[.]                                                                         {this.yybegin('ERROR');}//Aquí se debe hacer la concat de los errores     

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
inicio : clase EOF                        
                                           // se hace el return del objeto creado para que pueda setearse en la lista que posee el CompilerCenter...}
       ;

clase : NEW_LINE class_elements      
      | SANGRIA NEW_LINE class_elements
      | class_elements
      ;//sangría de por sí sola NO, porque ellos no deben tener nada de ese tipo de espacios!

class_elements : header content                    
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

incerteza : INCERTEZA expression NEW_LINE 
          ;

content : content sentences               
        | sentences                       
        ;

sentences : class_content                 
          | function_content              
          ;

class_content: class_content_elements NEW_LINE                    //no se tiene nada por hacer, puseto que el contenido ya se add abajito, al hacerlo así, quiere decir que en caso no hayan colocado NL, esto no afectará a la sentencia que obvi dobi estaba bien formada xD
             ;

class_content_elements : declaracion_var_global            
                       | declaracion_funcion               
                       ;

declaracion_var_global : declaracion_var                   
                                                           
                       ;

declaracion_var : content_type creacion_vars asignation_value     
                | content_type creacion_vars                      
                ;

creacion_vars : var_list             
              ;

var_list : var_list ',' ID           
         | ID                        
                                     
         ;

content_type : INT                   
             | DOUBLE                
             | STRING                
             | BOOLEAN               
             | CHAR                  
             ;

declaracion_funcion : content_type ID '(' params ')' ':'       
                    | VOID ID '(' params ')' ':'               
                    | VOID MAIN '(' ')' ':'                    
                    ;

params : params_list                     
       |                                 
       ;

params_list : params_list ',' param      
            | param                      
                                         
            ;
      
param : content_type ID                  
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

asignation_value : '=' expression           
                 ;

expression : expr              
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

mostrar : MOSTRAR '(' CADENA contenido_asignacion ')'          
        ;

contenido_asignacion : ',' argumentos           
                     |                          
                     ;

argumentos : argumentos ',' expression             
           | expression                            
                                                   
           ;

dibujar : DRAW_AST '(' ID ')'           
        | DRAW_EXP '(' expression ')'   
        | DRAW_TS '(' ')'               
        ;

breakpoints : RETORNO                 
            | RETORNO expression      
            | CONTINUAR               
            | DETENER                 
            ;

loop_sentence : PARA '(' for_var ';' expression ';' INCREMENTO ')' ':'        
              | MIENTRAS '(' expression ')' ':'                               
              ;

for_var : INT ID '=' INTEGER            
        ;

control_sentence : SI '(' expression ')' ':'            
                 | SINO ':'                             
                 ;