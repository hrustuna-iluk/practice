var AnswerListView = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',

    className: 'list-group',

    childView: AnswerView,

    initialize: function() {
        this.collection.fetch({reset: true});
    }
});
