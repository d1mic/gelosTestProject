import { SearchIcon } from "./ui/Icons";

function SearchBar(props) {
  return (
    <div className="container px-5 py-10 mx-auto lg:w-1/2">
      <form onSubmit={props.searchMovieHandler}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
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
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name, category..."
          ></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-rose-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
