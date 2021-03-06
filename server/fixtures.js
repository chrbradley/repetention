if (Decks.find().count() === 0) {
  var now = new Date().getTime();

  // create users
  var coopId = Meteor.users.insert({
    profile: {name: 'Cooper Dooper'}
  });
  var coop = Meteor.users.findOne(coopId);

  var shaneId = Meteor.users.insert({
    profile: {name: 'Shaney Bear'}
  });
  var shane = Meteor.users.findOne(shaneId);

  var wyattId = Meteor.users.insert({
    profile: {name: 'Wyatt Riot'}
  });
  var wyatt = Meteor.users.findOne(wyattId);

  var userBank = [coop, shane, wyatt];

  for ( var i = 0; i < 57; i++) {
    var rand = Math.floor(Math.random()*userBank.length);
    var randCards = Math.floor(Math.random()*15)+3;
    var deckId = Decks.insert({
      title: 'Deck' + i,
      userId: userBank[rand]._id,
      author: userBank[rand].profile.name,
      submitted: new Date(now - ((Math.floor(Math.random()*20)+1) * 1000 * 3600 * 24)),
      cardsCount: randCards,
      upvoters: [],
      votes: 0
    });

    for (var j = 1; j <= randCards; j++) {
      Cards.insert({
        deckId: deckId,
        question: 'This is the question '+(j),
        answer: 'This is the answer to the question '+(j)
      });
    }
  }
}
