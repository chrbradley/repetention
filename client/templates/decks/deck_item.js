Template.deckItem.helpers({
  ownDeck: function() {
    return this.userId === Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters,userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
  cards: function() {
    return Cards.find({deckId: this._id});
  }
});

Template.deckItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },
  'click .study': function(e) {
    e.preventDefault();
    Meteor.call('addToStudyList', this._id);
  }
});
