import React, { useState, useEffect } from "react";
import useLibrarian from "../../hooks/useLibrarian";
import Liaison from "../../functionalcomponents/Liaison/Liaison";
import ArrowRight from '../svgs/ArrowRight';
import ArrowLeft from '../svgs/ArrowLeft';

import styles from "./Reader.module.css";

import scrollControlFunctions from "../../util/disableScrolling";
import { useReader } from "../../contexts/ReaderContext/ReaderProvider";
import { useReaderAppearance } from "./hooks/useReaderAppearance";

const { disableScroll, enableScroll } = scrollControlFunctions;

function Reader() {
    const { setReaderIsOpen, readerNovelInfo, readerChapterInfo, prevAndNextTracker, nextChapter, prevChapter} = useReader();

    const {
        fontSize,
        backgroundColor,
        fontColor,
        incrementFontSize,
        decrementFontSize,
        setFontColor,
        setBackgroundColor,
    } = useReaderAppearance();

    const [content, setContent] = useState("");

    const [isFetching, setIsFetching] = useState(true);

    // ui flags
    const [chapterNavIsOpen, setChapterNavIsOpen] = useState(true);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    const { librarian } = useLibrarian();
  
    function next(){
      nextChapter();
    }
    
    function prev(){
      prevChapter();
    }

    useEffect(() => {
        disableScroll();
        return () => {
            enableScroll();
        };
    });


    useEffect(() => {
        // get novel info if novelID changes
        let isMounted = true;
        if (!readerNovelInfo) return;
        setIsFetching(true);
        setContent("");
        librarian
            .getChapterContent(readerNovelInfo.url, readerChapterInfo.chapterIndex)
            .then((res) => {
                if(res) {
                    if (isMounted) {
                        setContent(res);
                        setIsFetching(false);
                    }
                } else {
                    // fetch from network
                    Liaison.getNovelChapterContent(
                        readerChapterInfo.url,
                        readerNovelInfo.source
                    ).then((res) => {
                        if (res) {
                            if (isMounted) {
                                setContent(res);
                                setIsFetching(false);
                            }
                        }
                    });
                }
            });

        return () => {
            isMounted = false;
        };
    }, [readerNovelInfo, readerChapterInfo, librarian]);

    function closeReader() {
        setReaderIsOpen(false);
    }

    function detectScreen() {
        // if "block" then it's a mobile device, else it's a desktop device
        let display = window.getComputedStyle(
            document.getElementById("device-detector")
        ).display;
        if (display === "block") {
            return "mobile";
        }
        return "desktop";
    }

    function handleClickForMobile() {
        let device = detectScreen();
        if (device === "mobile") {
            if (chapterNavIsOpen && settingsIsOpen) {
                setSettingsIsOpen(false);
                return;
            }
            setChapterNavIsOpen(!chapterNavIsOpen);
        }
    }

    return (
        <div className={styles.Container} onClick={handleClickForMobile}>
            <div id="device-detector" className="absolute md:hidden"></div>
            {/* content */}
            {content.trim() !== "" && (

                <div
                    className={`${styles.Content} ${
                        settingsIsOpen ? styles.ContentSettingsOpen : ""
                    }`}
                    style={{
                        backgroundColor: backgroundColor,
                        color: fontColor,
                        fontSize: fontSize,
                    }}
                >
                    {content}
                </div>
            )}

            {/* topbar */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles.TopBar} ${
                    chapterNavIsOpen ? "" : styles.TopBarClose
                } ${settingsIsOpen ? styles.TopBarSettingsOpen : ""}`}
            >
                {/* exit */}
                <div
                    className="flex items-center cursor-pointer justify-center text-white"
                    onClick={closeReader}
                >
                    <svg
                        height="24"
                        width="24"
                        className="text-white fill-current md:mr-3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
                    </svg>
                    <span className="hidden md:inline">Exit</span>
                </div>

                {/* chapter info */}
                <div className="text-white text-xs md:text-base">
                    {readerChapterInfo.name}
                </div>

                {/* appearance settings */}
                <div
                    className={`${styles.AppearanceSettingsButton} cursor-pointer ${
                        settingsIsOpen
                            ? styles.AppearanceSettingsButtonActive
                            : ""
                    }`}
                    onClick={() => setSettingsIsOpen(!settingsIsOpen)}
                >
                    <svg
                        className="fill-current md:mr-3"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                    </svg>
                    <span className="hidden md:inline text-sm">Appearance</span>
                </div>
            </div>

            {/* next and prev page */}
            <div
                className={`${styles.ChapterNav} ${
                    chapterNavIsOpen ? "" : styles.ChapterNavClose
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div onClick={prev}>Prev Chapter</div>
                <div onClick={next}>Next Chapter</div>
            </div>

            <div className={`${styles.ChapterNavDesktop}`}>
                <div onClick={prev}>
                  <ArrowLeft fill="#fff"/>
                  <span>Prev Page</span>
                </div>
                <div onClick={next}>
                  <span>
                    Next Page
                  </span>
                  <ArrowRight fill="#fff"/>
                </div>
                
            </div>

            {/* appearance control */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${styles.AppearanceControl} ${
                    settingsIsOpen
                        ? styles.AppearanceControlOpen
                        : styles.AppearanceControlClose
                }`}
            >
                {/* font size */}
                <div>
                    <span>Font Size</span>
                    {/* font size ui component increment and decrement */}
                    <div className={styles.Control}>
                        {/* minus icon */}
                        <div
                            className={styles.FontSizeControlIcon}
                            onClick={decrementFontSize}
                        >
                            <svg
                                height="17px"
                                width="17px"
                                version="1.1"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>minus-circle</title>
                                <defs />
                                <g
                                    id="Page-1"
                                    fill="none"
                                    fillRule="evenodd"
                                    stroke="none"
                                    strokeWidth="1"
                                >
                                    <g
                                        id="Icon-Set-Filled"
                                        fill="#ECECEC"
                                        transform="translate(-518.000000, -1089.000000)"
                                    >
                                        <path
                                            id="minus-circle"
                                            d="M540,1106 L528,1106 C527.447,1106 527,1105.55 527,1105 C527,1104.45 527.447,1104 528,1104 L540,1104 C540.553,1104 541,1104.45 541,1105 C541,1105.55 540.553,1106 540,1106 L540,1106 Z M534,1089 C525.163,1089 518,1096.16 518,1105 C518,1113.84 525.163,1121 534,1121 C542.837,1121 550,1113.84 550,1105 C550,1096.16 542.837,1089 534,1089 L534,1089 Z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>

                        {/* font size */}
                        <div className={styles.FontSizeControlValue}>
                            <span>{fontSize}px</span>
                        </div>

                        {/* plus icon */}
                        <div
                            className={styles.FontSizeControlIcon}
                            onClick={incrementFontSize}
                        >
                            <svg
                                height="17px"
                                width="17px"
                                version="1.1"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>plus-circle</title>
                                <defs />
                                <g
                                    id="Page-1"
                                    fill="none"
                                    fillRule="evenodd"
                                    stroke="none"
                                    strokeWidth="1"
                                >
                                    <g
                                        id="Icon-Set-Filled"
                                        fill="#ECECEC"
                                        transform="translate(-466.000000, -1089.000000)"
                                    >
                                        <path
                                            id="plus-circle"
                                            d="M488,1106 L483,1106 L483,1111 C483,1111.55 482.553,1112 482,1112 C481.447,1112 481,1111.55 481,1111 L481,1106 L476,1106 C475.447,1106 475,1105.55 475,1105 C475,1104.45 475.447,1104 476,1104 L481,1104 L481,1099 C481,1098.45 481.447,1098 482,1098 C482.553,1098 483,1098.45 483,1099 L483,1104 L488,1104 C488.553,1104 489,1104.45 489,1105 C489,1105.55 488.553,1106 488,1106 L488,1106 Z M482,1089 C473.163,1089 466,1096.16 466,1105 C466,1113.84 473.163,1121 482,1121 C490.837,1121 498,1113.84 498,1105 C498,1096.16 490.837,1089 482,1089 L482,1089 Z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* background color */}
                <div>
                    <span>Background Color</span>
                    {/* font size ui component increment and decrement */}
                    <div className={styles.Control}>
                        {/* <div className={styles.ControlButton}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 512 512"
                                fill="#ECECEC"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>ionicons-v5-m</title>
                                <path d="M441,336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77,5.34-9.94l30.28-26.87c25.92-22.91,40.2-53.66,40.2-86.59S449.73,119.92,423.78,97c-35.89-31.59-85-49-138.37-49C223.72,48,162,71.37,116,112.11c-43.87,38.77-68,90.71-68,146.24s24.16,107.47,68,146.23c21.75,19.24,47.49,34.18,76.52,44.42a266.17,266.17,0,0,0,86.87,15h1.81c61,0,119.09-20.57,159.39-56.4,9.7-8.56,15.15-20.83,15.34-34.56C456.14,358.87,450.56,345.09,441,336.2ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z" />
                            </svg>
                        </div> */}
                        <input className={`${styles.InputColor}`} onChange={e => setBackgroundColor(e.target.value)} type="color"  value={backgroundColor}/>
                    </div>
                </div>

                {/* font color */}
                <div>
                    <span>Font Color</span>
                    {/* font size ui component increment and decrement */}
                    <div className={styles.Control}>
                        {/* <div className={styles.ControlButton}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 512 512"
                                fill="#ECECEC"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>ionicons-v5-m</title>
                                <path d="M441,336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77,5.34-9.94l30.28-26.87c25.92-22.91,40.2-53.66,40.2-86.59S449.73,119.92,423.78,97c-35.89-31.59-85-49-138.37-49C223.72,48,162,71.37,116,112.11c-43.87,38.77-68,90.71-68,146.24s24.16,107.47,68,146.23c21.75,19.24,47.49,34.18,76.52,44.42a266.17,266.17,0,0,0,86.87,15h1.81c61,0,119.09-20.57,159.39-56.4,9.7-8.56,15.15-20.83,15.34-34.56C456.14,358.87,450.56,345.09,441,336.2ZM112,208a32,32,0,1,1,32,32A32,32,0,0,1,112,208Zm40,135a32,32,0,1,1,32-32A32,32,0,0,1,152,343Zm40-199a32,32,0,1,1,32,32A32,32,0,0,1,192,144Zm64,271a48,48,0,1,1,48-48A48,48,0,0,1,256,415Zm72-239a32,32,0,1,1,32-32A32,32,0,0,1,328,176Z" />
                            </svg>
                        </div> */}
                        <input className={`${styles.InputColor}`} type="color" onChange={e => setFontColor(e.target.value)}  value={fontColor}/>
                    </div>
                </div>
            </div>

            {/* loading */}
            {isFetching && (
                <div className={styles.Loading}>
                    <div className="px-4 py-4 w-full">
                        <button className="underline" onClick={closeReader}>Cancel</button>
                    </div>
                    <div className={styles.LoadingText}>
                        Loading content...  
                        <h1>{readerChapterInfo.name}</h1>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reader;
