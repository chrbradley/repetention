Template.deckItem.helpers({
  ownDeck: function() {
    return this.userId === Meteor.userId();
  }
});

Template.deckItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
