var AnswersModule = Backbone.Marionette.Module.extend({
    startWithParent: false,

    initialize: function( ModuleName, Application, options ) {
        this.addAnswerRegion = Application.addAnswer;
        this.answersListRegion = Application.answersList;
    },

    onStart: function(options) {
        this.addAnswerRegion.show(
            new AddAnswerView({
                question: options.question,
                collection: options.collection
            })
        );
        this.answersListRegion.show(
            new AnswerListView({
                collection: options.collection
            })
        );
    },

    onStop: function() {
        this.addAnswerRegion.empty();
        this.answersListRegion.empty();
    }
});