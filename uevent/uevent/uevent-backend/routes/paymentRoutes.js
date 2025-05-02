const Router = require('express').Router;
const {body, param} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();
const paymentController = require('../controllers/paymentController');

router.post(
    '/buy-tickets/:userId',
    param('userId').isInt({min: 0}),
    body('eventId').isInt({min: 0}),
    body('ticketsQuantity').isInt({min: 0}),
    authMiddleware, paymentController.beginBuyingTickets);
router.post(
    process.env.STRIPE_WEBHOOK_URL,
    paymentController.webhookHandler
)

// router.post(
//     '/create-checkout-session',
//     authMiddleware,
//     paymentController.createCheckoutSession
// );


module.exports = router;