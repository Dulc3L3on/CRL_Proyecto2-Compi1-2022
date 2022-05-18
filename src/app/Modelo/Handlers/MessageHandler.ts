export class MessageHandler{
    private static instance:MessageHandler;
    private messageList:Array<string>;//Solo string, puesto que los mjes de consola así son, podrías addle otra cosa pero sería setear más info y pues ahorita lo que menos quieres es complicarte xD    

    private constructor(){  
        this.messageList = new Array<string>();//si da error por el hecho de usar inyección de dep, entonces lo ini en la decl y ya xD    
     }

    public static getInstance():MessageHandler{
        if(MessageHandler.instance == null){
            MessageHandler.instance = new MessageHandler();
        }

        return MessageHandler.instance;
    }
    
    public initList(){
        let date:Date = new Date();

        this.messageList.push(">>>>>>>===================--<[[[ PROCESS INITIALIZED < "+date.toUTCString()+" > ]]]>--===============<<<<<<<<");
    }//Esto evitará que pueda estar vacía

    public addMessage(message:string){
        this.messageList.push("[message]  "+message);
    }

    public finalizeList(){
        let date:Date = new Date();

        this.messageList.push(">>>>>>>===================--<[[[ PROCESS SUCCESSFUL < "+date.toUTCString()+" > ]]]>--===============<<<<<<<<");
    }

    public getMessage():string{
        if(this.messageList.length > 0){
            return this.messageList.shift()!;
        }

        return "";
    }   

    public clearList(){
        this.messageList = new Array<string>();
    }

    public getMessageList():Array<string>{
        return this.messageList;
    }

}