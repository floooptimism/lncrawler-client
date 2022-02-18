import { useEffect, useState } from "react";
import Liaison from "../../functionalcomponents/Liaison/Liaison";
import SearchBar from "../../uicomponents/SearchBar/SearchBar";
import styles from "./Browse.module.css";

import BrowseNovelCard from "../../uicomponents/BrowseNovelCard/BrowseNovelCard";

function Browse(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function searchNovel(novelName, source) {
    setSearched(true);
    setLoading(true);
    let res = await Liaison.searchNovel(novelName, source);
    console.log(res);
    setLoading(false);
    setSearchResults(res);
  }

  return (
    <div className={styles.BrowseContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchNovel(e.target[0].value, e.target[1].value);
        }}
      >
        <SearchBar />

        {/* Dropdown select source */}
        <div className={`${styles.SourceDropdownContainer}`}>
          <label htmlFor="source">Select Source</label>
          <select id="source" className={`${styles.SourceDropdown}`}>
            <option value="A">All sources</option>
            <option value="https://lightnovel.world">
              www.lightnovel.world
            </option>
          </select>
        </div>
      </form>

      <div className="flex-wrap flex flex-col justify-center items-center gap-3 py-8 px-2">

        {/* if searched and searchResults is empty, tell user that there are no results  */}
        {searched && !loading && searchResults.length === 0 && (
          <p className={styles.Info}>
            No results found
          </p>
        )}

        {/* if loading, tell user that it's loading */}
        {loading && (
          <p className={styles.Info}>
            Loading...
          </p>
        )}

        {/* if not searched, tell user to enter a novel name and select source */}
        {!searched && (
          <p className={styles.Info}>
            Enter a novel name and select a source
          </p>
        )}

        {/* if searchResults is not empty, display the results */}
        {!loading &&
          searchResults.length > 0 &&
          <DisplayResults arrayOfResults={searchResults} />
        }


      </div>
    </div>
  );
}

function DisplayResults({arrayOfResults}){
    const [idx, setIdx] = useState();
    const [results, setResults] = useState([]);

    function loadMore(){
        setIdx(idx + 10);
    }

    useEffect( resetResultsIfArrayChangeOrIndex => {
      setResults(arrayOfResults.slice(0, idx));
    }, [arrayOfResults, idx])

    useEffect( resetIdxIfArrayChange => {
      setIdx(10);
    }, [arrayOfResults])


    return (
        <>
            {results.map((result, idx) => {
                return (
                    <BrowseNovelCard {...result} />
                )
            })
            }
        </>
    )
}

export default Browse;
