define('QuestionsModule', [
    'AddQuestionView',
    'QuestionListView',
    'tpl!QuestionModuleTemplate'
],
    function(AddQuestionView, QuestionListView, template) {
        var QuestionsModule = Marionette.Module.extend({
            startWithParent: false,

            initialize: function( ModuleName, Application, options ) {

            },

            onStart: function(options) {
                $('main').html(template());

                Application.addRegions({
                    addQuestion: '.add-question-region',
                    activeQuestionsList: '.questions-list-region #active',
                    deletedQuestionsList: '.questions-list-region #deleted'
                });
                $('.loading-container').show();
                options.collection.fetch({ success: this.showRegions.bind(this) })

            },

            showRegions: function(collection) {
                $('.loading-container').hide();
                collection.sort();

                Application.addQuestion.show(
                    new AddQuestionView({
                        collection: collection
                    })
                );
                Application.activeQuestionsList.show(
                    new QuestionListView({
                        collection: collection,
                        filter: function (child, index, collection) {
                            return child.get('status') === 'created';
                        }
                    })
                );
                Application.deletedQuestionsList.show(
                    new QuestionListView({
                        collection: collection,
                        filter: function (child, index, collection) {
                            return child.get('status') === 'deleted';
                        }
                    })
                );
            },

            onStop: function() {
                Application.activeQuestionsList.empty();
                Application.deletedQuestionsList.empty();
                Application.addQuestion.empty();
            }
        });

    return QuestionsModule;

});