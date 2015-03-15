var passport = require('passport');
var config = require('../config');

var Router = function(app, roleManager) {
    var AuthController = require('./controllers/AuthController')();
    var Controller = require('./controllers/Controller')();

    app.get('/', AuthController.showLoginPage);
    app.post('/registration', AuthController.registration);
    app.post('/login',
        passport.authenticate('local', { failureRedirect: '/login' }),
        AuthController.login
    );

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/board',
        roleManager.can('authenticated'),
        Controller.showBoard
    );

    app.get('/board/questions',
        roleManager.can('authenticated'),
        Controller.showQuestions
    );

    app.get('/board/question/:id',
        roleManager.can('authenticated'),
        Controller.getQuestion
    );

    app.post('/board/question',
        roleManager.can('authenticated'),
        Controller.addQuestion
    );

    app.put('/board/question/:id',
        roleManager.can('authenticated'),
        Controller.changeQuestion
    );

    app.get('/board/answers/:question',
        roleManager.can('authenticated'),
        Controller.showAnswers
    );

    app.post('/board/answer',
        roleManager.can('authenticated'),
        Controller.addAnswer
    );

    app.put('/board/answer/:id',
        roleManager.can('authenticated'),
        Controller.changeAnswer
    );
};

module.exports = Router;