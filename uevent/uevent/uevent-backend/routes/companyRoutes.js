const Router = require('express').Router;
const authMiddleware = require('../middlewares/authMiddleware');
const router = new Router();
const companyController = require('../controllers/companyController');

router.post('/', authMiddleware, companyController.createCompany);
router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompany);
router.get('/user/:id', companyController.getUserCompanies);
router.patch('/update/:id', authMiddleware, companyController.updateCompany);
router.patch('/image/:id', authMiddleware, companyController.uploadCompanyImage);
router.delete('/image/:id', authMiddleware, companyController.deleteCompanyImage);
router.delete('/:id', authMiddleware, companyController.deleteCompany);

module.exports = router;