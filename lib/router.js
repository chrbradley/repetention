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
  subscriptions: function() {
    this.decksSub =  Meteor.subscribe('decks', this.findOptions());
  },
  decks: function() {
    return Decks.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.decks().count() === this.decksLimit();
    var nextPath = this.route.path({decksLimit: this.decksLimit() + this.increment});
    return {
      decks: this.decks(),
      ready: this.decksSub.ready,
      nextPath: hasMore ? nextPath : null
    };
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
