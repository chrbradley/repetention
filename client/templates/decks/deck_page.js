Template.deckPage.helpers({
  cards: function() {
    return Cards.find({deckId: this._id});
  }
});
