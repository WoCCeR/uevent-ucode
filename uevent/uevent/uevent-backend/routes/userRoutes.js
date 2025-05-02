const Router = require('express').Router;
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/events/:id', userController.getEventUsers);
router.patch('/update', authMiddleware, userController.updateUser);
router.patch('/avatar', authMiddleware, userController.uploadUsersAvatar);
router.delete('/avatar', authMiddleware, userController.deleteUsersAvatar);
router.post('/changepass', authMiddleware, userController.changePass);
router.post('/notification', authMiddleware, userController.toggleNotification);
router.delete('/', authMiddleware, userController.deleteUser);

module.exports = router;