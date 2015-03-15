define('QuestionsCollection', [
    'QuestionModel'
],
    function(QuestionModel) {
        var QuestionsCollection = Backbone.Collection.extend({
            url: 'board/questions',
            model: QuestionModel,

            sort_key: 'amountOfClicks',

            comparator: function(a, b) {
                a = a.get(this.sort_key);
                b = b.get(this.sort_key);
                return a < b ?  1
                    : a > b ? -1
                    :          0;
            }
        });

        return QuestionsCollection;

    });