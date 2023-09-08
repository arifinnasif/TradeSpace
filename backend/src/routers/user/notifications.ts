import { Router } from 'express';
import { get_user_notifications, 
         update_notification_seen_status
} from '../../controllers/user_notification.controller';


const router = Router();

router.route('/')
    .get(get_user_notifications)
    .put(update_notification_seen_status);

export default router;
