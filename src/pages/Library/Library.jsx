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
import NovelInfo from "../NovelInfo/NovelInfo";



function Library() {
  const {novels:novelLibrary, novelIds, librarian} = useLibrarian();

  const [novels, setNovels] = useState(novelLibrary);
  const [novelsFinal, setNovelsFinal] = useState([]);
  const [searchNovelResult, setSearchNovelResult] = useState([]);



  // TODO: Search novels function
  function searchNovelInLibrary(novelname) {
    setSearchNovelResult(
      novelsFinal.filter((novel) => compare(novel.title, novelname) > 0.5)
    );
  }

  useEffect( () => {
    let newNovels = novels.map(async novel => {
        let numberOfChapters = await librarian.getNumberOfChapters(novel.url);
        console.log("USE EFFECT HERE", numberOfChapters)
        novel.numberOfChapters = numberOfChapters;
        return novel;
    });
    Promise.all(newNovels).then(res => {
      setNovelsFinal(res);
    });
  }, [novels])

  useEffect(() => {
    setNovels(novelLibrary);
  }, [novelLibrary]);

  return (
    <div className="mt-14 px-1">
      {/* Searchbar */}
      <form className={style.Form}  onSubmit={e => {
        e.preventDefault();
      }}>
        {/* <h1 className="text-center mb-3 text-2xl text-gray-500">Search</h1> */}
        <SearchBar onChange={debounce(searchNovelInLibrary, 500)} className="border-b border-gray-400 focus:border-none"/>
      </form>

      {/* Novel List */}
      <div className="flex-wrap flex flex-col justify-center items-center gap-3 mt-5">
        {novels.length === 0 && (
          <div>
            <h1 className="text-center">No novels in library</h1>
            <p className="text-center">
              Add novels to your library by clicking the button below
            </p>
          </div>
        )}
        
        {searchNovelResult.length > 0 && (
          searchNovelResult.map((novel) => {
            return <LibraryNovelCard {...novel} key={novel.url}/>;
            }
          )
        )}

        {novelsFinal.length > 0 && searchNovelResult.length === 0 && (
          novelsFinal.map((novel) => {
            return <LibraryNovelCard {...novel}  key={novel.url}/>;
          })
        )}

      </div>
    </div>
  );
}

export default Library;
