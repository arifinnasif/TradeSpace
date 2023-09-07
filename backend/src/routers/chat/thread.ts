import { Router } from "express";

import { get_messages, send_message } from "../../controllers/chat.controller";

const router = Router();

router
    .route("/:thread_id")
    .get(get_messages)
    .post(send_message)


export default router;