import app from "./app.js";
import { DBconnection } from "./utils/db.js";

DBconnection();
app.listen(4000);
console.log('Server on port', 4000);