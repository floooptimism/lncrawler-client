import React, { useState, useEffect } from "react";

import ChaptersTab from "./ChaptersTab";
import InformationTab from "./InformationTab";

import styles from './Tabs.module.css';

function Tabs(props) {
    const [active, setActive] = useState(0);
    const [tabs, setTabs] = useState([
        ["Information", InformationTab],
        ["Chapters", ChaptersTab],
    ]);

    return (
        <div className="h-full">
            <div>
                <ul className={styles.Tabs}>
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`${
                                active === index
                                    ? styles.TabSelected
                                    : styles.TabNotSelected
                            } px-2 py-1 mr-2 cursor-pointer text-sm`}
                            onClick={() => setActive(index)}
                        >
                            {tab[0]}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="px-4 h-full">
                <MemRenderActive {...props} tabs={tabs} active={active}/>
            </div>
        </div>
    );
}

function RenderActiveTab(props) {
    let ActiveTab = props.tabs[props.active][1];
    let newProp = {...props};
    delete newProp.tabs;
    useEffect( () => {
        if(props.active === 1){
            props.setMoreDownloadOptionsMenu(true);
            return;
        }
        props.setMoreDownloadOptionsMenu(false);
    }, [props])

    return <ActiveTab {...newProp} />;
}

const MemRenderActive = React.memo(RenderActiveTab);


export default Tabs;
