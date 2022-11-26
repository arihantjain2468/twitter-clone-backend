const Express =  require('express');
const StatusController =  require('./status.controller');
const router = Express.Router();

router.post('/add',StatusController.add);
router.get('/fetch',StatusController.fetchAll);

module.exports=router;
