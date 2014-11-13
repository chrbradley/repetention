Decks = new Mongo.Collection('decks');

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
      submitted: new Date()
    });
    var deckId = Decks.insert(deck);
    return {
      _id: deckId
    };
  }
});
