import { Router } from "express";

import { userAuth } from "../../middlewares/auth-middleware";
import { get_chat_thread } from "../../controllers/chat.controller";

const router = Router();

router
    .route("/:ad_id")
    .get(userAuth, get_chat_thread)

export default router;