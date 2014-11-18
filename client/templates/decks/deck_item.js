Template.deckItem.helpers({
  ownDeck: function() {
    return this.userId === Meteor.userId();
  },
  cardsCount: function() {
    return Cards.find({deckId: this._id}).count();
  }
});
