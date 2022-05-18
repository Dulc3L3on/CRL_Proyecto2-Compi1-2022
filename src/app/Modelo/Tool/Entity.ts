export class Entity{
    private name:string;
    private father:string|null;

    constructor(name:string, father:string|null){
        this.name = name;
        this.father = father;
    }

    public getName(){
        return this.name;
    }

    public getFather(){
        return (this.father == null)?"":this.father;
    }
}