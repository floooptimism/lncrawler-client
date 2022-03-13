import React, { useState, useEffect } from "react";
import styles from "./NovelInfoLibrary.module.css";
import Tabs from "./Tabs";

import useLibrarian from "../../hooks/useLibrarian";
import Liaison from "../../functionalcomponents/Liaison/Liaison";


function NovelInfoLibrary({ onClose, url, open }) {
    const [novelInfo, setNovelInfo] = useState(null);
    const {novels, novelIds, librarian} = useLibrarian();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!novelInfo) return;        
        if(!novelInfo.loaded){
            setLoading(true);
            Liaison.getNovelInfo(url, novelInfo.source).then(res => {
                res.loaded = true;
                librarian.updateNovel(res);
                setNovelInfo(res);
                setLoading(false);
            });
        }
    },[novelInfo])
    
    // load novel info
    useEffect(() => {
        setLoading(true);
        if(librarian.getNovelInfo){
            setNovelInfo(librarian.getNovelInfo(url));
        }
        setLoading(false);
    },[url])



    if(loading){
        return (
            <div className={
                styles.NovelInfoContainer +
                " " +
                (open ? styles.NovelInfoContainerShow : "")
            }>
                <div>Loading</div>
            </div>
        )
    }


    return (
        <div
            className={
                styles.NovelInfoContainer +
                " " +
                (open ? styles.NovelInfoContainerShow : "")
            }
        >
            {/* topbar */}
            <div className={styles.TopBar}>
                <div onClick={onClose} className="flex items-center cursor-pointer">
                    <svg
                        className="mr-2"
                        height="20"
                        width="20"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>ionicons-v5-a</title>
                        <polyline
                            style={{
                                fill: "none",
                                stroke: "#616161",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "48px",
                            }}
                            points="328 112 184 256 328 400"
                        />
                    </svg>
                    <h6>Back</h6>
                </div>
            </div>

            {/* brief info */}
            <div className={styles.SummarizeInfo}>
                {/* cover image */}
                <div className={styles.Image}></div>

                {/* some stuffs */}
                <div className={styles.Info}>
                    {/* title and author */}
                    <div className={styles.TitleAndAuthorContainer}>
                        <h1 className={styles.Title}>{novelInfo && novelInfo.title}</h1>
                        <h6 className={styles.Author}>{novelInfo && novelInfo.author}</h6>
                    </div>

                    {/* heart and read button */}
                    <div className={styles.HeartAndRead}>
                        <div className={styles.Heart}>
                            <svg
                                viewBox="0 0 2048 2048"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1889 287q53 53 88.5 116t53 131 17.5 138.5-17.5 138-53 130.5-88.5 116l-865 864-865-864q-53-53-88.5-116t-53-130.5T0 672.5 17.5 534t53-131T159 287q78-77 177-118t208-41 208 41 177 118l95 96 95-96q78-77 177-118t208-41 208 41 177 118z" />
                            </svg>
                        </div>

                        <div className={styles.ReadButton}>
                            <button>
                                Read
                            </button>
                        </div>
                    </div>


                </div>
            </div>

            {/* tabs */}
            <Tabs />

            {/* tabs content */}
            <div></div>
        </div>
    );
}

export default NovelInfoLibrary;
