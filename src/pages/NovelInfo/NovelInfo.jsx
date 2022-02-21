import { useEffect } from "react";
import Liaison from "../../functionalcomponents/Liaison/Liaison";
import styles from "./NovelInfo.module.css";

function NovelInfo(props) {
    useEffect(() => {
        async function getNovelInfo() {
            let res = await Liaison.getNovelInfo(props.url, props.scraper);
            console.log(res);
        }

        getNovelInfo();
    }, [props.url, props.scraper]);

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
                    <div className={styles.NovelInfoTopBarTitle}>
                        Novel Info
                    </div>

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
                    <h1>Dudeeee</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>
                    <h1>Dude</h1>

                    {/* image cover */}
                    <div className={styles.Cover}>
                        <img src={props.cover} alt="cover" />
                    </div>

                    {/* author */}
                    <div className={styles.Author}>
                        <h2>{props.author}</h2>
                    </div>

                    {/* description */}
                    <div className={styles.Description}>
                        <p>{props.description}</p>
                    </div>

                    {/* information grid */}
                    <div className={styles.Information}>
                        <div className={styles.InformationItem}>
                            <h3>{props.chapters}</h3>
                            <p>Chapters</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NovelInfo;
