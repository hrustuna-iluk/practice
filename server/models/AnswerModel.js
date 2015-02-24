var AnswerModel = function() {
    var db = require('mongoose-simpledb').db;

    var getAnswers = function (question, query, success, error) {
        db.Questions.findById(question, function(err, question) {
            if (err || !question) {
                error();
                return;
            }
            db.Answers.find({ question: question._id }, success);
        });
    };

    var save = function (question, params, callback) {
        var answer = new db.Answers(params);

        answer.setPassword();
        answer.save(callback);
    };

    var update = function (query, params, callback) {
        db.Answers.where(query).update(params, callback);
    };

    var remove = function (query, callback) {
        db.Answers.remove(query, callback);
    };

    return {
        getAnswers: getAnswers,
        save: save,
        update: update,
        remove: remove
    }
};

module.exports = AnswerModel;