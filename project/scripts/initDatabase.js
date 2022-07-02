import parseArgs from "minimist";
import Sequelize from "sequelize";
import { loadModels } from "../imdb-service/src/models/index.js";
import { loadBookModels } from "../books-service/models/index.js";

const dbConfig = {
  dialect: "sqlite",
  storage: null,
};

/**
 * Creates database
 * @param {string} storageName
 * @param {"imdb"|| "books"} databaseType
 */
async function createDatabase(storageName, databaseType) {
  console.log(`Create SQLite DB ${storageName}`);
  dbConfig.storage = storageName;
  const sequelize = new Sequelize(null, null, null, dbConfig);
  if (databaseType == "imdb") {
    loadModels(sequelize);
  } else if (databaseType == "books") {
    loadBookModels(sequelize);
  }
  await sequelize.sync();
  console.log(`SQLite DB ${storageName} created`);
}

const logUsage = () => {
  console.log(
    "Usage: \n npm run database:init -- --type=DB_TYPE --out=DB_FILENAME \n"
  );
  console.log("DB_TYPE valid values - [imdb, books, *]");
  console.log(
    "DB_FILENAME recommended values - [db-imdb.sqlite , db-books.sqlite]\n"
  );
};

const args = process.argv.slice(2);
const argv = parseArgs(args, {
  string: "out",
  alias: { h: "help" },
});

if (argv.out && argv.type) {
  await createDatabase(argv.out, argv.type);
} else if (argv.help) {
  logUsage();
} else {
  logUsage();
}
