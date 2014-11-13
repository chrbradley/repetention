Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('decks');
  }
});

Router.route('/', {
  name: 'decksList'
});

Router.route('/decks/:_id', {
  name: 'deckPage',
  data: function() {
    return Decks.findOne(this.params._id);
  }
});
