const validate = (values) => {
  const errors = {};
  if (!values.title || values.title.trim() === '') {
    errors.title = 'Book title is required';
  }
  if (!values.author || values.author.trim() === '') {
    errors.author = 'Book author is required';
  }
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Book description is required';
  }
  if (!values.subject) {
    errors.subject = 'Book subject is required';
  }
  if (!values.imageURL) {
    errors.imageURL = 'ImageURL is required';
  }
  if (!values.quantity) {
    errors.quantity = 'quantity is required';
  }
  if (values.quantity && values.quantity <= 0) {
    errors.quantity = 'quantity must be greater than 0';
  }
  return errors;
};

export default validate;

