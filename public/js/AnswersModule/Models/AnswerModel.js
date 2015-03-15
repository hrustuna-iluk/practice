define('AnswerModel', [
    'QuestionModel'
],
    function(QuestionModel) {
        var AnswerModel = Backbone.Model.extend({
            urlRoot: 'board/answer',
            idAttribute: '_id',

            defaults: function() {
                return {
                    text: '',
                    creator: '',
                    question: QuestionModel,
                    status: 'created',
                    whoDeleted: '',
                    amountOfClicks: 0
                }
            },

            changeStatus: function(value) {
                this.set('status', value);
            },

            getText: function() {
                return this.get('text');
            },

            getWhoDeleted: function() {
                return this.get('whoDeleted');
            },

            setWhoDeleted: function(value) {
                this.set('whoDeleted', value)
            },

            getStatus: function() {
                return this.get('status');
            },

            incAmountOfClicks: function() {
                this.set('amountOfClicks', this.get('amountOfClicks') + 1);
            },

            validate: function(attr) {
                if (!/^(https?:\/\/[^\s]+)$/.test(attr.text)) {
                    return 'Answer has to be the link!';
                }
            }
        });

        return AnswerModel;

    });