import { useEffect, useRef } from "react";
import { useState } from "react";
import Movie from "../components/Movie";
import SearchBar from "../components/SearchBar";
import LoadingPage from "../components/ui/Loading";

function MoviePage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchQueryRef = useRef();

  /**
   * Gets all movies
   */
  function getInitialMovieList() {
    setIsLoading(true);
    fetch("http://localhost:4000/api/v1/movies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovieList(data.data.movies);
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
  function getMovieListQuery(searchQuery) {
    setIsLoading(true);
    fetch(`http://localhost:4000/api/v1/search/${searchQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovieList(data.data.movies);
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

    if (searchQuery === "empty") {
      getInitialMovieList();
    } else {
      getMovieListQuery(searchQuery);
    }
  }

  /**
   * Called on loading page
   */
  useEffect(() => {
    getInitialMovieList();
  }, []);

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
          {movieList.map((movie) => {
            return <Movie key={movie.tconst} movie={movie}></Movie>;
          })}
        </div>
      </div>
    </section>
  );
}

export default MoviePage;
