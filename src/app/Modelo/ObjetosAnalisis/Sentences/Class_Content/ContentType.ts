enum ContentType{
    ERROR = -1,
    INTEGER,
    DOUBLE,
    STRING,
    BOOLEAN,
    CHAR,
    VOID,
    NOTHING,

    BREAK,
    CONTINUE,
    RETURN
}
//NOTHING, no es lo mismo que void, puesto que este se planea
//retornar, cuando la sentence, no tiene posibilidad de devolver
//un tipo [int-void] como en el caso de las directivas, pero que 
//si pueden devolver un ERROR (en caso llegara a suceder)
//tb tiene como fin ser retornado por las struct contenedoras, que
//si pueden devolver un tipo, siempre y cuando tengan un return
//con una expr asignada, dentro de ellos, pero que en esa ocasión
//no tengan uno en su cuerpo
    //De esta manera se podrá definir como comportamiento general,
    //que al recibir este tipo de RESULT, la exe de la pila debe
    //seguir xD