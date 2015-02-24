var QuestionModel = Backbone.Model.extend({
    urlRoot: 'board/question',

    idAttribute: '_id',

    defaults: function() {
        return {
            id: this.cid,
            text: '',
            rating: 0,
            creator: '',
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