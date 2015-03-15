define('Router',
    [
        'AnswersCollection',
        'QuestionsCollection',
        'QuestionModel'
    ],
    function(AnswersCollection, QuestionsCollection, QuestionModel) {
        var Controller = Backbone.Marionette.Controller.extend({
            answersCollection: new AnswersCollection(),
            questionsCollection: new QuestionsCollection(),
            currentModule: null,

            initialize: function(app) {
                this.application = app;
            },

            showQuestions: function() {
                if(this.currentModule) {
                    this.currentModule.stop();
                }
                this.currentModule = this.application.module('QuestionsModule');
                this.currentModule.start({
                    collection: this.questionsCollection
                });
            },

            showAnswers: function(questionId) {
                var question = new QuestionModel();
                if(this.currentModule) {
                    this.currentModule.stop();
                }
                this.currentModule = this.application.module('AnswersModule');
                question.setUrl({ id: questionId }).fetch({
                    success: $.proxy(function(question) {
                        this.startAnswerModule(question);
                    }, this)
                });
            },

            startAnswerModule: function(question) {
                this.currentModule.start({
                    question: question,
                    collection: this.answersCollection
                });
            }
        });

        function init(app) {
            new Backbone.Marionette.AppRouter().processAppRoutes(new Controller(app), {
                '': 'showQuestions',
                'answers/:questionId': 'showAnswers'
            });
        }

        return init;
    }
);
