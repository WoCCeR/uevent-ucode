const ApiError = require("../exceptions/apiError");
const path = require("path");
const fs = require("fs");
const companyService = require("../services/companyService");

class CompanyController {
    async getCompanies(req, res, next) {
        try {
            const companies = await companyService.getCompanies();
            res.json(companies);
        } catch(e) {
            next(e);
        }
    }

    async getUserCompanies(req, res, next) {
        try {
            const userId = req.params.id;

            const companies = await companyService.getUserCompanies(userId);
            res.json(companies);
        } catch(e) {
            next(e);
        }
    }

    async getCompany(req, res, next) {
        try {
            const id = req.params.id;
            const company = await companyService.getCompanyById(id);
            res.json(company);
        } catch(e) {
            next(e);
        }
    }

    async createCompany(req, res, next) {
        try {
            const { name, description, location } = req.body;
            const userId = req.user.id;

            const company = await companyService.createCompany(name, description, location, userId);
            res.json(company);
        } catch(e) {
            next(e);
        }
    }

    async deleteCompany(req, res, next) {
        try {
            const companyId = req.params.id;

            await companyService.deleteCompany(companyId);
            res.status(200).json({ message: 'Company is successfully removed' });
        } catch(e) {
            next(e);
        }
    }

    async updateCompany(req, res, next) {
        try {
            const userId = req.user.id;
            const companyId = req.params.id;
            const updatedFields = req.body;

            const company = await companyService.updateCompany(companyId, updatedFields);
            res.json(company);
        } catch(e) {
            next(e);
        }
    }

    async uploadCompanyImage(req, res, next) {
        try {
            const userId = req.user.id;
            const { photo } = req.files;
            const companyId = req.params.id;

            if (!photo) {
                return res.status(400).json({ message: 'Photo is required' });
            }
            const uploadDir = path.join(__dirname, '../public/companiesImages');
            fs.mkdirSync(uploadDir, { recursive: true });
            const randomChars = Array.from({ length: 7 }, () =>
                String.fromCharCode(Math.floor(Math.random() * 26) + 97)
            ).join('');

            const fileName = `${userId}_${randomChars}.png`;
            const filePath = path.join(uploadDir, fileName);
            await photo.mv(filePath);
            const imageUrl = `${process.env.API_URL}/public/companiesImages/${fileName}`;
           const updatedCompany = await companyService.uploadCompanyImage(companyId, imageUrl);
            res.json(updatedCompany);
        } catch (e) {
            next(e);
        }
    }

    async deleteCompanyImage(req, res, next) {
        try {
            const userId = req.user.id;
            const companyId = req.params.id;

            const updatedCompany = await companyService.deleteCompanyImage(companyId);
            res.json(updatedCompany);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CompanyController();