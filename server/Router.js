var passport = require('passport');
var config = require('../config');

var Router = function(app, roleManager) {
    var AuthController = require('./controllers/AuthController')();
    var QuestionController = require('./controllers/QuestionController')();

    app.get('/login', AuthController.showLoginPage);
    app.post('/registration', AuthController.registration);
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        AuthController.login
    );

    app.get('/board',
        roleManager.can('authenticated'),
        QuestionController.showBoard
    );

    app.get('/board/questions',
        roleManager.can('authenticated'),
        QuestionController.showQuestions
    );

    app.post('/board/question',
        roleManager.can('authenticated'),
        QuestionController.addQuestion
    );

    app.get('/board/answers/:question',
        roleManager.can('authenticated'),
        QuestionController.showQuestion
    );

    app.post('/board/answer',
        roleManager.can('authenticated'),
        QuestionController.addAnswer
    );
};

module.exports = Router;