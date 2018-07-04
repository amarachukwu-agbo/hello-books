import React from 'react';
import propTypes from 'prop-types';
import imagePlaceholder from '../../public/images/profile-placeholder.png';

/**
 * @description stateless component for rendering user's bio
 *
 * @param {object} props - properties of the component
 *
 * @returns {Node} - react node containing the Bio component
 */
const Bio = ({ bio }) => (
  <div>
    <div className="row">
      <div className="profile-img-div left">
        <img src={imagePlaceholder} className="profile-img responsive-img" />
      </div>
      <div className="bio-details left collection">
      <p className="collection-item">
        <strong className="bold primary-text">
          First Name: </strong>
        <span> {bio.firstName}</span>
      </p>
        <p className="collection-item">
          <strong className="bold primary-text">
            Last Name:
          </strong><span> {bio.lastName}</span>
        </p>
        <p className="collection-item">
          <strong className="bold primary-text">
            Email:
          </strong>
          <span> {bio.email}</span>
        </p>
        <p className="collection-item">
          <strong className="bold primary-text">
            Member Since:
          </strong>
          <span> {bio.createdAt.split('T')[0]}</span>
        </p>
      </div>
    </div>
  </div>
);

// Prop types validation
Bio.propTypes = {
  bio: propTypes.shape({
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
  }),
};

export default Bio;
