import { SearchIcon } from "./ui/Icons";

function SearchBar(props) {
  return (
    <div className="container px-5 py-10 mx-auto lg:w-1/2">
      <form onSubmit={props.searchMovieHandler}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SearchIcon></SearchIcon>
          </div>
          <input
            type="search"
            id="default-search"
            ref={props.searchQueryRef}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Search by title"
          ></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
