Template.signup.events({
  'click button': function (event, template) {
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#su-username").value,
      password: template.find("#su-password").value,
      email: template.find("#su-email").value
    });
  }
});

Template.login.events({
  'click button': function (event, template) {

    event.preventDefault();
    Meteor.loginWithPassword(
      template.find("#li-username").value,
      template.find("#li-password").value
    );
  }
});

Template.logout.events({
  'click button': function (event, template){
    event.preventDefault();
    Meteor.logout();
  }
});