import React from "react";
import styles from "./NovelInfo.module.css";

function NovelInfoBrowser({novelInfo, exist, toggleInLibrary}) {
    return (
        <>
            {/* add to library button */}
            <div className={styles.AddToLibraryButton}>
                <button
                    onClick={toggleInLibrary}
                    className={
                        exist
                            ? styles.AddToLibraryButtonAdded
                            : styles.AddToLibraryButtonAdd
                    }
                >
                    {exist ? "Added to Library" : "Add to Library"}
                </button>
                {exist && (
                    <button className={styles.AddToLibraryButtonView}>
                        View in Library
                    </button>
                )}
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
                        <span className={styles.AttributeItemTitle}>
                            Author
                        </span>
                        <div className={styles.AttributeItemContent}>
                            {novelInfo.author}
                        </div>
                    </div>

                    <div className={styles.AttributeItem}>
                        <span className={styles.AttributeItemTitle}>
                            Chapters
                        </span>
                        <div className={styles.AttributeItemContent}>866</div>
                    </div>
                </div>

                <div className={styles.AttributeList}>
                    <div className={styles.AttributeItem}>
                        <span className={styles.AttributeItemTitle}>
                            Source
                        </span>
                        <div className={styles.AttributeItemContent}>
                            {novelInfo.source}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default NovelInfoBrowser;