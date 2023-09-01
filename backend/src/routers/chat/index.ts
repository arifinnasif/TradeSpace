import { Router } from "express";

import { get_chat_thread, get_inbox, get_unread_msg_count } from "../../controllers/chat.controller";
import threadRouter from "./threads";
import { userAuth } from "../../middlewares/auth-middleware";

const router = Router();

router.use("/threads", userAuth, threadRouter);

router
    .route("/inbox")
    .get(userAuth, get_inbox)

router
    .route("/unread_msg_count")
    .get(userAuth, get_unread_msg_count)

router
    .route("/:ad_id")
    .get(userAuth, get_chat_thread)

export default router;