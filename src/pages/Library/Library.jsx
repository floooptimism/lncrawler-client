import LibraryNovelCard from "../../uicomponents/LibraryNovelCard/LibraryNovelCard";
import style from "./Library.module.css";
import { useEffect, useState } from "react";


// * Librarian and the controller
import NovelModelController from "../../controllers/NovelModelController";
import Librarian from "../../functionalcomponents/Librarian/Librarian";

// * String compare function
import { compare } from "string-compare";
import SearchBar from "../../uicomponents/SearchBar/SearchBar";

function Library() {
  let library = new Librarian(new NovelModelController());

  const [novels, setNovels] = useState([]);
  const [searchNovelResult, setSearchNovelResult] = useState([]);

  // TODO: Get all novels function
  function getAllNovels() {
    library.getAllNovels().then((res) => {
      setNovels(res);
    });
  }

  // TODO: Search novels function
  function searchNovelInLibrary(novelname) {
    setSearchNovelResult(
      novels.filter((novel) => compare(novel.title, novelname) > 0.5)
    );
  }

  // Get all novels at component load
  useEffect(() => {
    getAllNovels();
  }, []);

  return (
    <div className="mt-14">
      {/* Searchbar */}
      <form onSubmit={e => {
        e.preventDefault();
        searchNovelInLibrary(e.target[0].value);
      }}>
        <SearchBar />
      </form>

      {/* Novel List */}
      <div className="flex-wrap flex flex-col justify-center items-center gap-3 mt-5">
        {novels.length == 0 && (
          <div>
            <h1 className="text-center">No novels in library</h1>
            <p className="text-center">
              Add novels to your library by clicking the button below
            </p>
          </div>
        )}
        <LibraryNovelCard />
      </div>
    </div>
  );
}

export default Library;
