const validate = (values) => {
  const errors = {};
  if (!values.returnDate) {
    errors.returnDate = 'Input a return date';
  }
  if (new Date(values.returnDate) - (Date.now()) < 0) {
    errors.returnDate = 'Date must be greater than today';
  }
  if (!values.reason) {
    errors.reason = 'Input a reason';
  }
  return errors;
};

export default validate;

