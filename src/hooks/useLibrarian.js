import { useEffect, useState } from 'react';
import Librarian from '../functionalcomponents/Librarian/Librarian';
import NovelModelController from '../controllers/NovelModelController';

import { singletonHook } from 'react-singleton-hook';

let librarian = new Librarian(new NovelModelController());

function useLibrarian(novelChangedCallBack){
    const [novels, setNovels] = useState([]);
    const [novelIds, setNovelIds] = useState({});

    useEffect(function getAllNovels(){
        librarian.getNovels().then(novels => {
            setNovels(novels);
        });
    },[])

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

    async function addToLibrary(nov){
        const novel = await librarian.addNovel(nov);
        setNovels([...novels, novel]);
    }

    async function removeFromLibrary(url){
        await librarian.deleteNovel(url);
        setNovels(novels.filter(n => n.url !== url));
    }

    async function getNovelInfo(url){
        return novels.filter(n => n.url === url)[0];
    }

    async function updateNovel(novel){
        let success = await librarian.updateNovel(novel);
        if(success){
            setNovels(novels.map(n => n.url === novel.url ? novel : n));
        }
    }

    return {
        novels,
        novelIds,
        librarian: {
            getNovels,
            addToLibrary,
            removeFromLibrary,
            getNovelInfo,
            updateNovel
        }
    }
}



export default singletonHook(useLibrarian, useLibrarian);