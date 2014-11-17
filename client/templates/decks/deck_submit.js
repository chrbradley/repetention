Template.deckSubmit.created = function() {
  Session.set('deckSubmitErrors', {});
};

Template.deckSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('deckSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('deckSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.deckSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var deck = {
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validateDeck(deck);
    if (errors.title) {
      return Session.set('deckSubmitErrors', errors);
    }

    Meteor.call('deckInsert', deck, function(error, result) {
      // display error to user and abort
      if (error)
        return throwError(error.reason);
      // show this result, but route anyway
      if (result.deckExists)
        throwError('A deck with this title already exists.');
      
      Router.go('deckPage', {_id: result._id});
    });
  }

});
