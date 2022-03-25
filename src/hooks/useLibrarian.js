import { useEffect, useState } from 'react';
import librarian from '../functionalcomponents/Librarian/Librarian';


import { singletonHook } from 'react-singleton-hook';


function useLibrarian(novelChangedCallBack){
    const [novels, setNovels] = useState([]);
    const [novelIds, setNovelIds] = useState({});

    useEffect(function getAllNovels(){
        librarian.getAllNovels().then(novels => {
            console.log(novels);
            setNovels(novels);
        });
    },[])

    useEffect( () => {
        // get all urls from novels and store them as keys in an object
        console.log("USE EFFECT IN LIBRARIAN", novels);
        const novelIds = novels.reduce((acc, novel) => {
            acc[novel.url] = undefined;
            return acc;
        }, {});
        setNovelIds(novelIds);
    }, [novels]);

    function setOnChapterContentChanged(fnc){
        librarian.setOnChapterContentChanged(fnc);
    }

    async function getNovels(){
        const novels = await librarian.getAllNovels();
        setNovels(novels);
    }

    async function getChapters(url){
        return await librarian.getChapters(url);
    }

    async function getDownloadedChapters(url){
        return await librarian.getDownloadedChapters(url);
    }

    async function storeChapters(url, chapters){
       return await librarian.storeChapters(url, chapters);
    }

    async function addToLibrary(nov){
        await librarian.addNovel(nov);
        setNovels([...novels, nov]);
    }

    async function removeFromLibrary(url){
        await librarian.deleteNovel(url);
        setNovels(novels.filter(n => n.url !== url));
    }

    async function getChapterContent(novelURL, chapterIndex){
        return await librarian.getChapterContent(novelURL, chapterIndex);
    }

    function getNovelInfo(url){
        return novels.filter(n => n.url === url)[0];
    }

    async function updateNovel(novel){
        let success = await librarian.updateNovel(novel);
        if(success){
            setNovels(novels.map(n => n.url === novel.url ? novel : n));
        }
    }

    async function getNumberOfChapters(url){
        return await librarian.getNumberOfChapters(url);
    }

    return {
        novels,
        novelIds,
        librarian: {
            setOnChapterContentChanged,
            getDownloadedChapters,
            getNovels,
            addToLibrary,
            getChapterContent,
            removeFromLibrary,
            getNovelInfo,
            updateNovel,
            getNumberOfChapters,
            getChapters,
            storeChapters
        }
    }
}



export default singletonHook({novels:[], novelIds:{}, librarian:{}}, useLibrarian);