Meteor.publish('decks', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Decks.find({}, options);
});

Meteor.publish('singleDeck', function(id) {
  check(id, String);
  return Decks.find(id);
});

Meteor.publish('cards', function(deckId) {
  check(deckId, String);
  return Cards.find({deckId: deckId});
});
