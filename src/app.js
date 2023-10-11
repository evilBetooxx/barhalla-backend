import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

export default app;
