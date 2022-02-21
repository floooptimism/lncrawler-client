import { useEffect } from 'react';
import Liaison from '../../functionalcomponents/Liaison/Liaison';
import styles from './NovelInfo.module.css';


function NovelInfo(props){

    useEffect(() => {
        async function getNovelInfo(){
            let res = await Liaison.getNovelInfo(props.url, props.scraper);
            console.log(res);
        }
        
        getNovelInfo();
    }, [props.url, props.scraper]);

    return (
        <div className={styles.background}>

            <div className={styles.NovelInfo}>
                {/* image cover */}
                <div className={styles.Cover}>
                    <img src={props.cover} alt="cover" />
                </div>

                {/* title */}
                <div className={styles.Title}>
                    <h1>{props.title}</h1>
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
    )
}

export default NovelInfo;