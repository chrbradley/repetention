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

// moved to the bottom because it will match every route
Router.route('/:decksLimit?', {
  name: 'decksList',
  waitOn: function() {
    var limit = parseInt(this.params.decksLimit) || 5;
    return Meteor.subscribe('decks', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    return {
      decks: Decks.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
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
