import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

import openAiRoutes from "./routes/openai.router.js";
import authRoutes from "./routes/auth.router.js";

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.use("/openai", openAiRoutes);
app.use("/auth", authRoutes);

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);
global.openai = openai;

app.listen(PORT, () => {
  console.log(`Application is listening on http://localhost:${PORT}`);
});
