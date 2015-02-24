var GroupModel = function() {
    var db = require('mongoose-simpledb').db;

    var getGroup = function (query, callback) {
        db.Groups.findOne(query, callback);
    };

    var getGroups = function (query, callback) {
        db.Groups.find(query, callback);
    };

    var save = function (params, callback) {
        var group = new db.Groups(params);

        group.setPassword();
        group.save(callback);
    };

    var update = function (query, params, callback) {
        db.Groups.where(query).update(params, callback);
    };

    var remove = function (query, callback) {
        db.Groups.remove(query, callback);
    };

    return {
        getGroup: getGroup,
        getGroups: getGroups,
        save: save,
        update: update,
        remove: remove
    }
};

module.exports = GroupModel;