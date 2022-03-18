import React, { createContext, useContext, useState, useEffect } from 'react';


const NovelInfoContext = createContext();

function NovelInfoLibraryProvider(props){
    const [menuComponent, setMenuComponent] = useState(null);

    return (
        <NovelInfoContext.Provider value={{menuComponent, setMenuComponent}}>
            {props.children}
        </NovelInfoContext.Provider>
    )
}

export default NovelInfoLibraryProvider;

function useNovelInfoLibraryContext(){
    const context = useContext(NovelInfoContext);
    if(!context) throw new Error("NovelInfoLibraryContext must be used within a NovelInfoLibraryProvider");
    return context;
}

export {useNovelInfoLibraryContext};