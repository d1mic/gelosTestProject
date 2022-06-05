import parseArgs from "minimist";
import Sequelize from "sequelize";
import { loadModels } from "../imdb-service/src/models/index.js";

const dbConfig = {
  dialect: "sqlite",
  storage: null,
};

const cliOptions = {
  string: "out",
  alias: { h: "help" },
};

const logUsage = () => {
  console.log("Usage\n\n npm run database:init -- --out=DB-FILENAME\n");
};

// Get values from argv
const args = process.argv.slice(2);
const argv = parseArgs(args, cliOptions);

if (argv.out) {
  console.log(`Create SQLite DB ${argv.out}`);

  dbConfig.storage = argv.out;
  const sequelize = new Sequelize(null, null, null, dbConfig);
  await loadModels(sequelize);
  await sequelize.sync();

  console.log(`SQLite DB ${argv.out} created`);
} else if (argv.help) {
  logUsage();
} else {
  logUsage();
}
