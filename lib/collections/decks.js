Decks = new Mongo.Collection('decks');

Decks.allow({
  insert: function(userid, doc){
    // only allow new decks if user is logged in
    return !! userId;
  }
});
