define('AnswersModule', [
    'AddAnswerView',
    'AnswerListView',
    'tpl!AnswerModuleTemplate'
],
    function(AddAnswerView, AnswerListView, template) {
        var AnswersModule = Marionette.Module.extend({
            startWithParent: false,

            initialize: function( ModuleName, Application, options ) {

            },

            onStart: function(options) {
                $('main').html(template());

                Application.addRegions({
                    addAnswer: '.add-answer-region',
                    activeAnswersList: '.answers-list-region #active',
                    deletedAnswersList: '.answers-list-region #deleted'
                });
                $('.loading-container').show();
                options.collection
                    .setUrl({ question: options.question.getId() })
                    .fetch({success: this.showAnswers.bind(this, options.question)})
            },

            showAnswers: function(question, collection) {
                $('.loading-container').hide();
                collection.sort();

                Application.addAnswer.show(
                    new AddAnswerView({
                        question: question,
                        collection: collection
                    })
                );
                Application.activeAnswersList.show(
                    new AnswerListView({
                        question: question,
                        collection: collection,
                        filter: function (child, index, collection) {
                            return child.get('status') === 'created';
                        }
                    })
                );
                Application.deletedAnswersList.show(
                    new AnswerListView({
                        question: question,
                        collection: collection,
                        filter: function (child, index, collection) {
                            return child.get('status') === 'deleted';
                        }
                    })
                );
            },

            onStop: function() {
                Application.addAnswer.empty();
                Application.activeAnswersList.empty();
                Application.deletedAnswersList.empty();
            }
        });

        return AnswersModule;

    });