import styles from './BrowseNovelCard.module.css';

function BrowseNovelCard({title, author, description, cover, url, source}){
    return (
        <div className={`${styles.BrowseNovelCardContainer}`}>
            {/* image */}
            <div className={`${styles.BrowseNovelCardImageContainer}`}>
                <img src={cover} alt={title} className={`${styles.BrowseNovelCardImage}`} />
            </div>
        </div>
    )
}

export default BrowseNovelCard;