Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('play', {
    path: '/game/:id',
    data: function(){
      var game = Games.findOne(this.params.id);

      if (game) {
        game.user = game.players[Meteor.userId()];
        game.yourTurn = game.currentTurn[0] === Meteor.userId();

        var otherId = game.currentTurn[game.yourTurn ? 1: 0];
        game.otherPlayer = {
          username: Meteor.users.findOne(otherId).username,
          score: game.players[otherId].score
        };

        if(game.winner){
          if (game.winner === 'tie') game.message = "It'a a tie";
          else if(game.winner === Meteor.userId()) game.message ="You Win!";
          else game.message = "You lose!";

        }
        return game;
      }
      return {};
    }
  });
});