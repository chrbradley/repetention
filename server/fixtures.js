if (Decks.find().count() === 0) {
  Decks.insert({
    title: 'Alogorithm of an Alogorithm',
    date: 1
  });
  Decks.insert({
    title: 'The Keyword This',
    date: 9
  });
  Decks.insert({
    title: 'How to succeed',
    date: 15
  });
  Decks.insert({
    title: 'Function Binding',
    date: 2
  });
  for ( var i = 0; i < 50; i++) {
    Decks.insert({
      title: i+'Decker',
      date: Math.floor(Math.random()*20)+1
    });
  }
}
