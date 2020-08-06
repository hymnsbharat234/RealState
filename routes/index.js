const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// router.use('/user', require('./user'));

router.get('/', userController.home);
router.get('/about', userController.about);
router.get('/property-grid', userController.powerGrid);
router.get('/blog-grid', userController.BlogGrid);
router.get('/contact', userController.Contact);
router.get('/agent-single', userController.AgentSingle);
router.get('/agents-grid', userController.AgentGrid);
router.get('/blog-single', userController.BlogSingle);
router.get('/property-single', userController.PropertySingle);
router.get('/login', userController.Login);


module.exports = router;