import React, { useState, useEffect } from 'react';

// HOOKS
function useFontSize() {
    const [fontSize, setFontSize] = useState(12);

    function incrementFontSize() {
        setFontSize(fontSize + 1);
    }

    function decrementFontSize() {
        setFontSize(fontSize - 1);
    }

    return {
        fontSize,
        incrementFontSize,
        decrementFontSize,
        setFontSize,
    };
}

function useBackgroundColor() {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    return {
        backgroundColor,
        setBackgroundColor,
    };
}

function useFontColor() {
    const [fontColor, setFontColor] = useState("#000000");

    return {
        fontColor,
        setFontColor,
    };
}

function useReaderAppearance() {
    const {backgroundColor, setBackgroundColor} = useBackgroundColor();
    const {fontColor, setFontColor} = useFontColor();
    const { fontSize, incrementFontSize, decrementFontSize, setFontSize } =
        useFontSize();

    // load data from local storage
    useEffect(() => {
        const localStorageData = localStorage.getItem("readerAppearance"); 

        // if there's no data in local storage, set default values
        if (!localStorageData) {
            setBackgroundColor("#ffffff");
            setFontColor("#000000");
            setFontSize(12);
        }else{
            const parsedData = JSON.parse(localStorageData);
            setBackgroundColor(parsedData.backgroundColor);
            setFontColor(parsedData.fontColor);
            setFontSize(parsedData.fontSize);
        }

    }, []);

    // save data every state change
    useEffect(() => {
        const dataToSave = {
            backgroundColor,
            fontColor,
            fontSize,
        };
        localStorage.setItem("readerAppearance", JSON.stringify(dataToSave));
    }, [backgroundColor, fontColor, fontSize]);

    return {
        backgroundColor,
        setBackgroundColor,
        fontColor,
        setFontColor,
        fontSize,
        incrementFontSize,
        decrementFontSize,
    };
}

export  { useReaderAppearance };