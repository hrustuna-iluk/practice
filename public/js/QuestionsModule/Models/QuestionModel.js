define('QuestionModel', [],
    function() {

        var QuestionModel = Backbone.Model.extend({
            urlRoot: 'board/question',
            idAttribute: '_id',

            setUrl: function(params) {
                this.urlRoot = _.template('board/question/<%=id%>')( params );
                return this;
            },

            defaults: function() {
                return {
                    text: '',
                    rating: 0,
                    creator: '',
                    status: 'created',
                    whoDeleted: '',
                    amountOfClicks: 0
                }
            },

            getId: function() {
                return this.id;
            },

            changeStatus: function(value) {
                this.set('status', value);
            },

            getStatus: function() {
                return this.get('status');
            },

            getWhoDeleted: function() {
                return this.get('whoDeleted');
            },

            setWhoDeleted: function(value) {
                this.set('whoDeleted', value)
            },

            getText: function() {
                return this.get('text');
            },

            incAmountOfClicks: function() {
                this.set('amountOfClicks', this.get('amountOfClicks') + 1);
            }
        });

        return QuestionModel;

    });