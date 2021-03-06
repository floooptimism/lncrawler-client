import ChapterChunkDexie from "../models/concretes/Dexie/ChapterChunkDexie";
import ChapterMetaDexie  from "../models/concretes/Dexie/ChapterMetaDexie";
import NovelDexie from "../models/concretes/Dexie/NovelDexie";
import {MAXCHAPTERSPERCHUNK} from "../models/constants";

const { compare } = require("string-compare");


class NovelModelController {

  /**
   * Stores the shitty novel
   * @param {Object} novel - Novel Object
   */
  async storeNovel(novel) {
    try {
      let nov = new NovelDexie(
        novel
      );
      await nov.save();

      let chaptermeta = new ChapterMetaDexie(novel.url);
      await chaptermeta.save();
      return novel.url;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteNovel(novel_url){
    await NovelDexie.delete(novel_url);
    let chapterMeta = await ChapterMetaDexie.get(novel_url);
    // loop through all chunks inside chaptermeta and delete them
    for(let i = 0; i < chapterMeta.chapterchunks.length; i++){
      await ChapterChunkDexie.delete(chapterMeta.chapterchunks[i].id);
    }
    await ChapterMetaDexie.delete(novel_url);
  }

  /**
   * Updates the information of a novel
   * @param {*} novel_url 
   * @param {*} novelInfo 
   */
  async updateNovel(novel){
    let novelLibrary = await NovelDexie.get(novel.url);
    if(!novelLibrary){
      return false; }
    novel = {...novelLibrary, ...novel};
    console.log("NOVEL UPDATED TO ", novel);
    await novel.save();
    return true;
  }

  /**
   * Stores the chapters of a novel in the database
   * @param {URL} novel_url - Novel's url
   * @param {Array} chapters - Array of chapter objects
   */
  async storeChapters(novel_url, chapters) {
    //get chapter meta of novel_url
    //calculate how many chunks to store all chapters
    //create those chunks and store their reference to chaptermeta
    //store those chapters in their respective chunks
    let chaptermeta = new ChapterMetaDexie(novel_url);
    let chunksneeded = Math.ceil(chapters.length / MAXCHAPTERSPERCHUNK);
    console.log(MAXCHAPTERSPERCHUNK);
    for (let i = 0; i < chunksneeded; i++) {
      await new Promise((resolve, reject) => {
        let chapterchunkid = novel_url + "ChapterChunk" + i;
        let chunk = new ChapterChunkDexie(
          novel_url + "ChapterChunk" + i,
          chaptermeta.novel_url
        );


        chunk.chapters = chapters.slice(
          i * MAXCHAPTERSPERCHUNK,
          (i + 1) * MAXCHAPTERSPERCHUNK
        );

        console.log("Loaded chapters to chunk", chapterchunkid);

        chunk.save().then( () => {
           chaptermeta.chapterchunks.push(chapterchunkid);
           resolve();
        });
      });
    }

    let novel = await NovelDexie.get(novel_url);
    novel.chaptersLoaded = true;
    novel.numberOfChapters = chapters.length;
    await novel.save();
    
    await chaptermeta.save();
  }

  /**
   * Stores the content of a chapter in the database
   * @param {URL} novel_url - Novel's url
   * @param {Int} chapterNumber - should be greater than 0
   * @param {*} content - chapter content
   */
  async storeChapterContent(novel_url, chapterNumber, content) {
    //get the chunk for the corresponding chapterNumber
    let chunkid =
      novel_url +
      "ChapterChunk" +
      Math.floor(chapterNumber / (MAXCHAPTERSPERCHUNK + 1));
    let chunk = await ChapterChunkDexie.get(chunkid);
    let chaptermeta = await ChapterMetaDexie.get(chunk.chaptermetaref);
    //store the content in the chunk
    chunk.chapters[(chapterNumber - 1) % MAXCHAPTERSPERCHUNK].content = content;
    //modify chaptermeta to reflect the new downloaded chapter
    chaptermeta.downloadedchapters[chapterNumber - 1] = 1;
    //save all
    try{
      await chunk.save();
    }catch(err){
      console.log("Error saving chunk", chunk);
      throw err;
    }

    try{
      await chaptermeta.save();
    }catch(err){
      console.log("Error saving chaptermeta", chaptermeta);
      throw err;
    }
  }

  /**
   * Gets the number of chapters of a particular novel
   * @param {URL} novel_url - Novel's url
   * @returns the number of chapters
   */
  async getNumberOfChapters(novel_url) {
    //get all chunks for novel_url
    let novel = await NovelDexie.get(novel_url);
    return novel.numberOfChapters;
  }

  /**
   * Gets all novels stored in the database
   * @returns {Array} - Array of novel objects
   */
  async getNovels() {
    return (await NovelDexie.getAll()).map((novel) => {
      delete novel.save;
      return novel;
    });
  }

  /**
   * Searches the novel
   * @param {String} novelName - Title of the novel
   * @returns {Array} - Array of novel objects
   */
  async searchNovel(novelName) {
    let novels = await this.getNovels();
    return novels
      .filter((novel) => {
        return compare(novel.title, novelName) > 0.5;
      })
      .map((novel) => {
        delete novel.save;
        return novel;
      });
  }

  /**
   * Gets the novel from the database
   * @param {URL} novel_url - Novel's url
   * @returns
   */
  async getNovel(novel_url) {
    let novel = await NovelDexie.get(novel_url);
    delete novel.save;
    return novel;
  }

  /**
   *  Gets the chapters of a novel
   * @param {URL} novel_url - Novel's url
   * @returns {Array} - Array of chapter objects
   */
  async getChapters(novel_url) {
    //get the chaptermeta using the novel_url
    let chaptermeta = await ChapterMetaDexie.get(novel_url);
    let chapters = [];
    for (let i = 0; i < chaptermeta.chapterchunks.length; i++) {
      let chunk = await ChapterChunkDexie.get(chaptermeta.chapterchunks[i]);
      chapters = [
        ...chapters,
        ...(chunk.chapters.map((ch) => {
          delete ch.content;
          return ch;
        }))
      ];
    }
    return chapters;
  }

  async getDownloadedChapters(novel_url){
    let chaptermeta = await ChapterMetaDexie.get(novel_url);
    return chaptermeta.downloadedchapters;
  }

  /**
   * Gets the content of a chapter
   * @param {URL} novel_url - Novel's url
   * @param {Int} chapterNumber - chapter number > 0
   * @returns the chapter content in String
   */
  async getChapterContent(novel_url, chapterNumber) {
    //get the chunk for the corresponding chapterNumber
    let chunkid =
      novel_url +
      "ChapterChunk" +  
      Math.floor(chapterNumber / (MAXCHAPTERSPERCHUNK + 1));
      console.log(chunkid);
    let chunk = await ChapterChunkDexie.get(chunkid);
    console.log("GET CHAPTE RCONTENT", chunk);
    if(!chunk) return null; 
    return chunk.chapters[(chapterNumber - 1) % MAXCHAPTERSPERCHUNK].content;
  }
}

export default NovelModelController;
