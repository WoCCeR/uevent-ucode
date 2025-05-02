const Event = require('../models/Event');
const Category = require('../models/Category');
const EventCategory  = require('../models/EventCategory');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Сomment');
const User = require('../models/User');
const ApiError = require("../exceptions/apiError");
const mailService = require('../services/mailService');
const {where} = require("sequelize");
const { Op } = require('sequelize');

class EventService {
    async getEvent(id){

    }

    async getEvents(){
        const events = await Event.findAll();

        for (const event of events) {
            const eventCategory = await EventCategory.findOne({
                where: { event_id: event.id }
            });

            if (eventCategory) {
                const category = await Category.findByPk(eventCategory.category_id);
                if (category) {
                    event.dataValues.categoryName = category.name;
                }
            }
        }

        return events;
    }

    async getCategories() {
        const categories = await Category.findAll();
        return categories;
    }

    async getTickets(userId){
        const userTickets = await Ticket.findAll({where: {user_id: userId}});

        return userTickets;
    }

    async createTicket(userId, eventId){
        const existingTicket = await Ticket.findOne({
            where: {
                user_id: userId,
                event_id: eventId
            }
        });

        if (existingTicket) {
            throw ApiError.badRequest("Ticket already exists for this user and event");
        }

        const ticket = await Ticket.create({
            user_id: userId,
            event_id: eventId
        });

        return ticket;
    }

    async createEvent(companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, bannerImageUrl, eventImageUrl, categoryName, latitude, longitude){
        const event = await Event.create({
            name: eventName,
            description: description,
            tickets_maximal_amount: ticketCount,
            ticket_price: ticketPrice,
            card_image: eventImageUrl,
            banner_image: bannerImageUrl,
            start_time: startTime,
            company_id: companyId,
            latitude: latitude,
            longitude: longitude,
            end_time: endTime
        });

        console.log("tuta", categoryName);
        const category = await Category.findOne({name: categoryName});
        if (!category) {
            throw ApiError.badRequest(`Category '${categoryName}' not found`);
        }
        await EventCategory.create({
            event_id: event.id,
            category_id: category.id
        });

        event.dataValues.categoryName = category.name;

        return event;
    }

    async updateEvent(id, event){

    }

    async deleteEvent(eventId) {
        const event = await Event.findByPk(eventId);
        if (!event) {
            throw ApiError.badRequest('Event is not found');
        }

        await Ticket.destroy({ where: { event_id: eventId } });
        await Comment.destroy({ where: { event_id: eventId } });
        await EventCategory.destroy({ where: { event_id: eventId } });

        await Event.destroy({ where: { id: eventId } });
    }

    async findEventsAndSendNotifications() {
        const users = await User.findAll({
            where: { notifications: true }
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const user of users) {
            const tickets = await Ticket.findAll({
                where: { user_id: user.id }
            });

            for (const ticket of tickets) {
                const event = await Event.findOne({
                    where: {
                        id: ticket.event_id,
                        start_time: {
                            [Op.between]: [today, new Date(today.getTime() + 24 * 60 * 60 * 1000)]
                        }
                    }
                });

                if (event) {
                    await mailService.sendNotification(user.email, event);
                }
            }
        }
    }

}

module.exports = new EventService();