Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('decks');
  }
});

Router.route('/', {name: 'decksList'});