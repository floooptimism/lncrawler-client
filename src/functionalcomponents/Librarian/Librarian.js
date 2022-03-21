import NovelModelController from '../../controllers/NovelModelController';

class Librarian{
    constructor(novelController){
        this.novelController = novelController;
        this.onChapterContentChanged = function () {};
    }

    setOnChapterContentChanged(fnc){
        this.onChapterContentChanged = fnc;
    }

    async addNovel(novel){
        return await this.novelController.storeNovel(novel);
    }

    async deleteNovel(novel_url){
        return await this.novelController.deleteNovel(novel_url);
    }

    async updateNovel(novel){
        return await this.novelController.updateNovel(novel);
    }

    async getDownloadedChapters(novel_url){
        return await this.novelController.getDownloadedChapters(novel_url);
    }

    async getAllNovels(){
        return await this.novelController.getNovels()    
    }

    async getNumberOfChapters(novel_url){
        return await this.novelController.getNumberOfChapters(novel_url);
    }

    async getNovel(novel_url){
        return await this.novelController.getNovel(novel_url);
    }

    async storeChapters(novel_url, chapters){
        await this.novelController.storeChapters(novel_url, chapters);
    }

    async storeChapterContent(novel_url, chapterNumber, content){
        await this.novelController.storeChapterContent(novel_url, chapterNumber, content);
        this.onChapterContentChanged();
    }

    async getChapters(novel_url){
        return await this.novelController.getChapters(novel_url);
    }

    async getChapterContent(novel_url, chapterNumber){
        return await this.novelController.getChapterContent(novel_url, chapterNumber);
    }


}


export default (new Librarian(new NovelModelController()));