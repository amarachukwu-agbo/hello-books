import React from 'react';
import lensImage from '../../public/images/lens.jpg';
/**
 * @description stateless component that renders when a page is not found
 *
 * @param {object} prop to match routes to current location
 *
 * @returns {Node} react node containing NotFound component
 */
const NotFound = () => (
  <div>
    <div className="center wrapper">
      <div className="not-found-wrapper card-panel z-depth-3">
        <img src={lensImage} className="not-found-image" />
        <h4 className="not-found center primary-text">
          404
    </h4>
        <p className="center">Oops! Page was not found </p>
        <p className="center primary-text">
          We are sorry the page you requested could not be found.
          Go back to <a href={'/'}>homepage ? </a>
        </p>
      </div>
    </div>
  </div>
);
export default NotFound;
