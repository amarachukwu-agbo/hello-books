import swal from 'sweetalert';

/**
 * @description class notifies users using alerts
 *
 * @class Notify
 */
class Notify {
  /**
   * @function notifyError
   * @memberof Notify
   * @static
   * @param {string} error
   *
   * @returns {void}
   */
  static notifyError(error) {
    swal('', error, 'error');
  }

  /**
   * @function notifyInfo
   * @memberof Notify
   * @static
   * @param {string} info
   *
   * @returns {void}
   */
  static notifyInfo(info) {
    swal('', info, 'info');
  }

  /**
   * @function notifySuccess
   * @memberof Notify
   * @static
   * @param {string} message
   *
   * @returns {void}
   */
  static notifySuccess(message) {
    swal('', message, 'success');
  }
}

export default Notify;
