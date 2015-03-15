define("Application",[
        "QuestionsModule",
        "AnswersModule"
    ],
    function(QuestionsModule, AnswersModule) {
        var Application = new Backbone.Marionette.Application();

        Application.ViewEventChannel = Backbone.Wreqr.radio.channel('view-chanel');

        (function () {
            var user = new Backbone.Model(JSON.parse(sessionStorage.getItem('user')));

            Application.reqres.setHandler('user', function () {
                return user;
            });
        })();

        Application.module('QuestionsModule', QuestionsModule);
        Application.module('AnswersModule', AnswersModule);

        Application.on("start", function(router){
            router(Application);
            if (Backbone.history){
                Backbone.history.start();
            }
        });

        $('#logout').on('click', function() {
            sessionStorage.clear();
        });

        window.Application = Application;
        return Application;
    }
);
