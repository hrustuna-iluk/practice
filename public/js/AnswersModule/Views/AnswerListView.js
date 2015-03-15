define('AnswerListView', [
    'AnswerView',
    'EmptyView'
],
    function(AnswerView, EmptyView) {
        var AnswerListView = Marionette.CollectionView.extend({
            tagName: 'ul',

            paginationCounter: 10,

            className: 'list-group',

            childView: AnswerView,

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

        return AnswerListView;

    });