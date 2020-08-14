const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/index');

router.use('/user', require('./user'));

router.get('/', homeController.home);
router.get('/about', homeController.about);
router.get('/property-grid', homeController.propertyGrid);
router.get('/blog-grid', homeController.BlogGrid);
router.get('/contact', homeController.Contact);
router.get('/agent-single', homeController.AgentSingle);
router.get('/agents-grid', homeController.AgentGrid);
router.get('/blog-single', homeController.BlogSingle);
router.get('/property-single', homeController.PropertySingle);
router.get('/login', homeController.Login);
router.get('/news', homeController.News);
router.post('/search-property', homeController.searchProperty);
router.post('/filter', homeController.filterProperty);
router.get('/news-single',homeController.newsSingle);
router.get('/admin', passport.checkAuthentication, homeController.admin);
router.get('/profile', passport.checkAuthentication, homeController.profile);
router.get('/basic-table', passport.checkAuthentication, homeController.basicTable);
router.post('/send-message', homeController.sendMessage);
router.get('/add-property', homeController.property);
router.get('/add-advertiser', homeController.addAdvertiser);
router.get('/add-machinery', homeController.addMachinery);
router.get('/rent-machinery', homeController.rentMachinery);
router.get('/machinery-single', homeController.MachinerySingle);

router.get('/add-news', homeController.AddNews);

router.post('/advertise-for-me', homeController.AddAdvertise);





module.exports = router;