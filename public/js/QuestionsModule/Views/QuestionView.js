var QuestionView = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    className: "list-group-item",
    template: '#question-template',

    modelEvents: {
        'change': 'render'
    },

    events: {
        'click @ui.deleteButton': 'deleteQuestion',
        'click @ui.changeButton': 'changeQuestion'
    },

    ui: {
        deleteButton: '.deleteQuestion',
        changeButton: '.changeQuestion'
    },

    deleteQuestion: function() {
        this.model.changeStatus();

    },

    changeQuestion: function() {
        ViewEventChannel.vent.trigger('changeQuestion', this.model);
    },

    onRender: function() {
        if (!this.model.isActive()) {
            this.$el.addClass('non-active');
        }
    }
});