const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user');


const router = express.Router();

// router.post('/create', userController.create);
router.post('/create', passport.authenticate(
    'local', { failureRedirect: '/login', }
), userController.create);
router.post('/add-property', userController.addProperty);
router.post('/add-machinery', userController.addMachinery);
router.post('/add-avertiser-property', userController.addAdvertiser);
router.post('/add-news', userController.addNews);
router.post('/add-agent', userController.addAgent);


router.get('/delete', userController.deleteProperty);
router.get('/delete-machine', userController.deleteMachinery);
router.get('/delete-advertiser', userController.deleteAdvertisement);
router.get('/delete-advertiser-property', userController.deleteAdvertiserProperty);


router.get('/delete-news', userController.deleteNews);

router.get('/delete-agent', userController.deleteAgent);
router.get('/sign-out', userController.destroySession);



module.exports = router;