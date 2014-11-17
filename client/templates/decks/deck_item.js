Template.deckItem.helpers({
  ownDeck: function() {
    return this.userId === Meteor.userId();
  }
});
