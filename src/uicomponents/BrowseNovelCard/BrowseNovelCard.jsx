import styles from './BrowseNovelCard.module.css';

function BrowseNovelCard({title, author, description, cover, url, source}){
    return (
        <div className={`${styles.BrowseNovelCardContainer}`}>
            {/* image */}
            <div className={`${styles.BrowseNovelCardImageContainer}`}>
                <img src={cover} alt={title} className={`${styles.BrowseNovelCardImage}`} />
            </div>

            <div className={styles.BrowseNovelCardInfo}>
                {/* title */}
                <div className={styles.BrowseNovelCardTitle}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </div>

                {/* author */}
                <div className={styles.BrowseNovelCardAuthor}>
                    {author}
                </div>

                {/* description */}
                <div className={styles.BrowseNovelCardDescription}>
                    {/* fade  */}
                    <div className={styles.BrowseNovelCardDescriptionFade}>
                    </div>       
                    {description}
                </div>

                {/* Indicator if Novel is already in library or not */}
                <div className={styles.BrowseNovelCardIndicator + " " + styles.BrowseNovelCardIndicatorInLibrary}>
                    In Library
                </div>

            </div>
        </div>
    )
}

export default BrowseNovelCard;