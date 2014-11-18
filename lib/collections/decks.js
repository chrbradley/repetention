Decks = new Mongo.Collection('decks');

Decks.allow({
  update: function(userId, deck) {
    return ownsDocument(userId, deck);
  },
  remove: function(userId, deck) {
    return ownsDocument(userId, deck);
  }
});

Decks.deny({
  update: function(userId, deck, fieldNames) {
    // whitelist fields user is allowed to edit
    return (_.without(fieldNames, 'title').lenght > 0);
  }
});

Decks.deny({
  update: function(userId, deck, fieldNames, modifier) {
    var errors = validateDeck(modifier.$set);
    return errors.title;
  }
});

validateDeck = function(deck) {
  var errors = {};
  if (!deck.title)
    errors.title = 'Please fill in a title';
  return errors;
};

Meteor.methods({
  deckInsert: function(deckAttributes) {
    check(Meteor.userId(), String);
    check(deckAttributes, {
      title: String,
    });
    
    var errors = validateDeck(deckAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-deck', 'You must set a title for your Deck');

    var deckWithSameTitle = Decks.findOne({title: deckAttributes.title});
    if (deckWithSameTitle) {
      return {
        deckExists: true,
        _id: deckWithSameTitle._id
      };
    }

    var user = Meteor.user();
    var deck = _.extend(deckAttributes, {
      userId: user._id,
      author: user.username,
      date: Math.floor(Math.random()*20)+1,
      submitted: new Date(),
      cardsCount: 0
    });
    var deckId = Decks.insert(deck);
    return {
      _id: deckId,
    };
  }
});
