const validate = (values) => {
  const errors = {};
  if (!values.firstName || values.firstName.trim() === '') {
    errors.firstName = 'First Name is required';
  }
  if (!values.lastName || values.lastName.trim() === '') {
    errors.lastName = 'Last Name is required';
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email is required';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Password is required';
  }
  if (values.password && values.password.trim() !== ''
    && values.password.length < 7) {
    errors.password = 'Password must not be less than 6 characters';
  }
  if (values.password && values.password.trim() !== ''
    && values.password.length >= 7
        && !new RegExp('^(?=.*[a-z])(?=.*[0-9])').test(values.password)) {
    errors.password = 'Password must contain at least a letter and a number';
  }
  if (!values.password2 || values.password2.trim() === '') {
    errors.password2 = 'Confirm Password is required';
  }
  if (values.password2 && values.password2.trim() !== ''
        && values.password && values.password !== ''
        && values.password !== values.password2) {
    errors.password2 = "Passwords don't match";
  }
  return errors;
};

export default validate;
