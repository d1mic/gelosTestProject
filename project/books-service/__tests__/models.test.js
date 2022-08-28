import dbService from "../src/services/dbService.js";
import { loadBookModels } from "../src/models/index.js";

const { Books, Op } = await loadBookModels(dbService);

describe("Test Handlers", function () {
  test("responds to /", async () => {
    let count = await Books.count({ col: "bookID" });
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThan(0);
  });

  // test("Create item", async () => {
  //   let newBook = {
  //     title: `Random book name`,
  //     authors: "Douglas Adams",
  //     average_rating: 4.38,
  //     isbn: "0517226952",
  //     isbn13: 9780517226957,
  //     language_code: "eng",
  //     num_pages: 815,
  //     ratings_count: 3628,
  //     text_reviews_count: 254,
  //     publication_date: "11/1/2005",
  //     publisher: "Gramercy Books",
  //   };

  //   let addedBook = await Books.create(newBook);
  //   expect(addedBook instanceof Books).toBe(true);
  //   expect(typeof addedBook.bookID).toBe("string");
  // });
});
