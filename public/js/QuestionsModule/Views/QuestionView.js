define('QuestionView', [
    'tpl!QuestionTemplate'
],
    function(template) {
        var QuestionView = Marionette.ItemView.extend({
            tagName: "li",
            className: "list-group-item",
            template: template,

            modelEvents: {
                'change': 'render'
            },

            events: {
                'click @ui.deleteButton': 'deleteQuestion',
                'click @ui.changeButton': 'changeQuestion',
                'click a': 'onClick'
            },

            ui: {
                deleteButton: '.deleteQuestion',
                changeButton: '.changeQuestion'
            },

            deleteQuestion: function() {
                this.model.changeStatus('deleted');
                this.model.setWhoDeleted(Application.request('user').get('email'));
                this.model.save();
            },

            onClick: function() {
                this.model.incAmountOfClicks();
                this.model.save();
            },

            changeQuestion: function() {
                Application.ViewEventChannel.vent.trigger('changeQuestion', this.model);
            },

            onRender: function() {
                if (this.model.getStatus() === 'deleted') {
                    this.$el.addClass('deleted');
                }
            }
        });

        return QuestionView;

    });