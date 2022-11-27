const Express =  require('express');
const FollowingController =  require('./following.controller');
const router = Express.Router();
const Authenticate = require('../authenticateToken');

router.post('/add',Authenticate.authenticate,FollowingController.add);
router.get('/fetch',Authenticate.authenticate,FollowingController.fetchAll);
router.get('/feeds',Authenticate.authenticate,FollowingController.fetchFeeds);

module.exports=router;
