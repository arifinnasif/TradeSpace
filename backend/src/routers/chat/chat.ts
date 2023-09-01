import { Router } from "express";

import { userAuth } from "../../middlewares/auth-middleware";
import { get_chat_thread, get_messages, send_message } from "../../controllers/chat.controller";

const router = Router();

router
    .route("/threads/:thread_id")
    .get(userAuth, get_messages)
    .post(userAuth, send_message)

router
    .route("/:ad_id")
    .get(userAuth, get_chat_thread)

export default router;