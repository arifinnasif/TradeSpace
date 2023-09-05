import { Router } from 'express';
import { get_user_notifications } from '../../controllers/user_notification.controller';


const router = Router();

router.route('/')
    .get(get_user_notifications);

export default router;
