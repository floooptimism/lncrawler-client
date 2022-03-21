import React, { createContext, useContext } from 'react';

import useDownloader from '../../hooks/useDownloader';

const DownloaderContext = createContext();

function DownloaderProvider(props) {
    const {currentTask, isRunning, functions} = useDownloader();
    
    return (
        <DownloaderContext.Provider value={{currentTask, isRunning, functions}}>
            {props.children}
        </DownloaderContext.Provider>
    )
}

export default DownloaderProvider;

export function useDownloaderContext() {
    return useContext(DownloaderContext);
}