var QuestionsCollection = Backbone.Collection.extend({
    url: 'board/questions',
    model: QuestionModel
});