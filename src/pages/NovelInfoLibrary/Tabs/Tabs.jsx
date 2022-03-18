import React, { useState, useEffect } from "react";

import ChaptersTab from "./ChaptersTab";
import InformationTab from "./InformationTab";

function Tabs(props) {
    const [active, setActive] = useState(0);
    const [tabs, setTabs] = useState([
        ["Information", InformationTab],
        ["Chapters", ChaptersTab],
    ]);

    function RenderActiveTab(props) {
        let ActiveTab = tabs[props.active][1];
        
        useEffect( () => {
            if(props.active === 1){
                props.setMoreDownloadOptionsMenu(true);
                return;
            }
            props.setMoreDownloadOptionsMenu(false);
        }, [props])

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

            <div className="px-4 h-full">
                <RenderActiveTab {...props} active={active}/>
            </div>
        </div>
    );
}

export default Tabs;
