import { Router } from "express";

import { mute_user } from "../../controllers/user_management.controller";

const router = Router();

router.route("/:username")
    .put(mute_user);

export default router;