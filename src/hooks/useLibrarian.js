import { useEffect, useState } from 'react';
import Librarian from '../functionalcomponents/Librarian/Librarian';
import NovelModelController from '../controllers/NovelModelController';

let librarian = new Librarian(new NovelModelController());

function useLibrarian(novelChangedCallBack){
    const [novels, setNovels] = useState([]);
    const [novelIds, setNovelIds] = useState({});

    useEffect( setIds => {
        // get all urls from novels and store them as keys in an object
        const novelIds = novels.reduce((acc, novel) => {
            acc[novel.url] = undefined;
            return acc;
        }, {});
        setNovelIds(novelIds);
    }, [novels]);

    async function getNovels(){
        const novels = await librarian.getAllNovels();
        setNovels(novels);
    }

    async function addToLibrary(novel){
        const novel = await librarian.addNovel(novel);
        setNovels([...novels, novel]);
    }

    async function removeFromLibrary(url){
        await librarian.deleteNovel(url);
        setNovels(novels.filter(n => n.url !== url));
    }

    return {
        novels,
        novelIds,
        librarian: {
            getNovels,
            addToLibrary,
            removeFromLibrary
        }
    }
}

export default useLibrarian;