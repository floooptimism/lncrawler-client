const ChapterChunkDexie = require("../models/concretes/Dexie/ChapterChunkDexie");
const ChapterMetaDexie = require("../models/concretes/Dexie/ChapterMetaDexie");
const NovelDexie = require("../models/concretes/Dexie/NovelDexie");

const { compare } = require("string-compare");

const { MAXCHAPTERSPERCHUNK } = require("../models/constants");

class NovelModelController {
  /**
   * Stores the shitty novel
   * @param {Object} novel - Novel Object
   */
  async storeNovel(novel) {
    try {
      let nov = new NovelDexie(
        novel.source,
        novel.url,
        novel.title,
        novel.author,
        novel.cover,
        novel.description,
        novel.status,
        novel.genres,
        novel.tags,
        novel.type,
        novel.lastUpdate,
        novel.lastChapter,
        novel.views,
        novel.rating
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
    for (let i = 0; i < chunksneeded; i++) {
      await new Promise(async (resolve, reject) => {
        let chapterchunkid = novel_url + "ChapterChunk" + i;
        let chunk = new ChapterChunkDexie(
          novel_url + "ChapterChunk" + i,
          chaptermeta.novel_url
        );

        chunk.chapters = chapters.slice(
          i * MAXCHAPTERSPERCHUNK,
          (i + 1) * MAXCHAPTERSPERCHUNK
        );

        await chunk.save();
        chaptermeta.chapterchunks.push(chapterchunkid);
        resolve();
      });
    }
    chaptermeta.numberOfChapters = chapters.length;
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
    console.log("This is chunk -> ", chunk);
    let chaptermeta = await ChapterMetaDexie.get(chunk.chaptermetaref);
    console.log(chaptermeta);
    //store the content in the chunk
    chunk.chapters[(chapterNumber - 1) % MAXCHAPTERSPERCHUNK].content = content;
    //modify chaptermeta to reflect the new downloaded chapter
    chaptermeta.downloadedchapters[chapterNumber - 1] = 1;
    //save all
    await chunk.save();
    await chaptermeta.save();
  }

  /**
   * Gets the number of chapters of a particular novel
   * @param {URL} novel_url - Novel's url
   * @returns the number of chapters
   */
  async getNumberofChapters(novel_url) {
    //get all chunks for novel_url
    let chaptermeta = await ChapterMetaDexie.get(novel_url);
    return chaptermeta.numberOfChapters;
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
        chunk.chapters.map((ch) => {
          delete ch.content;
          return ch;
        }),
      ];
    }
    return chapters;
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
      Math.floor(chapterNumber / MAXCHAPTERSPERCHUNK + 1);
    let chunk = await ChapterChunkDexie.get(chunkid);
    return chunk.chapters[(chapterNumber - 1) % MAXCHAPTERSPERCHUNK].content;
  }
}

export default NovelModelController;
