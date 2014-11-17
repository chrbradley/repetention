Template.decksList.helpers({
  decks: function() {
    return Decks.find({}, {sort: {submitted: -1}});
  }
});