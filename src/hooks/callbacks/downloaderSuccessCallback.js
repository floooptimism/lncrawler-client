import Librarian from "../../functionalcomponents/Librarian/Librarian";


// I want to store those downloaded results into DB
async function successCallback(param, callback){
    // 
    console.log("SUCCESSCALLBACK")
    await Librarian.storeChapterContent(param.task.novel, param.task.chapterIndex, param.result);
}

export default successCallback;