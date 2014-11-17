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

Meteor.methods({
  deckInsert: function(deckAttributes) {
    check(Meteor.userId(), String);
    check(deckAttributes, {
      title: String,
    });
    
    var deckWithSameTitle = Decks.findOne({title: deckAttributes.title});
    if (deckWithSameTitle) {
      return {
        deckExists: true,
        _id: deckWithSameTitle._id
      }
    }

    var user = Meteor.user();
    var deck = _.extend(deckAttributes, {
      userId: user._id,
      author: user.username,
      date: Math.floor(Math.random()*20)+1,
      submitted: new Date()
    });
    var deckId = Decks.insert(deck);
    return {
      _id: deckId,
    };
  }
});
