Template.decksList.helpers({
  decks: function() {
    return Decks.find({}, {sort: {date: -1}});
  }
});