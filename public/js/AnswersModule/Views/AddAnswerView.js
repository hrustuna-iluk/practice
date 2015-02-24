var AddAnswerView = Backbone.Marionette.ItemView.extend({
    template: '#add-answer-template',

    events: {
        'click @ui.addAnswerButton': 'addAnswer',
        'keypress @ui.text': 'pressEnter'
    },

    ui: {
        addAnswerButton: '#addAnswer',
        text: '#answer'
    },

    initialize: function(options) {
        ViewEventChannel.vent.on('changeAnswer', $.proxy(this.changeAnswer, this));
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
        var newAnswer = new AnswerModel({text: text});

        this.collection.add(newAnswer);
        newAnswer.save();
        this.ui.text.val('');
    },

    serializeData: function() {
        return this.options.question.toJSON();
    }
});