const Comment = require('../models/Сomment');
const Event = require('../models/event');
const User = require('../models/user');
const ApiError = require("../exceptions/apiError");

class CommentService {
    async createComment(userId, eventId, content) {
        const event = await Event.findByPk(eventId);

        if (!event) {
            throw ApiError.badRequest("Event is not exist");
        }

        const comment = await Comment.create({
            content: content,
            user_id: userId,
            event_id: eventId
        });

        const user = await User.findByPk(userId);
        comment.dataValues.firstName = user.first_name;
        comment.dataValues.surname = user.surname;
        comment.dataValues.profileImage = user.profile_image;

        return comment;
    }

    async  getComments(eventId) {
        const event = await Event.findByPk(eventId);

        if (!event) {
            throw ApiError.badRequest("Event is not exist");
        }

        const comments = await Comment.findAll({
            where: {
                event_id: eventId
            }
        });

        for (const comment of comments) {
            const user = await User.findByPk(comment.user_id);
            if (user) {
                comment.dataValues.firstName = user.first_name;
                comment.dataValues.surname = user.surname;
                comment.dataValues.profileImage = user.profile_image;
            }
        }
        return comments;
    }


}

module.exports = new CommentService();