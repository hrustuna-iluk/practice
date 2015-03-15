var config = require('../../config');
var path = require('path');

var AuthController = function(){
    var db = require('mongoose-simpledb').db;
    var UserModel = require('../models/UserModel')();

    function authorizationFailed(req, res) {
        res.redirect('/login');
    }

    function showLoginPage(req, res) {
        res.sendfile(path.join(config.templatesDir, 'login.html'));
    }

    function login(req, res) {
        UserModel.getUser({ email: req.body.email }, function (err, user) {
            res.json({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            });
        });
    }

    function registration(req, res) {
        var user = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };

        UserModel.save(user, function (err, user) {
            if (err) {
                res.status(400).end();
                return;
            }
            res.send(user.toJSON());
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