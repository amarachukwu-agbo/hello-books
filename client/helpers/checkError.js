/**
 * @method checkError
 * @description checks error to know whether it is a newtork
 * error or error from the server
 *
 * @param {error} object - error object
 *
 * @returns {errorMessage}
 */

const checkError = (error) => {
  const errorMessage = error.response === undefined ?
    error.message : error.response.data.error;
  return errorMessage;
};

export default checkError;

