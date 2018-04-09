const materialize = () => {
  $(document).ready(() => {
    Materialize.updateTextFields();
    $('.parallax').parallax();
    $('.button-collapse').sideNav();
  });
};

export default materialize;

