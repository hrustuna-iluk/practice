define('EmptyView', [
    'tpl!EmptyTemplate'
],
    function(template) {
        var EmptyView = Marionette.ItemView.extend({
            template: template
        });

        return EmptyView;

    });