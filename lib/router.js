Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
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

Router.route('/decks/:_id/edit', {
  name: 'deckEdit',
  data: function() {
    return Decks.findOne(this.params._id);
  }
});

Router.route('/deck/submit', {
  name: 'deckSubmit'
});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction('dataNotFound', {only: 'deckPage'});
Router.onBeforeAction(requireLogin, {only: 'deckSubmit'});
