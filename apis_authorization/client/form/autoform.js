import { AutoForm } from 'meteor/aldeed:autoform';

AutoForm.hooks({
  authorizedUserForm: {
    onSubmit (emailDocument) {
      // Get email address from form submission
      const email = emailDocument.emailAddress;

      // Get reference to form, for use in method callback(s)
      const form = this;

      // Check if the email address is linked to a registered user
      Meteor.call('checkIfEmailIsRegistered', email, function (error, emailIsRegistered) {
        if (emailIsRegistered) {
          console.log('email is registered')
          // Continue with form submission
          form.done();
        } else {
          // throw an error
          form.done(new Error('email-not-registered'));
        }
      });
    },
    onSuccess () {
      console.log('success');
    },
    onError (error) {
      // do something with the error
    }
  },
});
