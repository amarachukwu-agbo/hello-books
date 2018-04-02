const validate = (values) => {
  const errors = {};
  if (!values.returnDate) {
    errors.returnDate = 'Input a return date';
  }
  if (values.returnDate < Date.now()) {
    errors.returnDate = 'Date must be greater than today';
  }
  if (!values.reason ) {
    errors.reason = 'Input a reason';
  }
  return errors;
};

export default validate;

