Template.deckSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var deck = {
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('deckInsert', deck, function(error, result) {
      // display error to user and abort
      if (error)
        return alert(error.reason);
      // show this result, but route anyway
      if (result.deckExists)
        alert('A deck with this title already exists.');
      
      Router.go('deckPage', {_id: result._id});
    });
  }

});
