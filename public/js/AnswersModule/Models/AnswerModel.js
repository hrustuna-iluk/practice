var AnswerModel = Backbone.Model.extend({
    url: 'board/answer',

    idAttribute: '_id',

    defaults: function() {
        return {
            text: '',
            creator: '',
            question: QuestionModel,
            active: true
        }
    },

    changeStatus: function() {
        var status = this.get('active');

        this.set('active', !status);
    },

    getText: function() {
        return this.get('text');
    },

    isActive: function() {
        return this.get('active');
    }
});