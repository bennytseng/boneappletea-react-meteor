import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;

const getUserData = () => ({
  username: getInputValue(component.refs.username),
  email: getInputValue(component.refs.emailAddress),
  password: getInputValue(component.refs.password),
  profile: {
    name: {
      user: getInputValue(component.refs.username),
      first: getInputValue(component.refs.firstName),
      last: getInputValue(component.refs.lastName),
    },
  },
});

const signUp = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.signup).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      username: {
        required: true,
        minlength: 6,
        maxlength: 10,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      firstName: {
        required: "What's your first name?",
      },
      lastName: {
        required: "What's your last name?",
      },
      username: {
        required: "Create a cool username for yourself!",
      },
      emailAddress: {
        required: 'Need an email address here, better not be fake.',
        email: 'Is this email legit?',
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.',
      },
    },
    errorPlacement( error, element ) {
      if ( element.attr( 'name' ) === 'username' ) {
        error.insertAfter( '.input-group.username' );
      }
    },
    submitHandler() { signUp(); },
  });
};

export const handleSignup = (options) => {
  component = options.component;
  validate();
};
