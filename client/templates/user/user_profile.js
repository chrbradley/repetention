Template.profile.helpers({
  username: function() {
    return Meteor.user().username;
  },
  id: function() {
    return Meteor.user()._id;
  },
  profile: function() {
    return Meteor.user().profile;
  },
  decks: function() {
    var decksArray = Object.keys(Meteor.user().profile.reviewList.decks);
    return decksArray;
  },
  cards: function() {
    var cardsArray = Object.keys(Meteor.user().profile.reviewList.cards);
    return cardsArray;
  }
});
