import styles from "./BrowseNovelCard.module.css";

function BrowseNovelCard({
    title,
    author,
    description,
    cover,
    url,
    source,
    onClick,
    inLibrary,
}) {
  
    // opens the modal
    function clickHandle() {
        onClick(url, source, inLibrary);
    }

    return (
        <div
            onClick={clickHandle}
            className={`${styles.BrowseNovelCardContainer}`}
        >
            {/* image */}
            <div className={`${styles.BrowseNovelCardImageContainer}`}>
                <img
                    src={cover}
                    alt={title}
                    className={`${styles.BrowseNovelCardImage}`}
                />
            </div>

            <div className={styles.BrowseNovelCardInfo}>
                {/* title */}
                <div className={styles.BrowseNovelCardTitle}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </div>

                {/* author */}
                <div className={styles.BrowseNovelCardAuthor}>{author}</div>

                {/* description */}
                <div className={styles.BrowseNovelCardDescription}>
                    {/* fade  */}
                    <div
                        className={styles.BrowseNovelCardDescriptionFade}
                    ></div>
                    {description}
                </div>

                {/* Indicator if Novel is already in library or not */}
                <div
                    className={
                        styles.BrowseNovelCardIndicator +
                        " " +
                        (inLibrary
                            ? styles.BrowseNovelCardIndicatorInLibrary
                            : styles.BrowseNovelCardIndicatorNotInLibrary)
                    }
                >
                    {inLibrary ? "In Library" : ""}
                </div>
            </div>
        </div>
    );
}

function AddButton() {
    return (
        <svg
            className="mr-1"
            fill="#404040"
            height="16"
            width="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
    );
}

export default BrowseNovelCard;
