Template.deckEdit.created = function() {
  Session.set('deckEditErrors', {});
};

Template.deckEdit.helpers({
  errorMessage: function(field) {
    return Session.get('deckEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('deckEditErrors')[field] ? 'has-error' : '';
  }
});

Template.deckEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentDeckId = this._id;

    var deckProperties = {
      title: $(e.target).find('[name=title]').val()
    };

    Decks.update(currentDeckId, {$set: deckProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('deckPage', {_id: currentDeckId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm('Delete this Deck?')) {
      var currentDeckId = this._id;
      Decks.remove(currentDeckId);
      Router.go('decksList');
    }
  }
});