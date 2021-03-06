import dexie from "../../../functionalcomponents/Dexiesj/dexie";
import Model from "../../Model";

/**
 * @class Novel
 * @extends Model
 * @description A model for Novels, uses Dexie as the indexeddb wrapper
 */

class NovelDexie extends Model{
    static db = dexie;
    constructor({source, url, title, author, cover, description, status, genres, tags, type, lastUpdate, lastChapter, views, rating, loaded}){
        super(null);
        this.loaded = loaded || false;
        this.url = url;
        this.title = title;
        this.author = author;
        this.source = source;
        this.cover = cover;
        this.description = description;
        this.status = status;
        this.genres = genres;
        this.tags = tags;
        this.type = type;
        this.lastUpdate = lastUpdate;
        this.lastChapter = lastChapter;
        this.numberOfChapters = 0;
        this.chaptersLoaded = false;
        this.views = views;
        this.rating = rating;
        this.save = this.constructor.save;
        this.currentChapter = 1;
    }

    static async get(url){
        try{
            let novel = await this.db.novels.where("url").equals(url).first();
            if(novel){
                novel.save = this.save;
            }   
            return novel;
        }catch(err){
            return null;
        }
    }

    static async delete(url){
        return await this.db.novels.delete(url);
    }

    static async getAll(){
        let novels =  await this.db.novels.toArray()
        return novels.map(novel => {
            novel.save = this.save;
            return novel;
            });
    }

    static async save(){
        let db = dexie;
        delete this.save;

        try{
            return await db.novels.add({...this});
        }catch(err){
            let id = this.url;
            delete this.url;
            return await db.novels.update(id, this);
        }
    }
}

export default NovelDexie;
