var AnswerModel = function() {
    var db = require('mongoose-simpledb').db;

    var getAnswers = function (question, options, success, error) {
        db.Questions.findById(question, function(err, question) {
            if (err || !question) {
                error();
                return;
            }
            db.Answers.find({ question: question._id }, success).skip(options.start).limit(options.stop);
        });
    };

    var save = function (question, params, success, error) {
        db.Questions.findById(question, function(err, question) {
            var answer;

            if (err || !question) {
                error();
                return;
            }
            params.question = question._id;
            answer = new db.Answers(params);
            answer.save(success);
        });
    };

    var update = function (query, params, callback) {
        db.Answers.findByIdAndUpdate(query, params, {}, callback);
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