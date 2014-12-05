// deck list publication
// options are submitted sort and pagination limit
Meteor.publish('decks', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Decks.find({}, options);
});

// publish single deck based on id
Meteor.publish('singleDeck', function(id) {
  check(id, String);
  return Decks.find(id);
});

// publish all card belonging to a specific deck
Meteor.publish('cards', function(deckId) {
  check(deckId, String);
  return Cards.find({deckId: deckId});
});

Meteor.publish('userProfile',function(username){
  // simulate network latency by sleeping 2s
  Meteor._sleepForMs(2000);
  // try to find the user by username
  var user = Meteor.users.findOne({
      username:username
  });
  // if we can't find it, mark the subscription as ready and quit
  if(!user){
    this.ready();
    return;
  }
  // if the user we want to display the profile is the currently logged in user...
  if(this.userId==user._id){
    // then we return the corresponding full document via a cursor
    return Meteor.users.find(this.userId);
  }
  else{
    // if we are viewing only the public part, strip the "profile"
    // property from the fetched document, you might want to
    // set only a nested property of the profile as private
    // instead of the whole property
    return Meteor.users.find(user._id,{
        fields:{
            "profile":0
        }
    });
  }
});