import React, { createContext, useContext } from 'react';

import useDownloader from '../../hooks/useDownloader';

const DownloaderContext = createContext();

function DownloaderProvider(props) {
    const {tasks, currentTask, isRunning, functions} = useDownloader();
    
    return (
        <DownloaderContext.Provider value={{tasks, currentTask, isRunning, functions}}>
            {props.children}
        </DownloaderContext.Provider>
    )
}

export default DownloaderProvider;

export function useDownloaderContext() {
    return useContext(DownloaderContext);
}