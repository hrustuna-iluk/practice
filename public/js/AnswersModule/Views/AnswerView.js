define('AnswerView', [
    'tpl!AnswerTemplate'
],
    function(template) {
        var AnswerView = Marionette.ItemView.extend({
            tagName: "li",
            className: "list-group-item",
            template: template,

            modelEvents: {
                'change': 'render'
            },

            events: {
                'click @ui.deleteButton': 'deleteAnswer',
                'click @ui.changeButton': 'changeAnswer',
                'click @ui.text': 'onClick'
            },

            ui: {
                deleteButton: '.deleteAnswer',
                changeButton: '.changeAnswer',
                text: '.answer-text'
            },

            deleteAnswer: function() {
                this.model.changeStatus('deleted');
                this.model.setWhoDeleted(Application.request('user').get('email'));
                this.model.save();
            },

            changeAnswer: function() {
                Application.ViewEventChannel.vent.trigger('changeAnswer', this.model);
            },

            initCopyToClipBoardAction: function() {
                this.clipboard = new ZeroClipboard( this.$el.find('.copy-clipboard').get(0) );
            },

            onClick: function() {
                this.model.incAmountOfClicks();
                this.model.save();
            },

            onRender: function() {
                if (this.model.getStatus() === 'deleted') {
                    this.$el.addClass('deleted');
                }
                this.initCopyToClipBoardAction();
            }
        });

        return AnswerView;

    });