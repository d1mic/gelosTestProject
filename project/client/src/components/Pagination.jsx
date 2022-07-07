import { getEndingNumPagination, getStartingNumPagination } from "../common.js";

function PaginationSuccessText(props) {
  return (
    <span className="text-sm text-gray-700">
      Showing{" "}
      <span
        data-testid="startNum"
        className="font-semibold text-gray-900"
      >
        {getStartingNumPagination(props.pageNum)}
      </span>{" "}
      to{" "}
      <span
        data-testid="endingNum"
        className="font-semibold text-gray-900 "
      >
        {getEndingNumPagination(props.pageNum, props.numOfResults)}
      </span>{" "}
      of{" "}
      <span data-testid="numofResults" className="font-semibold text-gray-900">
        {props.numOfResults}
      </span>{" "}
      Entries
    </span>
  );
}

function PaginationEmptyText(props) {
  return (
    <span className="text-sm text-gray-700">
      No results - try searching again
    </span>
  );
}

function Pagination(props) {
  const numOfResults = props.numOfResults;

  return (
    <section id="pagination">
      {numOfResults ? (
        <div className="flex flex-col items-center">
          <PaginationSuccessText
            pageNum={props.pageNum}
            numOfResults={numOfResults}
          ></PaginationSuccessText>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={props.handlePreviousClick}
              className="py-2 px-4 text-sm font-medium text-white bg-rose-700 rounded-l hover:bg-rose-900"
            >
              Prev
            </button>
            <button
              onClick={props.handleNextClick}
              className="py-2 px-4 text-sm font-medium text-white bg-rose-700 rounded-r border-0 border-l border-rose-700 hover:bg-rose-900"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <PaginationEmptyText></PaginationEmptyText>
        </div>
      )}
    </section>
  );
}

export default Pagination;
