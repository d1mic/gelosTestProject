import { rest } from "msw";
export const handlers = [
  // Handles a POST /login request
  rest.get("http://localhost:4000/api/v1/movies", (req, res, ctx) => {
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
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000001",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000002",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000003",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000004",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000005",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000006",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Some movie title",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000008",
              titleType: "short",
            },
            {
              endYear: "\\N",
              genres: "Animation,Short",
              isAdult: false,
              originalTitle: "Best friends forever",
              primaryTitle: "Hello my friend",
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000007",
              titleType: "short",
            },
          ],
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
              primaryTitle: query,
              runtimeMinutes: 5,
              startYear: 1892,
              tconst: "tt0000007",
              titleType: "short",
            },
          ],
        },
      })
    );
  }),
];
