import React, { useState, useEffect, useContext, createContext } from "react";

const ReaderContext = createContext();

function ReaderProvider(props) {
    const [readerIsOpen, setReaderIsOpen] = useState(false);
    const [readerNovelInfo, setReaderNovelInfo] = useState(null);
    const [readerChapterInfo, setReaderChapterInfo] = useState(null);
    const [readerChapters, setReaderChapters] = useState([]);
    const [prevAndNextTracker, setPrevAndNextTracker] = useState([false, false]);
  
    function setNewChapterInfo(oldIndex, newIndex){
      let url = readerChapters[oldIndex].url;
      let name = readerChapters[oldIndex].name;
      let newChapterInfo = {
        chapterIndex:newIndex,
        url: url,
        name: name
      }
      setReaderChapterInfo(newChapterInfo);
    }

    function prevChapter(){
      if(!prevAndNextTracker[0]) return;
      let newIndex = readerChapterInfo.chapterIndex - 1;
      // actual index if 0-based is chapterIndex - 1, so 2 steps back for previous chapter's index
      setNewChapterInfo(readerChapterInfo.chapterIndex-2, newIndex);
    }

    function nextChapter(){
      if(!prevAndNextTracker[1]) return;
      let newIndex = readerChapterInfo.chapterIndex + 1;
      setNewChapterInfo(readerChapterInfo.chapterIndex, newIndex);
    }

    useEffect( () => {
      if(!readerNovelInfo) return;
      console.log("GOT CALLED");

      function hasPrevChapter(){
        let chapterIndex = readerChapterInfo.chapterIndex;
        return chapterIndex > 1;
      }
    
      function hasNextChapter(){
        let chapterIndex = readerChapterInfo.chapterIndex;
        return chapterIndex < readerChapters.length;
      }

      setPrevAndNextTracker([hasPrevChapter(), hasNextChapter()])

    }, [readerChapters,readerNovelInfo])
  
    return (
        <ReaderContext.Provider
            value={{
                readerIsOpen,
                setReaderIsOpen,    
                readerNovelInfo,
                setReaderNovelInfo,
                readerChapterInfo,
                setReaderChapterInfo,
                readerChapters,
                prevAndNextTracker,
                setReaderChapters,
                prevChapter,
                nextChapter
            }}
        >
            {props.children}
        </ReaderContext.Provider>
    );
}


export default ReaderProvider;


function useReader() {
    const context = useContext(ReaderContext);
    if (!context) {
        throw new Error("useReader must be used within a ReaderProvider");
    }
    return context;
}

export  {useReader};
