import React, { useEffect, useState } from "react";
import Liaison from "../../functionalcomponents/Liaison/Liaison";
import useLibrarian from "../../hooks/useLibrarian";
import styles from "./NovelInfo.module.css";
import NovelInfoBrowser from "./NovelInfoBrowser";


function NovelInfo({url, source, onClose, library=false}) {
    const [novelInfo, setNovelInfo] = useState({});
    const {novelIds, librarian} = useLibrarian();
    const [exist, setExist] = useState();


    // add to library
    function toggleInLibrary() {
        if (exist) {
            // remove from library
            librarian.removeFromLibrary(url);
        } else {
            // add to library
            librarian.addToLibrary({...novelInfo, loaded:true});
        }
    }

    useEffect( () => {
        if (url in novelIds) {
            setExist(true);
        } else {
            setExist(false);
        }
    },[url, novelIds]);

    useEffect(() => {
        // get info from api
        Liaison.getNovelInfo(url, source).then(res => setNovelInfo(res));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, source]);

    useEffect(()=>{
        if(exist){
            if(novelInfo.loaded === false){
                // fetch info from api
                Liaison.getNovelInfo(url, source).then(res => {
                    res.loaded = true;
                    librarian.updateNovel(res);
                    setNovelInfo(res);
                });
                return;
            }
        }
    }, [novelInfo, exist, librarian, source, url])

    return (
        <div className={styles.background}>
            <div className={styles.NovelInfo}>
                {/* fixed topbar */}
                <div className={styles.NovelInfoTopBar}>
                    {/* go back icon */}
                    <div className={styles.NovelInfoTopBarIcon}>
                        <svg
                            onClick={onClose}
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

                    <NovelInfoBrowser novelInfo={novelInfo} toggleInLibrary={toggleInLibrary} exist={exist}/>
                </div>
            </div>
        </div>
    );
}

export default NovelInfo;
