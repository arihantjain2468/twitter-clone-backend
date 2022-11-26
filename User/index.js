const Express =  require('express')
const UserController =  require('./user.controller');
const router = Express.Router()

router.post('/register' , UserController.register );
router.post('/login',UserController.login);

module.exports  = router;
