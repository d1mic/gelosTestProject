const getStartingNumPagination = (pageNum, resultPerPage = 8) => {
  return pageNum * resultPerPage + 1;
};

const getEndingNumPagination = (pageNum, numOfResults, resultPerPage = 8) => {
  let endNum = pageNum * resultPerPage + 8;
  if (endNum > numOfResults) {
    return numOfResults;
  }
  return endNum;
};

export { getStartingNumPagination, getEndingNumPagination };
