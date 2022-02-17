import dexie from "../../../functionalcomponents/Dexiesj/dexie";
import Model from "../../Model";

class ChapterMetaDexie extends Model {
    static db = dexie;


    constructor(novel_url){
        super(null);
        this.novel_url = novel_url;
        this.save = this.constructor.save;
        this.chapterchunks = [];
        this.downloadedchapters = [];
        this.numberOfChapters = 0;
    }

    static async get(url){
        let chaptermeta = await this.db.chaptermetas.where("novel_url").equals(url).first();
        if(chaptermeta){
            chaptermeta.save = this.save;
        }
        return chaptermeta;
    }

    static async getAll(){
        let chaptermetas = await this.db.chaptermetas.toArray();
        chaptermetas.map(cm => {
            cm.save = this.save;
            return cm;
        })
    }

    static async save(){
        let db = dexie;
        delete this.save;

        try{
            return await db.chaptermetas.add({...this});
        }catch(err){
            let id = this.novel_url;
            delete this.novel_url;
            return await db.chaptermetas.update(id, this);
        }
    }
}

export default ChapterMetaDexie;