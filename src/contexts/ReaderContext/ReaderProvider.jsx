import React, { useState, useEffect, useContext, createContext } from "react";

const ReaderContext = createContext();

function ReaderProvider(props) {
    const [readerIsOpen, setReaderIsOpen] = useState(false);
    const [readerNovelInfo, setReaderNovelInfo] = useState(null);
    const [readerChapterInfo, setReaderChapterInfo] = useState(null);
    const [readerChapters, setReaderChapters] = useState([]);
    const [prevAndNextTracker, setPrevAndNextTracker] = useState([false, false]);

    useEffect( () => {
      if(!readerNovelInfo) return;

      function hasPrevChapter(){
        let chapterIndex = readerChapterInfo.chapterIndex;
        return chapterIndex > 1;
      }
    
      function hasNextChapter(){
        let chapterIndex = readerChapterInfo.chapterIndex;
        return chapterIndex < readerNovelInfo.numberOfChapters;
      }

      setPrevAndNextTracker([hasPrevChapter(), hasNextChapter()])

    }, [readerChapterInfo, readerChapters,readerNovelInfo])
  
    function nextChapter(){
      
    }


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
                setReaderChapters
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
