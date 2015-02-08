Games = new Mongo.Collection("games");


/*

game = {
  currentTurn: [],
  deck: [],
  table: [],
  players:{
    a:{
      hand :[],
      pile :[],
      score :{}
    },
    b: {}
  }
  inProgress: true/false,
  started: date,
  finished: date,
  winner: id
}

*/

if (Meteor.isServer){
  Meteor.publish("games", function(){
    return Games.find({currentTurn: this.userId});
  });

  Meteor.publish("users", function(){
    return Meteor.users.find();
  });
}

if (Meteor.isClient){
  Meteor.subscribe("games");
  Meteor.subscribe("users");
}


Meteor.methods({
  createGame: function(otherPlayerId){
    var game = GameFactory.createGame([Meteor.userId(), otherPlayerId]);
    Games.insert(game);
    console.log("Game has been created.!");
  }
});