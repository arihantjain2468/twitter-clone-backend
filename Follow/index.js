const Express =  require('express');
const FollowingController =  require('./following.controller');
const router = Express.Router();

router.post('/add',FollowingController.add);
router.get('/fetch',FollowingController.fetchAll);
router.get('/feeds',FollowingController.fetchFeeds);

module.exports=router;
