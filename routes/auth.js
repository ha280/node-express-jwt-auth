const { Router } = require('express');
const controller = require('../controllers/authController');

const router =  Router();

router.get('/signup' , controller.signup_get);
router.post('/signup' ,controller.signup_put);
router.get('/login' ,controller.login_get);
router.post('/login' ,controller.login_put);


module.exports = router;