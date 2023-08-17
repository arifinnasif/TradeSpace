import { Router } from 'express';
import { userAuth } from '../../middlewares/auth-middleware';
import { get_user_transactions } from '../../controllers/payment.controller';


const router = Router();

router.route('/transactions')
    .get(get_user_transactions);

