Template.decksList.helpers({
  decks: function() {
    return Decks.find();
  }
});