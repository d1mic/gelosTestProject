import { rest } from "msw";
import movies from "./mockData.json";

export const handlers = [
  // Handles a POST /login request
  rest.get("http://localhost:4000/api/v1/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          movies: movies["allMovies"],
        },
      })
    );
  }),

  rest.get("http://localhost:4000/api/v1/search/:query", (req, res, ctx) => {
    let { query } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          movies: [
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "QUERY: " + query,
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000007",
              titleType: "short",
              Rating: {
                averageRating: "4.5",
              },
            },
          ],
        },
      })
    );
  }),
];
