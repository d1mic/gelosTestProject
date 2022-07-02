import { getEndingNumPagination, getStartingNumPagination } from "../common.js";

function Pagination(props) {
  return (
    <div class="flex flex-col items-center">
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span class="font-semibold text-gray-900">
          {getStartingNumPagination(props.pageNum)}
        </span>{" "}
        to{" "}
        <span class="font-semibold text-gray-900 ">
          {getEndingNumPagination(props.pageNum, props.numOfResults)}
        </span>{" "}
        of <span class="font-semibold text-gray-900">{props.numOfResults}</span>{" "}
        Entries
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <button
          onClick={props.handlePreviousClick}
          class="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Prev
        </button>
        <button
          onClick={props.handleNextClick}
          class="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
