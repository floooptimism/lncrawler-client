const axios = require('axios');

class Liaison{
    constructor(){
        this.backendURL = 'https://lncrawler.azurewebsites.net';
    }

    //TODO: ERROR HANDLING FOR EVERYTHING!!!!!

    async getNovelInfo(novelURL, novelSource){
        const postfix = "/novelinfo";
        const param_scraperSource = "scraperSource=" + novelSource;
        const param_novelURL = "novelURL=" + novelURL;
        const url = this.backendURL + postfix + "?" + param_scraperSource + "&" + param_novelURL;

        try{
            let res = await axios.get(url);
            console.log(res);
            return res.data;
        }catch(err){
            return null;
        }

    }


    async getNovelChapters(novelURL, novelSource){
        const postfix = "/chapters";
        const param_scraperSource = "scraperSource=" + novelSource;
        const param_novelURL = "novelURL=" + novelURL;
        const url = this.backendURL + postfix + "?" + param_scraperSource + "&" + param_novelURL;

        try{
            let res = await axios.get(url);
            console.log("getNovelChapters result!!!!");
            console.log(res);
            return res.data;
        }catch(err){
            // handle error
            console.log("getNovelChapters error!!!!");
            console.log(err);
            return null;
        }
    
    }


    async searchNovel(novelName, novelSource){
        const postfix = "/search";
        const param_scraperSource = "scraperSource=" + novelSource;
        const param_novelName = "novelName=" + novelName;
        const url = this.backendURL + postfix + "?" + param_scraperSource + "&" + param_novelName;

        try{
            let res = await axios.get(url);
            console.log("Search novel result!!!!");
            console.log(res);
            return res.data;
        }catch(err){
            console.log("Search novel error!!!!");
            console.log(err);
            return null;
        }

    }

    
    async getNovelChapterContent(chapterURL, novelSource){
        const postfix = "/chaptercontent";
        const param_scraperSource = "scraperSource=" + novelSource;
        const param_chapterURL = "chapterURL=" + chapterURL;
        const url = this.backendURL + postfix + "?" + param_scraperSource + "&" + param_chapterURL;

        try{
            let res = await axios.get(url);
            console.log(res);
            return res.data;
        }catch(err){
            console.log(err);
            return null;
        }

    }

}

export default Liaison;