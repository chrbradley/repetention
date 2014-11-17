Template.deckEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentDeckId = this._id;

    var deckProperties = {
      title: $(e.target).find('[name=title]').val()
    };

    Decks.update(currentDeckId, {$set: deckProperties}, function(error) {
      if (error) {
        alert(error.reason);
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