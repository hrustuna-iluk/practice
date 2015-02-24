var QuestionModel = function() {
    var db = require('mongoose-simpledb').db;

    var getQuestions = function (groupName, query, success, error) {
        db.Groups.findOne({name: groupName}, function(err, group) {
            if (err || !group) {
                error();
                return;
            }
            db.Questions.find({ group: group._id }, success);
        });
    };

    var save = function (groupName, params, success, error) {
        db.Groups.findOne({name: groupName}, function(err, group) {
            var question;

            if (err || !group) {
                error();
                return;
            }
            params.group = group._id;
            question = new db.Questions(params);
            question.save(success);
        });
    };

    var update = function (query, params, callback) {
        db.Questions.where(query).update(params, callback);
    };

    var remove = function (query, callback) {
        db.Questions.remove(query, callback);
    };

    return {
        getQuestions: getQuestions,
        save: save,
        update: update,
        remove: remove
    }
};

module.exports = QuestionModel;