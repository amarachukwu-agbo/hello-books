/**
 * @method sets user\'s info in localStorage
 * @param {object} response The HTTP response
 */
const setUser = (response) => {
  const userInfo = JSON.stringify(response.data.user);
  localStorage.setItem('userToken', response.data.token);
  localStorage.setItem('user', userInfo);
};

export default setUser;
