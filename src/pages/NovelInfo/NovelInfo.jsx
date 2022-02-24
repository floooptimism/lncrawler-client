import React, { useEffect, useState } from "react";
import Liaison from "../../functionalcomponents/Liaison/Liaison";
import useLibrarian from "../../hooks/useLibrarian";
import styles from "./NovelInfo.module.css";


function NovelInfo(props) {
    const [novelInfo, setNovelInfo] = useState({});
    const {novelIds, librarian} = useLibrarian();
    const [exist, setExist] = useState(props.url in novelIds);


    // add to library
    function toggleInLibrary() {
        if (exist) {
            // remove from library
            librarian.removeNovel(props.url);
        } else {
            // add to library
            librarian.addNovel({...novelInfo, loaded:true});
        }
    }

    useEffect( function checkIfExist(){
        if (props.url in novelIds) {
            setExist(true);
        } else {
            setExist(false);
        }
    },[props.url, novelIds]);
    

    useEffect(() => {
        if(exist){
            // get info from library
            librarian.getNovelInfo(props.url).then( result => setNovelInfo(result));
            return;
        }
        // get info from api
        Liaison.getNovelInfo(props.url, props.source).then(res => setNovelInfo(res));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.url, props.source]);

    useEffect(()=>{
        if(exist){
            if(!novelInfo.loaded){
                // fetch info from api
                Liaison.getNovelInfo(props.url, props.source).then(res => {
                    res.loaded = true;
                    librarian.updateNovel(res);
                    setNovelInfo(res);
                });
                return;
            }
        }
    }, [novelInfo])

    return (
        <div className={styles.background}>
            <div className={styles.NovelInfo}>
                {/* fixed topbar */}
                <div className={styles.NovelInfoTopBar}>
                    {/* go back icon */}
                    <div className={styles.NovelInfoTopBarIcon}>
                        <svg
                            onClick={props.onClose}
                            height="24"
                            width="24"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M42 22H13.66l7.17-7.17L18 12 6 24l12 12 2.83-2.83L13.66 26H42z" />
                        </svg>
                    </div>

                    {/* title */}
                    {/* <div className={styles.NovelInfoTopBarTitle}>
                        Novel Info
                    </div> */}

                    {/* ellipsis icon*/}
                    <div className={styles.NovelInfoTopBarIcon}>
                        <svg
                            height="20"
                            width="20"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>ionicons-v5-f</title>
                            <circle cx="256" cy="256" r="48" />
                            <circle cx="256" cy="416" r="48" />
                            <circle cx="256" cy="96" r="48" />
                        </svg>
                    </div>
                </div>

                <div className={styles.NovelInfoContent}>
                    {/* image cover */}
                    <div className={styles.CoverContainer}>
                        <div className={styles.Cover}>
                            <img src={novelInfo.cover} alt="cover" />
                        </div>
                    </div>

                    {/* add to library button */}
                    <div className={styles.AddToLibraryButton}>
                        <button onClick={toggleInLibrary} className={exist ? styles.AddToLibraryButtonAdded : styles.AddToLibraryButtonAdd}>{exist ? "Added to Library" : "Add to Library"}</button>
                        {exist && <button className={styles.AddToLibraryButtonView}>View in Library</button>}
                    </div>

                    {/* info container */}
                    <div className="px-5">
                        {/* title */}
                        <div className={styles.Title}>{novelInfo.title}</div>

                        {/* description container */}
                        <div className={styles.DescriptionContainer}>
                            <div className={styles.DescriptionFade}></div>
                            {novelInfo.description}
                        </div>

                        <div className={styles.AttributeList}>
                            <div className={styles.AttributeItem}>
                                <span className={styles.AttributeItemTitle}>Author</span>
                                <div className={styles.AttributeItemContent}>{novelInfo.author}</div>
                            </div>

                            <div className={styles.AttributeItem}>
                                <span className={styles.AttributeItemTitle}>Chapters</span>
                                <div className={styles.AttributeItemContent}>866</div>
                            </div>
                            
                        </div>

                        <div className={styles.AttributeList}>
                            <div className={styles.AttributeItem}>
                                <span className={styles.AttributeItemTitle}>Source</span>
                                <div className={styles.AttributeItemContent}>{novelInfo.source}</div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default NovelInfo;
