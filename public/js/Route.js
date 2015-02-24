var Controller = Backbone.Marionette.Controller.extend({
    answersCollection: new AnswersCollection(),
    questionsCollection: new QuestionsCollection(),
    currentModule: null,

    showQuestions: function() {
        if(this.currentModule) {
            this.currentModule.stop();
        }
        this.currentModule = Application.module('QuestionsModule');
        this.currentModule.start({
            collection: this.questionsCollection
        });
    },

    showAnswers: function(questionId) {
        if(this.currentModule) {
            this.currentModule.stop();
        }
        this.currentModule = Application.module('AnswersModule');
        this.currentModule.start({
            question: this.questionsCollection.findWhere({ id: questionId }),
            collection: this.answersCollection
        });

    }
});

var Router = Backbone.Marionette.AppRouter.extend({
    controller: new Controller,

    appRoutes: {
        '': 'showQuestions',
        'answers/:questionId': 'showAnswers'
    }
});