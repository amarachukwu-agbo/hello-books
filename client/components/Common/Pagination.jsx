import React from 'react';
import propTypes from 'prop-types';

/**
 * @description common pagination component for components
 * that dispaly large data
 *
 * @param {object} pagination - pagination object
 * @param {boolean} floatingButton - determines if pagination is done
 * using only floating buttons or with buttons and numbers displaying pages
 * @param {function} onPageChange - function to be executed
 * when current page changes
 *
 * @returns {Node} - react node containing the pagination component
 */

const Pagination = ({ pagination, onPageChange, floatingButton }) => {
  const {
    currentPage,
    dataCount,
    pageCount,
  } = pagination;
  const allowPrevious = currentPage !== 1;
  const allowNext = currentPage !== pageCount;
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // Render for pagination using only floating button
  if (floatingButton) {
    return (
      <div className="row books-list">
        {
          allowPrevious &&
          <button className="btn-flat btn-small
            waves-effect waves-light white red-text left"
            onClick = {() => onPageChange(previousPage)}
          >
            <i className="fa fa-angle-double-left next-icon" />
          </button>
        }
        {
          allowNext &&
          <button className="btn-flat btn-small
            waves-effect waves-light white red-text right"
            onClick = {() => onPageChange(nextPage)}
          >
            <i className="fa fa-angle-double-right next-icon" />
          </button>
        }
      </div>
    );
  }

  // Render for pagination requiring buttons and page numbers
  return (
    <div className="pagination">
      <div className="pagination-item">
      <span>{ dataCount } Results</span>
        Displaying Page
        <span> { currentPage } </span> of
        <span> { pageCount } </span>
      </div>
      {
        allowPrevious &&
        <div className="pagination-item">
          <button className= "primary-button" onClick = { () =>
            onPageChange(previousPage)}> Previous
          </button></div>
      }
      {
        allowNext &&
        <div className="pagination-item">
          <button className= "primary-button" onClick = { () =>
            onPageChange(nextPage) }> Next
          </button></div>
      }
    </div>
  );
};

// Prop type validation
Pagination.propTypes = {
  onPageChange: propTypes.func.isRequired,
  pagination: propTypes.shape({
    currentPage: propTypes.number.isRequired,
    dataCount: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    pageCount: propTypes.number.isRequired,
  }),
};

export default Pagination;
