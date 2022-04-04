import { MenuItem } from "@szhsin/react-menu";
import React, { useState, useEffect } from "react";
import { useNovelInfoLibraryContext } from "../../../contexts/NovelInfoLibraryContext/NovelInfoLibraryContext";
import Liaison from "../../../functionalcomponents/Liaison/Liaison";
import useDownloader from "../../../hooks/useDownloader";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { MoonLoader } from "react-spinners";
import { useReader } from "../../../contexts/ReaderContext/ReaderProvider";

function chapterToTask(novelInfo, chapter, chapterIndex) {
    return {
        chapterIndex: chapterIndex,
        url: chapter.url,
        name: chapter.name,
        novel: novelInfo.url,
        source: novelInfo.source,
        id: novelInfo.url + chapter.url,
        type: "chaptercontent",
    };
}

function ChaptersTab({ librarian, novelInfo }) {
    const [chapters, setChapters] = useState([]);
    const [initDone, setInitDone] = useState(false);
    const [downloadedChapters, setDownloadedChapters] = useState([]);
    const { menuComponentId, setMenuComponentId, setMenuComponent } =
        useNovelInfoLibraryContext();

    const { functions: Downloader } = useDownloader();

    

    useEffect(() => {
        const ComponentId = 0;
        function Component(props) {
            function downloadAllChapters(){
                let tasks = chapters.map((chapter, index) => chapterToTask(novelInfo, chapter, index+1));
                let filteredTasks = tasks.filter( (task, index) => !downloadedChapters[task.chapterIndex])
                Downloader.bulkAddTask(filteredTasks);
            }
    
            function bulkRemoveTasks(){
                let tasks = chapters.map((chapter, index) => {
                    return {
                        id: novelInfo.url + chapter.url,
                    }
                });
                Downloader.bulkRemoveTask(tasks);
            }
    
            return (
                <>
                    <MenuItem onClick={downloadAllChapters}>Download all chapters</MenuItem>
                    <MenuItem onClick={bulkRemoveTasks}>Cancel all pending chapters</MenuItem>
                    <MenuItem>Close</MenuItem>
                </>
            );
        }

        setMenuComponentId(ComponentId);
        setMenuComponent(Component);
    }, [menuComponentId, setMenuComponent, setMenuComponentId, Downloader, chapters, novelInfo, downloadedChapters]);

    async function fetchChaptersInfo() {
        let chapters = await librarian.getChapters(novelInfo.url);
        if (chapters.length > 0) {
            setChapters(chapters);
            return;
        }
        chapters = await Liaison.getNovelChapters(
            novelInfo.url,
            novelInfo.source
        );
        if (chapters.length > 0) {
            await librarian.storeChapters(novelInfo.url, chapters);
            setChapters(chapters);
        }
    }

    useEffect(() => {
        let isMounted = true;
        librarian.getChapters(novelInfo.url).then((res) => {
            if (isMounted) {
                setChapters(res);
                setInitDone(true);
            }
        });

        librarian.getDownloadedChapters(novelInfo.url).then((res) => {
            if (isMounted) {
                setDownloadedChapters(res);
            }
        });

        librarian.setOnChapterContentChanged(() => {
            librarian.getDownloadedChapters(novelInfo.url).then((res) => {
                if (isMounted) {
                    setDownloadedChapters(res);
                }
            });
        });

        return () => {
            isMounted = false;
        };
    }, [librarian, novelInfo.url]);

    // set the downloads menu

    return (
        <>
            <div className="px-1" style={{ color: "#565656", height: "100%" }}>
                {chapters.length === 0 && initDone && (
                    <div className=" text-center ">
                        <h1 className="text-center text-gray-700 font-medium">
                            No chapters in library
                        </h1>
                        <p className="text-center text-sm text-gray-600 mt-1">
                            Add chapters to your library by clicking the button
                            below
                        </p>

                        <button
                            className="mt-6 bg-gray-400 text-white text-sm p-2 rounded"
                            onClick={fetchChaptersInfo}
                        >
                            Load chapters
                        </button>
                    </div>
                )}

                <MemoizedMyList chapters={chapters} novelInfo={novelInfo} downloadedChapters={downloadedChapters} />
                {/* <ul>
                    {chapters.length > 0 && chapters.slice(0,500).map((chapter, index) => (
                        <li key={index} className="flex py-2">
                            <div>
                                <h1 className="text-sm font-medium items-center">Chapter {index + 1}</h1>
                                <p className="text-xs">{chapter.name}</p>
                            </div>
                            
                            <div className="ml-auto flex items-center">
                                <svg width="20" height="20" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0V16.5625L2.71875 11.2812L1.28125 12.7188L8.28125 19.7188L9 20.4062L9.71875 19.7188L16.7188 12.7188L15.2812 11.2812L10 16.5625V0H8ZM0 22V24H18V22H0Z" fill="#6D6C6C"/>
                                </svg>

                            </div>

                        </li>
                    ))}
                </ul> */}
            </div>
        </>
    );
}




const Item = function ({data, index, style}) {
    const { functions: Downloader } = useDownloader();
    
    const { chapters, novelInfo, downloadedChapters, itemClick } = data;
    
    function handleClick() {
        let chapterInfo = chapters[index];
        chapterInfo.chapterIndex = index+1;
        itemClick(novelInfo, chapterInfo);
    }

    function download(e) {
        e.stopPropagation();
        let chapter = chapters[index];
        Downloader.addTask(chapterToTask(novelInfo, chapter, index + 1));
    }

    if(chapters[index] === undefined) { return null; }

    return (
        <div
            key={index}
            className="flex py-2 px-5 cursor-pointer"
            style={style}
            onClick={handleClick}
        >
            <div>
                <h1 className="text-sm font-medium items-center">
                    Chapter {index + 1}
                </h1>
                <p className="text-xs">{chapters[index].name}</p>
            </div>

            <div className="ml-auto flex items-center">
                {(downloadedChapters[index] && (
                    <svg
                        style={{
                            color: "#65C18C",
                        }}
                        className="fill-current"
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                )) ||
                    (Downloader.inQueue &&
                        Downloader.inQueue([
                            novelInfo.url + chapters[index].url,
                        ]) && (
                            <MoonLoader
                                color="blue"
                                loading={true}
                                size={18}
                            />
                        )) || (
                        <svg
                            onClick={download}
                            width="20"
                            height="20"
                            viewBox="0 0 18 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0V16.5625L2.71875 11.2812L1.28125 12.7188L8.28125 19.7188L9 20.4062L9.71875 19.7188L16.7188 12.7188L15.2812 11.2812L10 16.5625V0H8ZM0 22V24H18V22H0Z"
                                fill="#6D6C6C"
                            />
                        </svg>
                    )}
            </div>
        </div>
    );
};

function MyList({chapters, novelInfo, downloadedChapters}) {
    const { setReaderIsOpen, setReaderNovelInfo, setReaderChapterInfo, setReaderChapters } = useReader();

    function itemClick(novelInfo, chapterInfo) {
        setReaderNovelInfo(novelInfo);
        setReaderChapterInfo(chapterInfo);
        setReaderIsOpen(true);
        setReaderChapters(chapters);
    }


    return (
        <AutoSizer>
            {({ height, width }) => (
                <List
                    itemData={{chapters, novelInfo, downloadedChapters, itemClick}}
                    height={height}
                    itemCount={chapters.length}
                    itemSize={52}
                    width={width}
                    className="test"
                >
                    {Item}
                </List>
            )}
        </AutoSizer>
    );
}

const MemoizedMyList = React.memo(MyList);


export default ChaptersTab;
