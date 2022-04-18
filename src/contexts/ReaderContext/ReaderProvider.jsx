import React, { useState, useEffect, useContext, createContext } from "react";

const ReaderContext = createContext();

function ReaderProvider(props) {
    const [readerIsOpen, setReaderIsOpen] = useState(false);
    const [readerData, setReaderData] = useState({});
    return (
        <ReaderContext.Provider
            value={{
                readerIsOpen,
                setReaderIsOpen,    
                readerData,
                setReaderData
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
