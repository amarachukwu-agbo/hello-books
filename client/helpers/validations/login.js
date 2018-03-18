const validate = (values) => {
  const errors = {};
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Input your email';
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Input your password';
  }
  return errors;
};

export default validate;
