define('AddAnswerView', [
    'AnswerModel',
    'tpl!AddAnswerTemplate'
],
    function(AnswerModel, template) {
        var AddAnswerView = Backbone.Marionette.ItemView.extend({
            template: template,

            events: {
                'click @ui.addAnswerButton': 'addAnswer',
                'keypress @ui.text': 'pressEnter'
            },

            ui: {
                addAnswerButton: '#addAnswer',
                text: '#answer'
            },

            initialize: function(options) {
                Application.ViewEventChannel.vent.on('changeAnswer', $.proxy(this.changeAnswer, this));
            },

            pressEnter: function(e) {
                if(e.keyCode === 13){
                    this.addAnswer();
                    return false;
                }
            },

            changeAnswer: function(model) {
                this.ui.text.val( model.getText() );
            },

            addAnswer: function() {
                var text = this.ui.text.val();
                if(!text.length) return;
                var newAnswer = new AnswerModel({
                    text: text,
                    question: this.options.question.getId()
                });
                this.ui.text.closest('form-group').removeClass('error');
                newAnswer.on('invalid', $.proxy(function(model, error, options) {
                    bootbox.alert(error);
                }, this));
                newAnswer.save(null,
                {
                    success: $.proxy(function() {
                        this.collection.add(newAnswer);
                    }, this)
                });
                this.ui.text.val('');
            },

            serializeData: function() {
                return this.options.question.toJSON();
            }
        });

        return AddAnswerView;

    }
);