/**
 * Helper for controller methods
 * @class Helper
 */

export default class Helper {
  /**
   * Method returns pagination results
     * @static
     * @param {integer} offset
     * @param {integer} limit
     * @param {integer} dataCount
     * @returns {object} result
     */
  static pagination(page, offset, limit, { count, rows }) {
    const result = {};

    result.pageCount = Math.ceil(count / limit);
    result.pageSize = rows.length;
    result.currentPage = +page;
    result.bookCount = count;

    return result;
  }

  /**
   * Method sets up the pagination variables
   * @param {object} req The request object
   * @returns {object}
   */

  static setupPagination(req) {
    const setup = {};

    setup.page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    setup.limit = req.query.limit && req.query.limit > 0 ? req.query.limit : 9;
    setup.offset = setup.limit * (setup.page - 1);

    return setup;
  }
}
