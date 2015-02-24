var AnswerView = Backbone.Marionette.ItemView.extend({
    tagName: "li",
    className: "list-group-item",
    template: '#answer-template',

    modelEvents: {
        'change': 'render'
    },

    events: {
        'click @ui.deleteButton': 'deleteAnswer',
        'click @ui.changeButton': 'changeAnswer'
    },

    ui: {
        deleteButton: '.deleteAnswer',
        changeButton: '.changeAnswer'
    },

    deleteAnswer: function() {
        this.model.changeStatus();

    },

    changeAnswer: function() {
        ViewEventChannel.vent.trigger('changeAnswer', this.model);
    },

    onRender: function() {
        if (!this.model.isActive()) {
            this.$el.addClass('non-active');
        }
    }
});