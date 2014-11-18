Cards = new Mongo.Collection('cards');

Meteor.methods({
  cardInsert: function(cardAttributes) {
    check(this.userId, String);
    check(cardAttributes, {
      deckId: String,
      question: String,
      answer: String
    });

    var user = Meteor.user();
    var deck = Decks.findOne(cardAttributes.deckId);

    if (!deck)
      throw new Meteor.Error('invalid-card', 'you must add a card');

    card = _.extend(cardAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // update cardCount on deck
    Decks.update(card.deckId, {$inc: {cardsCount: 1}});
    return Cards.insert(card);
  }
});
