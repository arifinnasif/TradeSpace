import { Router } from "express";

import { mute_user } from "../../controllers/mute_user.controller";

const router = Router();

router.route("/:username")
    .put(mute_user);

export default router;