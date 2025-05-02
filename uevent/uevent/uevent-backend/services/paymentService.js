const User = require('../models/User');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');

class PaymentService {
    async beginBuyingTickets(stripe, userId, eventId, ticketsQuantity) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error("User with inputted id does not exist, inputted id: " + userId);
        }
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw new Error("Event with inputted id does not exist, inputted id: " + eventId);
        }
        if (event.tickets_maximal_amount < (await Ticket.findAll({where: {event_id: eventId}})).length + ticketsQuantity) {
            throw new Error("Can not buy so many tickets for event, event id: " + eventId);
        }

        let createdTickets = new Array();
        for(let index = 0; index < ticketsQuantity; index++) {
            createdTickets.push(await Ticket.create(userId, eventId));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            metadata: {
                ticketsIds: createdTickets.map(function(ticket) {ticket.id})
            },
            customer_email: user.email,
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: event.name,
                        description: event.description
                    },
                    unit_amount: event.ticket_price
                },
                quantity: ticketsQuantity
            }],
            expires_at: Math.ceil(
                new Date().getTime() / 1000 + Number(process.env.STRIPE_SESSION_EXPIRE_TIME)
            ),
            success_url: process.env.CLIENT_URL + process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.CLIENT_URL + process.env.STRIPE_CANCEL_URL,
        });

        return {
            stripeSession: stripeSession,
            createdTickets: createdTickets
        }
    }

    async completedBuyingTickets(ticketsIds) {
        for (const ticketId of ticketsIds) {
            let ticket = await Ticket.findByPk(ticketId);
            if (!ticket) {
                throw new Error("Ticket with this id does not exist, inputted id: " + ticketId);
            }
            await ticket.update({status: "confirmed"});
        }
    }

    async expiredBuyingTickets(ticketsIds) {
        for (const ticketId of ticketsIds) {
            let ticket = await Ticket.findByPk(ticketId);
            if (!ticket) {
                throw new Error("Ticket with this id does not exist, inputted id: " + ticketId);
            }
            await ticket.destroy();
        }
    }
}

module.exports = new PaymentService()