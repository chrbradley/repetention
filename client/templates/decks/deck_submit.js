Template.deckSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var deck = {
      title: $(e.target).find('[name=title]').val()
    };
    deck._id = Decks.insert(deck);
    Router.go('deckPage', deck);
  }
});
