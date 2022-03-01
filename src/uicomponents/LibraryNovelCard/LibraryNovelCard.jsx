import styles from './LibraryNovelCard.module.css';

function LibraryNovelCard({title, cover, author, chaptersLoaded, numberOfChapters, progress}){
    return (
        <div className={`${styles.NovelCardContainer}`}>
            {/* image */}
            <div className={`${styles.NovelCardImageContainer}`}>
                <img src={cover} className={styles.NovelCardImage} alt={title} />
            </div>

            {/* info */}
            <div className={`${styles.NovelCardInfoContainer}`}>
                {/* Title */}
                <div className={`${styles.NovelCardTitle}`}>{title}</div>
                {/* author */}
                <div className={`${styles.NovelCardAuthor}`}>{author} </div>

                {/* number of chapters */}
                <div className={`${styles.NovelCardChapters}`}>
                </div>
                {/* reading progress */}
                <div className={`${styles.NovelCardProgress}`}></div>
            </div>  
        </div>
    )
}


export default LibraryNovelCard;