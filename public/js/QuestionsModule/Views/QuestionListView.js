define('QuestionListView', [
    'QuestionView',
    'EmptyView'
],
    function(QuestionView, EmptyView) {
        var QuestionListView = Marionette.CollectionView.extend({
            tagName: 'ul',

            paginationCounter: 10,

            className: 'list-group',

            childView: QuestionView,

            emptyView: EmptyView,

            events: {
                'scroll': 'onScroll'
            },

            onScroll: _.debounce(function() {
                if (this.$el.scrollTop() + this.$el.height() >= this.$el.get(0).scrollHeight) {
                    $('.loading-container').show();
                    this.collection.fetch({data: {
                        start: this.paginationCounter,
                        stop: this.paginationCounter + 10
                    },
                    success: function() {
                        $('.loading-container').hide();
                    }});
                    this.paginationCounter += 10;
                }
            }, 300)
        });

        return QuestionListView;

    });