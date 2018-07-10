import Notify from '../helpers/Notify';

/**
 * @method checkAuthentication
 * @description checks if user is authorised to perform
 * privileged actions
 *
 *
 * @returns {function} - funtion that notifies user
 */
const checkAuthentication = () =>
  Notify.notifyInfo('You need to be logged in to access this feature');

export default checkAuthentication;

