var config = require('../../config');
var path = require('path');

var AuthController = function(){
    var db = require('mongoose-simpledb').db;
    var GroupModel = require('../models/GroupModel')(db);

    function authorizationFailed(req, res) {
        res.redirect('/login');
    }

    function showLoginPage(req, res) {
        res.sendfile(path.join(config.templatesDir, 'login.html'));
    }

    function login(req, res) {
        res.json({ group: req.body.name });
    }

    function registration(req, res) {
        var group = {
            name: req.body.name,
            password: req.body.password
        };

        GroupModel.save(group, function (err, group) {
            if (err) {
                res.status(400).end();
                return;
            }
            res.send(group.toJSON());
        });
    }

    return {
        authorizationFailed: authorizationFailed,
        showLoginPage: showLoginPage,
        login: login,
        registration: registration
    }
};

module.exports = AuthController;