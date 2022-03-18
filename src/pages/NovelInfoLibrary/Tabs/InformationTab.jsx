import styles from "./Tabs.module.css";

function InformationTab(props) {

    return (
        <>
            {/* chapters and reading progress */}
            <div className="flex justify-between mt-5">
                <div className={styles.Attribute}>
                    <h1>Chapters</h1>
                    <p>800</p>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque euismod, urna eu tincidunt consectetur, nisi
                    nisl aliquam nunc, eget consectetur nisl nunc eget nisl.
                </p>
            </div>
        </>
    );
}

export default InformationTab;