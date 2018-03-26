const checkAuthentication = (authentication) => {
  if (!authentication) {
    return Materialize.toast('You need to be logged in to access this feature', 2000);
  }
};

export default checkAuthentication;

