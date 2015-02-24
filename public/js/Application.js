var Application = new Backbone.Marionette.Application();
var ViewEventChannel = Backbone.Wreqr.radio.channel('view-chanel');
var getUserNameDeffered = $.Deferred();

(function () {
    var user = new Backbone.Model({
        name: 'Anonymous',
        group: sessionStorage.getItem('group')
    });

    Application.reqres.setHandler('user', function () {
        return user;
    });
})();

function getUserName() {
    var savedUser = sessionStorage.getItem('user');

    if (savedUser) {
        Application.request('user').set({ name: savedUser });
        getUserNameDeffered.resolve();
        return;
    }
    bootbox.prompt("What is your name?", function(user) {
        Application.request('user').set({ name: user });
        sessionStorage.setItem('user', user);
        getUserNameDeffered.resolve();
    });
}

Application.addRegions({
    addQuestion: '.add-question-region',
    questionsList: '.questions-list-region',
    addAnswer: '.add-answer-region',
    answersList: '.answers-list-region'
});

Application.module('QuestionsModule', QuestionsModule);
Application.module('AnswersModule', AnswersModule);

Application.on("start", function(options){
    getUserName();

    getUserNameDeffered.done(function() {
        if (Backbone.history){
            new Router();
            Backbone.history.start();
        }
    });
});

