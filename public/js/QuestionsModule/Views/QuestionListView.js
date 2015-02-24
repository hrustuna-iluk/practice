var QuestionListView = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',

    className: 'list-group',

    childView: QuestionView,

    initialize: function() {
        this.collection.fetch({reset: true});
    }
});
