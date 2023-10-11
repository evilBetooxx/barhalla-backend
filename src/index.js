import app from "./app";
import {connectBD} from "./db";

connectBD()
app.listen(4000)
console.log('Server on port 4000');