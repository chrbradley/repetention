Meteor.publish('decks', function() {
  return Decks.find();
});

Meteor.publish('cards', function(deckId) {
  check(deckId, String);
  return Cards.find({deckId: deckId});
});
