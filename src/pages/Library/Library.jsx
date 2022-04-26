import LibraryNovelCard from "../../uicomponents/LibraryNovelCard/LibraryNovelCard";
import style from "./Library.module.css";
import React, { useEffect, useState } from "react";

// * Librarian and the controller
import NovelModelController from "../../controllers/NovelModelController";
import Librarian from "../../functionalcomponents/Librarian/Librarian";

// * String compare function
import { compare } from "string-compare";

import SearchBar from "../../uicomponents/SearchBar/SearchBar";
import useLibrarian from "../../hooks/useLibrarian";

import debounce from "../../util/debounce";
import NovelInfoLibrary from "../NovelInfoLibrary/NovelInfoLibrary";

import scrollControlFunctions from "../../util/disableScrolling";
import NovelInfoLibraryProvider from "../../contexts/NovelInfoLibraryContext/NovelInfoLibraryContext";
import Reader from "../../uicomponents/Reader/Reader";
import ReaderProvider, { useReader } from "../../contexts/ReaderContext/ReaderProvider";
const { enableScroll, disableScroll } = scrollControlFunctions;

function Library() {
    const { novels: novelLibrary, novelIds, librarian } = useLibrarian();

    const [novels, setNovels] = useState(novelLibrary);
    const [searchNovelResult, setSearchNovelResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [novelViewModal, setNovelViewModal] = useState(false);
    const [novelViewModalParam, setNovelViewModalParam] = useState(null);

    function onLibraryCardClick(url) {
        setNovelViewModalParam(url);
        setNovelViewModal(true);
    }

    // DONE Search novels function
    function searchNovelInLibrary(novelname) {
        if (novelname.trim() === "") {
            setSearchNovelResult([]);
            setIsSearching(false);
            return;
        }
        setSearchNovelResult(
            novels.filter((novel) => compare(novel.title, novelname) > 0.5)
        );
        setIsSearching(true);
    }

    useEffect(() => {
        setNovels(novelLibrary);
    }, [novelLibrary]);

    useEffect(() => {
        if (novelViewModal) disableScroll();
        else enableScroll();
    }, [novelViewModal]);

    return (
        <div className="pt-14 md:pt-5">
            {/* Searchbar */}
            <form
                className={style.Form}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                {/* <h1 className="text-center mb-3 text-2xl text-gray-500">Search</h1> */}
                <SearchBar
                    placeholder="Search library"
                    onChange={debounce(searchNovelInLibrary, 500)}
                    className={`focus:border-none ${style.SearchBar}`}
                />
            </form>
            <div className="border-b border-gray-200">

            </div>


            {/* Novel List */}
            <div className="flex-wrap flex flex-col sm:flex-row items-center gap-3 mt-5 px-0 md:px-4">
                {novels.length === 0 && (
                    <div className="p-6 rounded border border-gray-400 text-gray-800" style={{borderColor: "var(--secondary-color)"}}>
                        <h1 className="text-center text-lg font-medium mb-2">No novels in library</h1>
                        <p className="text-center text-gray-700">
                            You can discover and search novels in the <span className="font-medium italic">Browse</span> tab
                        </p>
                    </div>
                )}

                {searchNovelResult.length > 0 &&
                    searchNovelResult.map((novel) => {
                        return (
                            <LibraryNovelCard
                                onClick={onLibraryCardClick}
                                {...novel}
                                key={novel.url}
                            />
                        );
                    })}

                {novels.length > 0 &&
                    !isSearching &&
                    novels.map((novel) => {
                        return (
                            <LibraryNovelCard
                                onClick={onLibraryCardClick}
                                {...novel}
                                key={novel.url}
                            />
                        );
                    })}
            </div>

            <NovelInfoLibraryProvider>
                <ReaderProvider>
                    <>
                        <NovelInfoLibrary
                            url={novelViewModalParam}
                            open={novelViewModal}
                            onClose={setNovelViewModal.bind(null, false)}
                        />

                        <ReaderComponent />
                    </>
                </ReaderProvider>
            </NovelInfoLibraryProvider>

        </div>
    );
}

function ReaderComponent(){
    const {readerIsOpen} = useReader();

    return (
        <>
            {readerIsOpen && <Reader />}
        </>
    )
}

export default Library;
