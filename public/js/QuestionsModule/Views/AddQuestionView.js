define('AddQuestionView', [
    'QuestionModel',
    'tpl!AddQuestionTemplate'
],
    function(QuestionModel, template) {
        var AddQuestionView = Marionette.ItemView.extend({
            template: template,

            events: {
                'click @ui.addQuestionButton': 'addQuestion',
                'keypress @ui.text': 'pressEnter'
            },

            ui: {
                addQuestionButton: '#addQuestion',
                text: '#question'
            },

            initialize: function(options) {
                Application.ViewEventChannel.vent.on('changeQuestion', $.proxy(this.changeQuestion, this));
            },

            pressEnter: function(e) {
                if(e.keyCode === 13){
                    this.addQuestion();
                    return false;
                }
            },

            changeQuestion: function(model) {
                this.ui.text.val( model.getText() );
            },

            addQuestion: function() {
                var text = this.ui.text.val();
                if(!text.length) return;
                var newQuestion = new QuestionModel({
                    text: text
                });
                newQuestion.save({wait: true}, {success: $.proxy(function() {
                    this.collection.add(newQuestion);
                }, this)});
                this.ui.text.val('');
            }
        });

        return AddQuestionView;

    });