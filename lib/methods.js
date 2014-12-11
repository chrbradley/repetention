// set initial review inerval to one days worth of miliseconds
var initalInterval = 86400000;

Meteor.methods({
  makeList: function(deckId) {
    check(deckId, String);
    var user  = Meteor.user();
    // check to see if a review list already exists
    if (user.profile.reviewList === undefined ) {
      // if not, create it
      Meteor.users.update(
        this.userId,
        {
          $set: {
            'profile.reviewList.decks': {},
            'profile.reviewList.cards': {}
          }
        }
      );
    }
    Meteor.call('addDeck', deckId, function(error, result) {
      if (error) {
        return error;
      }
      if (result) {
        console.log('addDeck result: '+ result);
        return result;
      }
    });
  },
  addDeck: function(deckId) {
    check(deckId, String);
    var user = Meteor.user();
    if (user.profile.reviewList.decks[deckId] === undefined ) {
      // initialize deck object for update
      deckObject = {};

      // configure deck object properties:
      // set deckId as key
      deckObject['profile.reviewList.decks.'+deckId] = {};
      // set deck review to active
      deckObject['profile.reviewList.decks.'+deckId].active = true;

      // update user profile
      Meteor.users.update(
        this.userId,
        {
          $set: deckObject
        }
      );
      Meteor.call('addCards', deckId, function(error, result) {
        if (error) {
          return error;
        }
        if (result) {
          console.log('addCards result:' + result);
          return result;
        }
      });
      return 'Monkeys!';
    }
  },
  addCards: function(deckId) {
    check(deckId, String);
    var user = Meteor.user();
    // find cards that belong to deck
    var cards = Cards.find({deckId: deckId}).fetch();

    for (var i = 0; i < cards.length; i++) {
      // init cardId
      var cardId = cards[i]._id;
      // check if card has been added to review list yet
      if ( user.profile.reviewList.cards[cardId] === undefined ) {
        console.log('Creating review card with id: '+ cardId);
        // init cardObject
        var cardObject = {};
        var revInterval = initalInterval;
        var revDate = Date.now();
        // set card_id as key
        cardObject['profile.reviewList.cards.'+cardId] = {};
        // add card fields:
        // set card id
        cardObject['profile.reviewList.cards.'+cardId]._cardId = cardId;
        // set deck id
        cardObject['profile.reviewList.cards.'+cardId]._deckId = deckId;
        // set initial easiness factor to 2.5
        cardObject['profile.reviewList.cards.'+cardId].easinessFactor = 2.5;
        // set initial card review interval to one day in miliseconds
        cardObject['profile.reviewList.cards.'+cardId].reviewInterval = revInterval;
        // set inital review date to current date
        cardObject['profile.reviewList.cards.'+cardId].reviewDate = revDate;
        // push card to review list
        Meteor.users.update(Meteor.userId(),{$set:cardObject});
      }
    }
    return user;
  }
});