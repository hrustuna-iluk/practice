var QuestionModel = function() {
    var db = require('mongoose-simpledb').db;

    var getQuestions = function (options, success, error) {
        db.Questions.find({}, success).skip(options.start).limit(options.stop);
    };

    var getQuestion = function (id, success, error) {
        db.Questions.findById(id, success);
    };

    var save = function (email, params, success, error) {
        db.Users.findOne({email: email}, function(err, user) {
            var question;

            if (err || !user) {
                error();
                return;
            }
            params.user = user._id;
            question = new db.Questions(params);
            question.save(success);
        });
    };

    var update = function (query, params, callback) {
        db.Questions.findByIdAndUpdate(query, params, {}, callback);
    };

    var remove = function (query, callback) {
        db.Questions.remove(query, callback);
    };

    return {
        getQuestions: getQuestions,
        getQuestion: getQuestion,
        save: save,
        update: update,
        remove: remove
    }
};

module.exports = QuestionModel;