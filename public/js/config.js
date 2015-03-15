require.config({
    baseUrl: 'js/',
    paths: {
        //Questions module
        //Models
        'AnswerModel': 'AnswersModule/Models/AnswerModel',
        //Collections
        'AnswersCollection': 'AnswersModule/Collections/AnswersCollection',
        //Views
        'AnswerView': 'AnswersModule/Views/AnswerView',
        'AnswerListView': 'AnswersModule/Views/AnswerListView',
        'AddAnswerView': 'AnswersModule/Views/AddAnswerView',
        //Modules
        'AnswersModule': 'AnswersModule/AnswersModule',


        //Answers module
        //Models
        'QuestionModel': 'QuestionsModule/Models/QuestionModel',
        //Collections
        'QuestionsCollection': 'QuestionsModule/Collections/QuestionsCollection',
        //Views
        'QuestionView': 'QuestionsModule/Views/QuestionView',
        'QuestionListView': 'QuestionsModule/Views/QuestionListView',
        'AddQuestionView': 'QuestionsModule/Views/AddQuestionView',
        //Modules
        'QuestionsModule': 'QuestionsModule/QuestionsModule',

        // Templates
        'QuestionTemplate': '../templates/QuestionTemplate',
        'AnswerTemplate': '../templates/AnswerTemplate',
        'AddQuestionTemplate': '../templates/AddQuestionTemplate',
        'AddAnswerTemplate': '../templates/AddAnswerTemplate',
        'QuestionModuleTemplate': '../templates/QuestionModuleTemplate',
        'AnswerModuleTemplate': '../templates/AnswerModuleTemplate',
        'EmptyTemplate': '../templates/EmptyTemplate',

        'Route': 'Route',
        'Application': 'Application',
        'EmptyView': 'EmptyView',

        templates: '../templates',
        text: 'frameworks/require/text',
        tpl: 'frameworks/require/require-tpl',
        underscore: 'frameworks/Underscore/underscore',

        shim: {
            underscore: {
                exports: '_'
            }
        }
    }
});

require(['Application', 'Router'], function(Application, Router) {
    Application.start(function(app) {
        Router(app);
    });
});