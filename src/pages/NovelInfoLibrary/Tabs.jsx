import React, { useState, useEffect } from "react";
import Liaison from "../../functionalcomponents/Liaison/Liaison";

import styles from "./Tabs.module.css";

import { FixedSizeList as List} from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

function Tabs(props) {
    const [active, setActive] = useState(0);
    const [tabs, setTabs] = useState([
        ["Information", InformationTab],
        ["Chapters", ChaptersTab],
    ]);

    function RenderActiveTab(props) {
        let ActiveTab = tabs[active][1];
        return <ActiveTab {...props} />;
    }

    return (
        <div className="h-full">
            <div>
                <ul className="flex justify-evenly border-b border-gray-300">
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`${
                                active === index
                                    ? "font-medium border-b-2 border-gray-400"
                                    : ""
                            } px-2 py-1 mr-2 cursor-pointer text-sm`}
                            style={{
                                color: "#565656",
                            }}
                            onClick={() => setActive(index)}
                        >
                            {tab[0]}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-4 pt-5 h-full">
                <RenderActiveTab {...props}/>
            </div>
        </div>
    );
}





function InformationTab(props) {
    return (
        <>
            {/* chapters and reading progress */}
            <div className="flex justify-between">
                <div className={styles.Attribute}>
                    <h1>Chapters</h1>
                    <p>800</p>
                </div>
                <div className={styles.Attribute}>
                    <h1>Reading progress</h1>
                    <p>80%</p>
                </div>
            </div>

            {/* description */}
            <div className={styles.Attribute + " mt-6"}>
                <h1>Description</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, urna eu tincidunt consectetur, nisi
                    nisl aliquam nunc, eget consectetur nisl nunc eget nisl.
                </p>
            </div>
        </>
    );
}

function ChaptersTab({librarian, novelInfo}) {
    const [chapters, setChapters] = useState([]);

    async function downloadChapters(){
        let chapters = await Liaison.getNovelChapters(novelInfo.url, novelInfo.source);
        if(chapters.length > 0){
            await librarian.storeChapters(novelInfo.url, chapters);
            setChapters(chapters);
        }
    }

    window.liaison = Liaison;
    window.librarian = librarian;
    
    useEffect(()=>{
        librarian.getChapters(novelInfo.url).then(res => {
            setChapters(res);
        })
    }, [librarian, novelInfo.url]);

    const Item = function ({index, style}){
        return (
            <div key={index} className="flex py-2" style={style}>
                <div>
                    <h1 className="text-sm font-medium items-center">Chapter {index + 1}</h1>
                    <p className="text-xs">{chapters[index].name}</p>
                </div>
                
                <div className="ml-auto flex items-center">
                    <svg width="20" height="20" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0V16.5625L2.71875 11.2812L1.28125 12.7188L8.28125 19.7188L9 20.4062L9.71875 19.7188L16.7188 12.7188L15.2812 11.2812L10 16.5625V0H8ZM0 22V24H18V22H0Z" fill="#6D6C6C"/>
                    </svg>
    
                </div>
    
            </div>
        )
    }


    return (
        <>
            <div className="px-4" style={{color: "#565656",height:"100%"}}>
                {chapters.length === 0 && (
                    <div>
                        <h1 className="text-center">No chapters in library</h1>
                        <p className="text-center">
                            Add chapters to your library by clicking the button
                            below
                            </p>
                            <button onClick={downloadChapters}>Load chapters</button>
                    </div>
                )}

                {chapters.length > 0 && (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                height={height}
                                itemCount={chapters.length}
                                itemSize={35}
                                width={width}
                            >
                                {Item}

                            </List>
                        )}
                    </AutoSizer>
                )}
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




export default Tabs;
