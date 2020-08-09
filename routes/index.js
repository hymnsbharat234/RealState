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
router.get('/admin',passport.checkAuthentication,homeController.admin);
router.get('/profile',passport.checkAuthentication,homeController.profile);
router.get('/basic-table',passport.checkAuthentication,homeController.basicTable);
router.post('/send-message', homeController.sendMessage);
router.get('/add-property',homeController.property);





module.exports = router;