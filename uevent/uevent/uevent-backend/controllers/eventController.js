const eventService = require('../services/eventService');
const fs = require('fs');
const path = require('path');

class EventController {

    async getTickets(req, res, next) {
        try {
            const userId = req.user.id;
            const tickets = await eventService.getTickets(userId);
            res.json(tickets);
        } catch(e) {
            next(e);
        }
    }

    async getEvent(req, res, next) {
        try {
            const id = req.params.id;
            const event = eventService.getEvent(id);
            res.json(event);
        } catch(e) {
            next(e);
        }
    }

    async getEvents(req, res, next) {
        try {
            const events = await eventService.getEvents();
            res.json(events);
        } catch(e) {
            next(e);
        }
    }


    async createTicket(req, res, next) {
        try {
            const userId = req.user.id;
            const eventId = req.params.id;

            const ticket = await eventService.createTicket(userId, eventId);
            res.json(ticket);
        } catch (e) {
            next(e);
        }
    }

    async  createEvent(req, res, next) {
        try {
            const { companyId, eventName, description, startTime, endTime, ticketCount, ticketPrice, category, latitude, longitude } = req.body;
            const bannerImage = req.files && req.files.bannerImage ? req.files.bannerImage : null;
            const eventImage = req.files && req.files.eventImage ? req.files.eventImage : null;

            console.log("Category loh: ", category);
            if (!bannerImage || !eventImage) {
                return res.status(400).json({ message: 'Both bannerImage and eventImage are required' });
            }

            const uploadDir = path.join(__dirname, '../public/eventsImages');
            fs.mkdirSync(uploadDir, { recursive: true });

            const bannerFileName = `${Date.now()}-banner.png`;
            const eventFileName = `${Date.now()}-event.png`;

            const bannerFilePath = path.join(uploadDir, bannerFileName);
            const eventFilePath = path.join(uploadDir, eventFileName);

            await bannerImage.mv(bannerFilePath);
            await eventImage.mv(eventFilePath);

            const bannerImageUrl = `${process.env.API_URL}/public/eventsImages/${bannerFileName}`;
            const eventImageUrl = `${process.env.API_URL}/public/eventsImages/${eventFileName}`;

            const event = await eventService.createEvent(companyId , eventName, description, startTime, endTime, ticketCount, ticketPrice, bannerImageUrl, eventImageUrl, category, latitude, longitude);

            res.json(event);
        } catch (e) {
            next(e);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await eventService.getCategories();
            res.json(categories);
        } catch (e) {

        }
    }

    async updateEvent(req, res, next) {
        try {

        } catch(e) {
            next(e);
        }
    }

    async deleteEvent(req, res, next) {
        try {
            const eventId = req.params.id;

            await eventService.deleteEvent(eventId);
            res.status(200).json({ message: 'Event is successfully removed' });
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new EventController();