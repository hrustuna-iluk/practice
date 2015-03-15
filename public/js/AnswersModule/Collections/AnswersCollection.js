define('AnswersCollection', [
    'AnswerModel'
],
    function(AnswerModel) {
        var AnswersCollection = Backbone.Collection.extend({
            sort_key: 'amountOfClicks',

            setUrl: function(params) {
                this.url = _.template('board/answers/<%=question%>')( params );
                return this;
            },

            model: AnswerModel,

            comparator: function(a, b) {
                a = a.get(this.sort_key);
                b = b.get(this.sort_key);
                return a < b ?  1
                    : a > b ? -1
                    :          0;
            }
        });

        return AnswersCollection;

    });