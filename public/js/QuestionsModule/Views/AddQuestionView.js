var AddQuestionView = Backbone.Marionette.ItemView.extend({
    template: '#add-question-template',

    events: {
        'click @ui.addQuestionButton': 'addQuestion',
        'keypress @ui.text': 'pressEnter'
    },

    ui: {
        addQuestionButton: '#addQuestion',
        text: '#question'
    },

    initialize: function(options) {
        ViewEventChannel.vent.on('changeQuestion', $.proxy(this.changeQuestion, this));
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
            text: text,
            creator: Application.request('user').get('name')
        });
        this.collection.add(newQuestion);
        newQuestion.save();
        this.ui.text.val('');
    }
});