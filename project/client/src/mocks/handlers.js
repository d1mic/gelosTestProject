import { rest } from "msw";
import mockData from "./mockData.json";

export const handlers = [
  rest.get("http://localhost:4000/api/v1/movies", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.allMoviesResponse));
  }),

  rest.get("http://localhost:4001/api/v1/books", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.allBooksResponse));
  }),

  rest.get("http://localhost:4001/api/v1/books/search", (req, res, ctx) => {
    const query = req.url.searchParams.get("query");
    return res(
      ctx.status(200),
      ctx.json({
        meta: {
          count: 1,
          pageNum: 0,
          itemsPerPage: 1,
        },
        data: [
          {
            bookID: "1",
            title: `Book with title: ${query}`,
            authors: "Douglas Adams",
            average_rating: 4.38,
            isbn: "0517226952",
            isbn13: 9780517226957,
            language_code: "eng",
            num_pages: 815,
            ratings_count: 3628,
            text_reviews_count: 254,
            publication_date: "11/1/2005",
            publisher: "Gramercy Books",
          },
        ],
      })
    );
  }),

  rest.get("http://localhost:4000/api/v1/movies/search", (req, res, ctx) => {
    const query = req.url.searchParams.get("query");
    return res(
      ctx.status(200),
      ctx.json({
        meta: { count: 1, pageNum: 0, itemsPerPage: 1 },
        data: [
          {
            bookID: "1",
            title: `Book with title: ${query}`,
            authors: "Douglas Adams",
            average_rating: 4.38,
            isbn: "0517226952",
            isbn13: 9780517226957,
            language_code: "eng",
            num_pages: 815,
            ratings_count: 3628,
            text_reviews_count: 254,
            publication_date: "11/1/2005",
            publisher: "Gramercy Books",
          },
        ],
      })
    );
  }),
];
