import React, { useState, useEffect } from "react";
import styles from "./NovelInfoLibrary.module.css";
import Tabs from "./Tabs/Tabs";

import useLibrarian from "../../hooks/useLibrarian";
import Liaison from "../../functionalcomponents/Liaison/Liaison";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNovelInfoLibraryContext } from "../../contexts/NovelInfoLibraryContext/NovelInfoLibraryContext";

function NovelInfoLibrary({ onClose, url, open }) {
    const [novelInfo, setNovelInfo] = useState(null);
    const { novels, novelIds, librarian } = useLibrarian();
    const [loading, setLoading] = useState(true);

    const [moreDownloadOptionsMenu, setMoreDownloadOptionsMenu] =
        useState(false);

    useEffect(() => {
        let isMounted = true;
        if (!novelInfo) return;
        if (!novelInfo.loaded) {
            if (isMounted) setLoading(true);
            Liaison.getNovelInfo(url, novelInfo.source).then((res) => {
                res.loaded = true;
                librarian.updateNovel(res);
                if (isMounted) {
                    setNovelInfo(res);
                    setLoading(false);
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, [novelInfo]);

    // load novel info
    useEffect(() => {
        setLoading(true);
        if (librarian.getNovelInfo) {
            setNovelInfo(librarian.getNovelInfo(url));
        }
        setLoading(false);
    }, [url]);

    if (loading) {
        return (
            <div
                className={
                    styles.NovelInfoContainer +
                    " " +
                    (open ? styles.NovelInfoContainerShow : "")
                }
            >
                <div>Loading</div>
            </div>
        );
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
            <div className={styles.TopBar + " justify-between"}>
                <div
                    onClick={onClose}
                    className="flex items-center cursor-pointer"
                >
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

                {moreDownloadOptionsMenu && (
                    <DownloadOptionsMenu />
                )}
            </div>

            {/* brief info */}
            <div className={styles.SummarizeInfo}>
                {/* cover image */}
                <div className={styles.Image}></div>

                {/* some stuffs */}
                <div className={styles.Info}>
                    {/* title and author */}
                    <div className={styles.TitleAndAuthorContainer}>
                        <h1 className={styles.Title}>
                            {novelInfo && novelInfo.title}
                        </h1>
                        <h6 className={styles.Author}>
                            {novelInfo && novelInfo.author}
                        </h6>
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
                            <button>Read</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* tabs */}
            <Tabs
                librarian={librarian}
                novelInfo={novelInfo}
                setMoreDownloadOptionsMenu={setMoreDownloadOptionsMenu}
            />

            {/* tabs content */}
            <div></div>
        </div>
    );
}

function DownloadOptionsMenu(props) {
    const {menuComponent} = useNovelInfoLibraryContext();

    return (
        <div>
            <Menu
                menuButton={
                    <svg
                        height="20px"
                        width="20px"
                        version="1.1"
                        viewBox="0 0 30 26"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>download</title>
                        <defs />
                        <g
                            id="Page-1"
                            fill="none"
                            fillRule="evenodd"
                            stroke="none"
                            strokeWidth="1"
                        >
                            <g
                                id="Icon-Set"
                                fill="#616161"
                                transform="translate(-101.000000, -726.000000)"
                            >
                                <path
                                    id="download"
                                    d="M130,726 L102,726 C101.448,726 101,726.448 101,727 L101,735 C101,735.553 101.448,736 102,736 C102.552,736 103,735.553 103,735 L103,728 L129,728 L129,735 C129,735.553 129.448,736 130,736 C130.552,736 131,735.553 131,735 L131,727 C131,726.447 130.552,726 130,726 L130,726 Z M120.267,744.3 L117,748.26 L117,734.002 C117,733.449 116.552,733 116,733 C115.448,733 115,733.449 115,734.002 L115,748.298 L111.702,744.3 C111.31,743.905 110.674,743.905 110.282,744.3 C109.89,744.693 109.89,745.332 110.282,745.726 L115.224,751.717 C115.433,751.927 115.71,752.017 115.984,752.002 C116.258,752.017 116.536,751.927 116.745,751.717 L121.687,745.726 C122.079,745.332 122.079,744.693 121.687,744.3 C121.295,743.905 120.659,743.905 120.267,744.3 L120.267,744.3 Z"
                                />
                            </g>
                        </g>
                    </svg>
                }
                transition
            >
                {menuComponent}
            </Menu>
        </div>
    );
}

export default NovelInfoLibrary;
