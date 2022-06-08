import 'dotenv/config'
import app from "./src/server.js";


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running server on port ${port}`);
});
