const User = require('../models/User');
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exceptions/apiError');
const bcrypt = require('bcrypt');
const Links = require('../models/Links');
const Tokens = require('../models/Tokens');
const Ticket = require('../models/Ticket');

class UserService {

    async getUsers() {
        try {
            const users = await User.findAll();
            if (users) {
                return users.map(user => new UserDto(user));
            } else {
                throw ApiError.notFound('Users not found');
            }
        } catch (error) {
            throw error;
        }

    }

    async getUser(id) {
        try {
            const user = await User.findOne({where: {id: id}});
            if (!user) {
                return new UserDto(user);
            } else {
                throw ApiError.badRequest('User not found');
            }
        } catch (error) {
            throw error;
        }
    }

    async  getEventUsers(eventId) {
        const tickets = await Ticket.findAll({ where: { event_id: eventId } });

        const users = await Promise.all(tickets.map(async ticket => {
            const user = await User.findByPk(ticket.user_id);
            return new UserDto(user);
        }));

        return users;
    }


    async updateUser(id, updatedFields) {
        try {
            const user = await User.findOne({where: {id: id}});
            if (!user) {
                throw ApiError.badRequest('User not found');
            }

            if (updatedFields.firstName) {
                user.first_name = updatedFields.firstName;
            }

            if(updatedFields.surname) {
                user.surname = updatedFields.surname;
            }

            if (updatedFields.email) {
                user.email = updatedFields.email;
            }

            await user.save();

            return new UserDto(user);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findAll({where: {id: id}});
            if (!user) {
                throw ApiError.badRequest('User exists');
            } else {
                await Links.destroy({where: {user_id: id}});
                await Tokens.destroy({where: {user_id: id}});

                await User.destroy({where: {id: id}});
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async uploadUserPhoto(id, photoPath) {
        try {
            const user = await User.findOne({where: {id: id}});

            if (!user) {
                throw ApiError.badRequest('User not found');
            }
            if (photoPath) {
                user.profile_image = photoPath;
            }

            await user.save();
            return new UserDto(user);
        } catch (error) {
            throw error;
        }
    }

    async deleteUserPhoto(id) {
        try {
            const user = await User.findOne({where: {id: id}});
            if (!user) {
                throw ApiError.badRequest('User not found');
            } else {
                user.profile_image = null;
                await user.save();
                return new UserDto(user);
            }
        } catch (error) {
            throw error;
        }
    }

    async changePass(id, passwords) {
        try {
            const user = await User.findOne({where: {id: id}});

            if (!user) {
                throw ApiError.badRequest('User not found');
            }

            let hashedOldPassword = await bcrypt.hash(passwords.oldPassword, 3);

            if (user.password !== hashedOldPassword) {
                throw ApiError.badRequest('Passwords not matched');
            } else {
                let hashedNewPassword = await bcrypt.hash(passwords.newPassword, 3);
                user.password = hashedNewPassword;
                await user.save();
            }
        } catch (error) {
            throw error;
        }
    }

    async toggleNotifications(userId, notificationValue) {
        const user = await User.findOne({where: {id: userId}});

        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        user.notifications = notificationValue;
        await user.save();
        return { notifications: notificationValue };
    }


}
module.exports = new UserService();