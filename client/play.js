Template.hand.events({
  'click .card': function (event, template) {
    if(template.data.yourTurn){
      Meteor.call('takeTurn', template.data._id, Meteor.userId(), this);
    }
  }
});