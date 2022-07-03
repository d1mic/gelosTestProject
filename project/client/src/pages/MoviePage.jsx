import { useEffect, useRef } from "react";
import { useState } from "react";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";
import { getEndingNumPagination } from "../common.js";
import SearchBar from "../components/SearchBar";
import LoadingPage from "../components/ui/Loading";
import EmptySearch from "../components/ui/EmptySearch";

function MoviePage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfResults, setNumOfResults] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [currentSearch, setCurrentSearch] = useState("empty");

  const searchQueryRef = useRef();

  /**
   * Gets all movies
   */
  function getInitialMovieList(pageNum) {
    setIsLoading(true);
    fetch(`http://localhost:4002/api/v1/movies?page=${pageNum}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovieList(data.data.movies);
        setNumOfResults(data.meta.count);
        setPageNum(data.meta.pageNum);
        setIsLoading(false);
      })
      .catch((err) => {
        // TODO: handle errors
      });
  }

  /**
   * Gets movie based on the query passed
   * @param {string} searchQuery
   */
  function getMovieListQuery(searchQuery, pageNum) {
    setIsLoading(true);
    fetch(
      `http://localhost:4002/api/v1/movies/search?query=${searchQuery}&page=${pageNum}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMovieList(data.data.movies);
        setNumOfResults(data.meta.count);
        setPageNum(data.meta.pageNum);
        setIsLoading(false);
      });
  }

  /**
   * Handles clicking on the search button, if the query is empty returns all movies
   * @param {*} event
   */
  function searchMovieHandler(event) {
    event.preventDefault();
    const searchQuery = searchQueryRef.current.value || "empty";
    setCurrentSearch(searchQuery);
    setPageNum(0);
  }

  function handleNextClick() {
    if (getEndingNumPagination(pageNum, numOfResults) < numOfResults) {
      setPageNum(pageNum + 1);
    }
  }

  function handlePreviousClick() {
    if (pageNum > 0) {
      setPageNum(pageNum - 1);
    }
  }

  /**
   * Called on loading page
   */
  useEffect(() => {
    if (currentSearch === "empty") {
      getInitialMovieList(pageNum);
    } else {
      getMovieListQuery(currentSearch, pageNum);
    }
  }, [pageNum, currentSearch]);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section className="text-gray-600 body-font">
      <SearchBar
        searchMovieHandler={searchMovieHandler}
        searchQueryRef={searchQueryRef}
      ></SearchBar>

      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {movieList.length > 0 ? (
            movieList.map((movie) => {
              return <Movie key={movie.tconst} movie={movie}></Movie>;
            })
          ) : (
            <EmptySearch></EmptySearch>
          )}
        </div>
      </div>
      <Pagination
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
        pageNum={pageNum}
        numOfResults={numOfResults}
      ></Pagination>
      <br></br>
    </section>
  );
}

export default MoviePage;
