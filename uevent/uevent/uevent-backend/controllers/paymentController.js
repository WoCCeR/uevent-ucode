const paymentService = require('../services/paymentService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

class PaymentController {
    async beginBuyingTickets(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const userId = req.params.userId;
            const { eventId, ticketsQuantity } = req.body;

            const { stripeSession, createdTickets } = await paymentService.beginBuyingTickets(
                stripe,
                userId,
                eventId,
                ticketsQuantity,
                process.env.STRIPE_SUCCESS_URL,
                process.env.STRIPE_CANCEL_URL
            );

            res.status(200).json({
                message: "Session has been created successfully",
                url: stripeSession.url,
                createdTickets: createdTickets
            });
        } catch (e) {
            next(e);
        }
    }

    async webhookHandler(req, res, next) {
        try {
            const sig = req.headers['stripe-signature'];

            let event;
            try {
                event = stripe.webhooks.constructEvent(
                    req.rawBody,
                    sig,
                    process.env.STRIPE_WEBHOOK_SECRET
                );
            } catch (err) {
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }

            const ticketsIds = event.data?.object?.metadata?.ticketsIds;

            switch (event.type) {
                case "checkout.session.completed":
                    await paymentService.completedBuyingTickets(ticketsIds);
                    break;
                case "checkout.session.expired":
                    await paymentService.expiredBuyingTickets(ticketsIds);
                    break;
                default:
                    console.warn("Unhandled event type:", event.type);
                    break;
            }

            res.status(200).send();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PaymentController();
