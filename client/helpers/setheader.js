import axios from 'axios';

/**
 * @method setHeader
 * @description sets authorization header with user's token
 * @param {object} response The HTTP response
 *
 * @returns {void}
 */
const setHeader = () => {
  axios.defaults.headers.common.Authorization =
   `Bearer ${localStorage.getItem('userToken')}`;
};

export default setHeader;
