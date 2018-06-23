import React from 'react';
import imagePlaceholder from '../public/images/profile-placeholder.png';

const Bio = props => (
  <div>
    <div className="row">
      <div className="profile-img-div left">
        <img src={imagePlaceholder} className="profile-img responsive-img" />
      </div>
      <div className="bio-details left collection">
      <p className="collection-item"><strong className="bold primary-text">First Name: </strong><span> {props.bio.firstName}</span></p>
        <p className="collection-item"><strong className="bold primary-text">Last Name: </strong><span> {props.bio.lastName}</span></p>
        <p className="collection-item"><strong className="bold primary-text">Email: </strong>
          <span> {props.bio.email}</span></p>
        <p className="collection-item"><strong className="bold primary-text">Member Since: </strong><span> {props.bio.createdAt.split('T')[0]}</span></p>
      </div>
    </div>
  </div>
);

export default Bio;
