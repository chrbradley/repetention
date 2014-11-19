Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [];
  }
});

Router.route('/decks/:_id', {
  name: 'deckPage',
  waitOn: function() {
    return Meteor.subscribe('cards', this.params._id);
  },
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

DecksListController = RouteController.extend({
  template: 'decksList',
  increment: 10,
  decksLimit: function() {
    return parseInt(this.params.decksLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.decksLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('decks', this.findOptions());
  },
  data: function() {
    return {decks: Decks.find({}, this.findOptions())};
  }
});

// moved to the bottom because it will match every route
Router.route('/:decksLimit?', {
  name: 'decksList'
  }
);

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
