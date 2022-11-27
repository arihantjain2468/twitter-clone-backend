const express = require('express');
const Mongoose = require('mongoose');
var cors = require('cors');
const BodyParser = require('body-parser');

const server = express();
server.use(cors());
server.use(BodyParser.json());

const UserRoutes=require('./User');
const StatusRoutes = require('./Status');
const FollowRoutes = require('./Follow');

const port_no = process.env.Port || 2200;
const dburl = "mongodb://localhost:27017/twitter";

Mongoose.connect(dburl)
    .then(function (client) {
        console.log("Connected to Database");
    },
        (error) => {
            console.log(error);
        });

server.use('/user', UserRoutes);
server.use('/status', StatusRoutes);
server.use('/follow', FollowRoutes);

server.listen(port_no, function () {
    console.log("Server is running");
});
