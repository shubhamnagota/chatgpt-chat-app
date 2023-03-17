import express from "express";

import { textController, codeController,assistController } from "../controllers/openai.controller.js";

const router = express.Router();

router.post("/text", textController);
router.post("/code", codeController);
router.post("/assist", assistController);

export default router;
