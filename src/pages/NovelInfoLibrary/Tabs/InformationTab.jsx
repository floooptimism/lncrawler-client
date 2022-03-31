import styles from "./Tabs.module.css";

function InformationTab({novelInfo}) {
    
    return (
        <>
            {/* chapters and reading progress */}
            <div className="flex justify-between mt-5">
                <div className={styles.Attribute}>
                    <h1>Chapters</h1>
                    <p>{novelInfo && novelInfo.numberOfChapters}</p>
                </div>
                <div className={styles.Attribute}>
                    <h1>Reading progress</h1>
                    <p>80%</p>
                </div>
            </div>

            {/* description */}
            <div className={styles.Attribute + " mt-6"}>
                <h1>Description</h1>
                <p>
                    {novelInfo && novelInfo.description}
                </p>
            </div>
        </>
    );
}

export default InformationTab;