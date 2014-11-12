Meteor.publish('decks', function() {
  return Decks.find();
});
