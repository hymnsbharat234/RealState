const express = require('express');
const passport  = require('passport');
const userController = require('../controllers/user');


const router = express.Router();

router.post('/create',passport.authenticate(
    'local',
    {failureRedirect:'/about',}
),userController.create); 
router.post('/add-property',userController.addProperty);
router.get('/sign-out',userController.destroySession);


module.exports = router;