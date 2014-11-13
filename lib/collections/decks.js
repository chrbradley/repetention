Decks = new Mongo.Collection('decks');

Decks.allow({
  insert: function(userId, doc){
    // only allow new decks if user is logged in
    return !! userId;
  }
});
