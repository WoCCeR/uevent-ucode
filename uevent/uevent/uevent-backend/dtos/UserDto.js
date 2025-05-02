module.exports = class UserDto {
    id;
    firstName;
    surname;
    email;
    profileImage;
    sessionId;
    emailConfirmed;
    notifications;

    constructor(model, sessionId) {
        this.id = model.id;
        this.firstName = model.first_name;
        this.surname = model.surname;
        this.email = model.email;
        this.profileImage = model.profile_image;
        this.sessionId = sessionId;
        this.notifications = model.notifications;
        this.emailConfirmed = model.email_confirmed;
    }
}