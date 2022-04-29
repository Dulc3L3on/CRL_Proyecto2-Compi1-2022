//////////////////////[ 0. SETTINGS ]///////////////////////
//[0.1] imports 
%{


%}

//[0.2] options
%options flex 
%options case-sensitive

//[0.3] user code
%{


%}

//////////////////////[ 1. LEXER ]/////////////////////////
%lex
%%

//[1.1] macros 
//generales
sangria       [\n\t]+
number        [0-9]+\b                                 
decimal       {digito}+("."{digito}+)?\b                       
letra         [a-zA-Z\u00f1\u00d1]          

%s COMMENT ERROR

//[1.2] ER
//reservadas
"Importar"                                                                  return 'IMPORT'
"Incerteza"                                                                 return 'INCERTEZA'
"Principal"                                                                 return 'MAIN'
"Double"                                                                    return 'DOUBLE'
"Boolean"                                                                   return 'BOOLEAN'
"String"                                                                    return 'STRING'
"Int"                                                                       return 'INT'
"Char"                                                                      return 'CHAR'
"Void"                                                                      return 'VOID'
"Si"                                                                        return 'SI'       
"Sino"                                                                      return 'SINO'
"Para"                                                                      return 'PARA'
"Mientras"                                                                  return 'MIENTRAS'
"Detener"                                                                   return 'DETENER'
"Continuar"                                                                 return 'CONTINUAR'
"Mostrar"                                                                   return 'MOSTRAR '
"DibujarAST"                                                                return 'DRAW_AST'
"DibujarEXP"                                                                return 'DRAW_EXP'
"DibujarTS"                                                                 return 'DRAW_TS'
"true"                                                                      return 'TRUE'
"false"                                                                     return 'FALSE'
"+"                                                                         return '+'
"-"                                                                         return '-'
"*"                                                                         return '*'
"/"                                                                         return '/'
"%"                                                                         return '%'
"^"                                                                         return '^'
"=="                                                                        return '=='
"!="                                                                        return '!='
"<"                                                                         return '<'
">"                                                                         return '>'
"<="                                                                        return '<='
">="                                                                        return '>='
"~"                                                                         return '~'
"&&"                                                                        return '&&'
"||"                                                                        return '||'
"|&"                                                                        return '|&'
"!"                                                                         return '!'
"++"                                                                        return '++'
"--"                                                                        return '--'
"("                                                                         return '('
")"                                                                         return ')'
":"                                                                         return ':'
"="                                                                         return '='
","                                                                         return ','
"Retorno"                                                                   return 'RETORNO'

{sangria}                                                                   return 'SANGRIA'
{number}                                                                    return 'NUMBER'
{decimal}                                                                   return 'DECIMAL'
"'"{letra}"'"                                                               return 'CARACTER'


("$"|{letra})|("_"|"$"|{letra})("_"|"$"|{letra}|{digito})+                  return 'ID'

"!!".*                                                                      /*ignore*/

"'''"                                                                        this.begin('COMMENT');
<COMMENT> "'''"                                                              this.popState();
<COMMENT>.                                                                   /*ignore*/

\"[^\"]*\"                                                                 { yytext = yytext.substr(0,yyleng-0); 
                                                                             return 'string'; }

<<EOF>>                                                                     return 'EOF';

<ERROR>  {espacioEnBlanco}                                                 {this.popState();}//aquí se invoca a la función que se encarga de recisar lo de substring de reservadas xD

[.]                                                                        {this.yybegin('ERROR');}        

//me da duda lo de los errores, lo del string y las macros...

/lex
/////////////[ 1.3. asociatividad y precedencia ]///////////

////////////////////////[ 2 PARSER ]////////////////////////

////////////////////////[ 2.1 start ]//////////////////////
%%



//////////////////////////[ 3.2 grammar ]////////////////////////
