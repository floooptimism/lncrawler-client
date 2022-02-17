import styles from './LibraryNovelCard.module.css';

function LibraryNovelCard(props){
    return (
        <div className={`${styles.LibraryNovelCard}`}>
            {/* image */}
            <div className={`${styles.CardImageContainer}`}>
                <img src={props.cover} alt={props.title} />
            </div>

            {/* info */}
            <div className={`${styles.CardInfoContainer}`}>
                {/* Title */}
                <div className={`${styles.CardTitle}`}></div>
                {/* author */}
                <div className={`${styles.CardAuthor}`}></div>

                {/* number of chapters */}
                <div className={`${styles.CardChapters}`}></div>
                {/* reading progress */}
                <div className={`${styles.CardProgress}`}></div>
            </div>  
        </div>
    )
}


export default LibraryNovelCard;