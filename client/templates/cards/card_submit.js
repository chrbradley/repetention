Template.cardSubmit.created = function() {
  Session.set('cardSubmitErrors', {});
};

Template.cardSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('cardSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('cardSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.cardSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $question = $(e.target).find('[name=question]');
    var $answer = $(e.target).find('[name=answer]');
    var card = {
      question: $question.val(),
      answer: $answer.val(),
      deckId: template.data._id
    };

    var errors = {};
    if (!card.question) {
      errors.question = 'Please write a question';
      return Session.set('cardSubmitErrors', errors);
    }
    if (!card.answer) {
      errors.answer = 'Please write an answer';
      return Session.set('cardSubmitErrors', errors);
    }

    Meteor.call('cardInsert', card, function(error, cardId) {
      if (error) {
        throwError(error.reason);
      } else {
        $question.val('');
        $answer.val('');
      }
    });
  }
});
