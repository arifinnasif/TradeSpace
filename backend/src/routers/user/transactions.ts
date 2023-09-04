import { Router } from 'express';
import { get_user_transactions } from '../../controllers/transaction.controller';


const router = Router();

router.route('/transactions')
    .get(get_user_transactions);

export default router;

