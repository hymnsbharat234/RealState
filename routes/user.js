const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user');


const router = express.Router();

router.post('/create', passport.authenticate(
    'local', { failureRedirect: '/', }
), userController.create);
router.post('/add-property', userController.addProperty);
router.post('/add-machinery', userController.addMachinery);
router.post('/add-avertiser-property', userController.addAdvertiser);

router.get('/delete', userController.deleteProperty);
router.get('/delete-machine', userController.deleteMachinery);
router.get('/delete-advertiser', userController.deleteAdvertisement);
router.get('/sign-out', userController.destroySession);



module.exports = router;