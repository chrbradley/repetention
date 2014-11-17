Meteor.publish('decks', function() {
  return Decks.find();
});

Meteor.publish('cards', function() {
  return Cards.find();
});
