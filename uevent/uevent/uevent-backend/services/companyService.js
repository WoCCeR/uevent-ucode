const Company = require('../models/Company');
const User = require('../models/User');
const UserCompany = require('../models/UserCompany');
const Event = require('../models/Event');
const eventService = require('../services/eventService');
const ApiError = require("../exceptions/apiError");
const UserDto = require("../dtos/UserDto");

class CompanyService {
    async getCompanies(){
        return await Company.findAll();
    }

    async getUserCompanies(userId) {
        const userCompanies = await UserCompany.findAll({
            where: { user_id: userId }
        });

        const companyIds = userCompanies.map(userCompany => userCompany.company_id);

        const companies = await Company.findAll({
            where: { id: companyIds }
        });

        return companies;
    }

    async getCompanyById(companyId){
        const company = await Company.findOne({where: {id: companyId}});
        if (!company) {
            throw ApiError.notFound("Company not found");
        }
        return company;
    }

    async createCompany(name, description, location, creatorId) {
        const user = await User.findByPk(creatorId);
        if (!user) {
            throw ApiError.badRequest("User does not exist");
        }

        const company = await Company.create({ name, description, location });
        await company.reload(); // <-- ВАЖЛИВО: підтягнути id з бази

        console.log("Creating company with name:", name);
        console.log("User ID:", creatorId);
        console.log("Company ID:", company.id);
        console.log("Trying to create UserCompany entry...");

        try {
            await UserCompany.create({ user_id: creatorId, company_id: company.id, role_id: 1 });
            console.log("UserCompany link created successfully!");
        } catch (err) {
            console.error("Failed to create user-company link:", err);
        }

        return company;
    }


    async deleteCompany(companyId) {
        const company = await Company.findByPk(companyId);
        if (!company) {
            throw ApiError.badRequest('Company is not found');
        }

        await UserCompany.destroy({ where: { company_id: companyId } });
        const events = await Event.findAll({ where: { company_id: companyId } });

        for (const event of events) {
            await eventService.deleteEvent(event.id);
        }

        await Company.destroy({ where: { id: companyId } });
    }

    async updateCompany(companyId, updatedFields) {
        const company = await Company.findByPk(companyId);
        if (!company) {
            throw ApiError.notFound("Company not found");
        }

        if (updatedFields.name) {
            company.name = updatedFields.name;
        }
        if (updatedFields.description) {
            company.description = updatedFields.description;
        }
        if (updatedFields.location) {
            company.location = updatedFields.location;
        }

        await company.save();
        return company;

    }

    async uploadCompanyImage(companyId, imagePath) {
        const company = await Company.findByPk(companyId);

        if (!company) {
            throw ApiError.badRequest('Company is not found');
        }
        if (imagePath) {
            company.logo = imagePath;
        }

        await company.save();
        return company;
    }

    async deleteCompanyImage(companyId) {
        const company = await Company.findByPk(companyId);

        if (!company) {
            throw ApiError.notFound("Company not found");
        }

        company.logo = null;
        await company.save();
        return company;
    }
}

module.exports = new CompanyService();