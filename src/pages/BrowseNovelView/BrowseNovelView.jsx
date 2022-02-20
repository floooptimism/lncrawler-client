

function BrowseNovelView({param}){
    return (
        <div className={styles.BrowseContainer}>
            {/* cover image */}
            <div className={styles.Cover}>
                <img src={param.cover} alt="cover" />
            </div>

            {/* title */}
            <div className={styles.Title}>
                <h1>{param.title}</h1>
            </div>

            {/* author */}
            <div className={styles.Author}>
                <h2>{param.author}</h2>
            </div>

            {/* description */}
            <div className={styles.Description}>
                <p>{param.description}</p>
            </div>

            {/* information grid */}
            <div className={styles.InformationGrid}>
                <div className={styles.Information}>
                    <h3>{param.chapters} Chapters</h3>
                </div>
                <div className={styles.Information}>
                    <h3>{param.words} Words</h3>
                </div>
                <div className={styles.Information}>
                    <h3>{param.views} Views</h3>
                </div>
            </div>
                            
        </div>
    )
}

export default BrowseNovelView;