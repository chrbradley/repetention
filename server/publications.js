Meteor.publish('decks', function() {
  return Decks.find({}, {sort: {date: -1, name: -1}});
});
