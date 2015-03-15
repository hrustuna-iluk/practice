var config = require('../../config');
var path = require('path');

var QuestionController = function(){

    var QuestionModel = require('../models/QuestionModel')();
    var AnswerModel = require('../models/AnswerModel')();

    function errorHandler(res) {
        res.status(400).end();
    }

    function showBoard(req, res) {
        res.sendfile(path.join(config.templatesDir, 'board.html'));
    }

    function showQuestions(req, res) {
        QuestionModel.getQuestions(
            {
                start: req.query.start || 1,
                stop: req.query.stop || 10
            },
            function(err, questions) {
               res.json(questions);
            },
            function() {
                errorHandler(res);
            }
        );
    }

    function getQuestion(req, res) {
        QuestionModel.getQuestion(
            req.params.id,
            function(err, question) {
                res.json(question);
            },
            function() {
                errorHandler(res);
            }
        );
    }

    function showAnswers(req, res) {
        AnswerModel.getAnswers(
            req.params.question,
            {
                start: req.query.start || 1,
                stop: req.query.stop || 10
            },
            function(err, answers) {
                res.json(answers);
            },
            function() {
                errorHandler(res);
            }
        );
    }

    function addQuestion(req, res) {
        var question = {
            text: req.body.text,
            creator: [req.user.firstName, req.user.lastName].join(' ')
        };
        QuestionModel.save(
            req.user.email,
            question,
            function(err, question) {
                if (err) {
                    errorHandler(res);
                    return;
                }
                res.json(question);
            }, function() {
                errorHandler(res);
            }
        );
    }

    function addAnswer(req, res) {
        var answer = {
            text: req.body.text,
            creator: [req.user.firstName, req.user.lastName].join(' ')
        };
        AnswerModel.save(
            req.body.question,
            answer,
            function(err, answer) {
                if (err) {
                    errorHandler(res);
                    return;
                }
                res.json(answer);
            },
            function () {
                errorHandler(res);
            }
        );
    }

    function changeQuestion(req, res) {
        var data = {
            status: req.body.status,
            amountOfClicks: req.body.amountOfClicks,
            whoDeleted: req.body.whoDeleted
        };
        QuestionModel.update(
            req.params.id,
            data,
            function(err, question) {
                if (err) {
                    errorHandler(res);
                    return;
                }
                res.json(question);
            }, function() {
                errorHandler(res);
            }
        );
    }

    function changeAnswer(req, res) {
        var data = {
            status: req.body.status,
            amountOfClicks: req.body.amountOfClicks,
            whoDeleted: req.body.whoDeleted
        };
        AnswerModel.update(
            req.params.id,
            data,
            function(err, answer) {
                if (err) {
                    errorHandler(res);
                    return;
                }
                res.json(answer);
            },
            function () {
                errorHandler(res);
            }
        );
    }

    return {
        showBoard: showBoard,
        showAnswers: showAnswers,
        showQuestions: showQuestions,
        addQuestion: addQuestion,
        addAnswer: addAnswer,
        getQuestion: getQuestion,
        changeQuestion: changeQuestion,
        changeAnswer: changeAnswer
    }
};

module.exports = QuestionController;