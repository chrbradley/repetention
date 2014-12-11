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
    var deckId = this._id;
    Meteor.call('makeList', deckId, function(error, result) {
      if (error) {
        console.log('Whoops, could not verify deck in list');
        console.log('error: ' + error);
        return;
      }
      if (result) {
        console.log('sucessfully verified deck');
        console.log('result: ' + result);
      } else {
        console.log('nothing returned from makeList');
      }
    });
  }
});
