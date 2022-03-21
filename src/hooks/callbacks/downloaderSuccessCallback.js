import Librarian from "../../functionalcomponents/Librarian/Librarian";


// I want to store those downloaded results into DB
async function successCallback(param, callback){
    // 
    console.log("success callback ->", param);
    let content = await param.result.text();
    await Librarian.storeChapterContent(param.task.novel, param.task.chapterIndex, content);
}

export default successCallback;