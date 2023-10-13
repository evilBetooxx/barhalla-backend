import app from "./app.js";
import {connectDB} from "./db.js";
import { config } from 'dotenv';




config();
connectDB()
app.listen(4000)
console.log('Server on port 4000');