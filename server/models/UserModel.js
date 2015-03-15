var UserModel = function() {
    var db = require('mongoose-simpledb').db;

    var getUser = function (query, callback) {
        db.Users.findOne(query, callback);
    };

    var getUsers = function (query, callback) {
        db.Users.find(query, callback);
    };

    var save = function (params, callback) {
        var User = new db.Users(params);

        User.setPassword();
        User.save(callback);
    };

    var update = function (query, params, callback) {
        db.Users.where(query).update(params, callback);
    };

    var remove = function (query, callback) {
        db.Users.remove(query, callback);
    };

    return {
        getUser: getUser,
        getUsers: getUsers,
        save: save,
        update: update,
        remove: remove
    }
};

module.exports = UserModel;