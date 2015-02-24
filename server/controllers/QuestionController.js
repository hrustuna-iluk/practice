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
            req.user.name,
            {},
            function(err, questions) {
               res.json(questions);
            },
            function() {
                errorHandler(res);
            }
        );
    }

    function showQuestion(req, res) {
        AnswerModel.getAnswers(
            req.params.question,
            {},
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
            creator: req.body.creator
        };
        QuestionModel.save(
            req.user.name,
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
            creator: req.body.creator,
            question: req.body.question
        };
        AnswerModel.save(
            answer,
            function(err, answer) {
                if (err) {
                    errorHandler(res);
                    return;
                }
                res.json(answer);
            }
        );
    }

    return {
        showBoard: showBoard,
        showQuestion: showQuestion,
        showQuestions: showQuestions,
        addQuestion: addQuestion,
        addAnswer: addAnswer
    }
};

module.exports = QuestionController;