var QuestionsModule = Backbone.Marionette.Module.extend({
    startWithParent: false,

    initialize: function( ModuleName, Application, options ) {
        this.addQuestionRegion = Application.addQuestion;
        this.questionsListRegion = Application.questionsList;
    },

    onStart: function(options) {
        this.addQuestionRegion.show(
            new AddQuestionView({
                collection: options.collection
            })
        );
        this.questionsListRegion.show(
            new QuestionListView({
                collection: options.collection
            })
        );
    },

    onStop: function() {
        this.addQuestionRegion.empty();
        this.questionsListRegion.empty();
    }
});