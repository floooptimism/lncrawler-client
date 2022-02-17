const dexie = require("../../../functionalcomponents/Dexiesj/dexie");
const Model = require("../../Model");

class ChapterChunkDexie extends Model{
    static db = dexie;
    constructor(id, chaptermetaref){
        super()
        this.id = id;
        this.chaptermetaref = chaptermetaref;
        this.save = this.constructor.save;
        this.chapters = [];
    }

    static async get(id){
        let chunk = await this.db.chapterchunks.where("id").equals(id).first();
        if(chunk){
            chunk.save = this.save;
        }
        return chunk;
    }

    static async getAll(){
        let chapterchunks = await this.db.chapterchunks.toArray();
        return chapterchunks.map(cc => {
            cc.save = this.save;
            return cc;
        })
    }

    static async save(){
        let db = dexie;
        let id = this.id;
        delete this.save;
        try{
            await db.chapterchunks.add({...this});
        }catch(err){
            delete this.id;
            await db.chapterchunks.update(id, this);
        }
    }
}

export default ChapterChunkDexie; 