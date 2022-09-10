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

const checkData = (attribute, alt = "N/A") => {
  if (!attribute || attribute === "\\N") {
    return alt;
  }
  return attribute;
};

const getImageSrc = (categories) => {
  if (categories.includes("Romance") || categories.includes("Comedy")) {
    return "comedy.jpg";
  } else if (categories.includes("Action")) {
    return "action.jpg";
  } else if (categories.includes("Thriller")) {
    return "thriller.jpg";
  } else if (categories.includes("Drama")) {
    return "drama.jpg";
  } else {
    return "movie2.jpg";
  }
};

export {
  getStartingNumPagination,
  getEndingNumPagination,
  checkData,
  getImageSrc,
};
