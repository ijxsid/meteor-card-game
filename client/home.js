function otherId(game){
  return game.currentTurn[game.currentTurn[0] == Meteor.userId() ? 1 : 0];
}

Template.gameList.helpers({
  completedGames: function(){
    return Games.find({inProgress: false}).map(function(game){
      game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
      game.finished = moment(game.finished).fromNow();
      if(game.winner){
        if (game.winner === 'tie') game.message = "Tied";
        else if(game.winner === Meteor.userId()) game.message ="Won";
        else game.message = "Lost";
      }
      return game;
    });
  },

  games: function () {
    return Games.find({inProgress: true}).map(function(game){
      game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
      game.started = moment(game.started).fromNow();
      return game;
    });
  }
});

Template.userList.helpers({
  users: function () {
    var myid = Meteor.userId(),
        cantPlayAgainst = [myid];

    Games.find({inProgress: true}).forEach(function (game) {
      cantPlayAgainst.push(game.currentTurn[game.currentTurn[0]===myid ? 1 :0]);
    });
    return Meteor.users.find({_id : {$not: { $in:cantPlayAgainst }}});
  }
});

Template.userItem.events({
  'click button': function (event, template) {
    Meteor.call('createGame', template.data._id);
    // template.data refers to whatever data that was used to create this template.
  }
});