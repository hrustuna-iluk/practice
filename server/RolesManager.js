var ConnectRoles = require('connect-roles');
var md5 = require('MD5');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var RolesManager = function () {
    var db = require('mongoose-simpledb').db;
    var GroupModel = require('./models/GroupModel')(db);
    var roleManager = new ConnectRoles({
        failureHandler: function (req, res) {
            res.redirect(401, '/login');
        }
    });

    roleManager.use('authenticated', function (req, action) {
        if (req.isAuthenticated()) {
            return true;
        }
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'name'
        },
        function(name, password, done) {
            GroupModel.getGroup({ name: name }, function (err, group) {
                if (err) { return done(err); }
                if (!group) { return done(null, false); }
                if (group.password !== md5(password)) { return done(null, false); }
                return done(null, group);
            });
        }
    ));

    passport.serializeUser(function(group, done) {
        done(null, group.id);
    });

    passport.deserializeUser(function(id, done) {
        db.Groups.findById(id, function (err, group) {
            done(err, group);
        });
    });

    return roleManager
};


module.exports = RolesManager;