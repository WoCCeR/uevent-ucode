const commentService = require('../services/commentService');

class CommentController {
    async createComment(req, res, next) {
        try {
            const eventId = req.params.id;
            const userId = req.user.id;
            const { content } = req.body;


            const comment = await commentService.createComment(userId, eventId, content);
            res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    async getComments(req, res, next) {
        try {
            const eventId = req.params.id;

            const comments = await commentService.getComments(eventId);
            res.json(comments);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CommentController();