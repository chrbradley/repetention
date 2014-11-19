Meteor.publish('decks', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Decks.find({}, options);
});

Meteor.publish('cards', function(deckId) {
  check(deckId, String);
  return Cards.find({deckId: deckId});
});
