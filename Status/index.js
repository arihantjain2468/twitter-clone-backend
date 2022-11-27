const Express =  require('express');
const StatusController =  require('./status.controller');
const router = Express.Router();
const Authenticate = require('../authenticateToken');

router.post('/add',Authenticate.authenticate,StatusController.add);
router.get('/fetch',Authenticate.authenticate,StatusController.fetchAll);

module.exports=router;
