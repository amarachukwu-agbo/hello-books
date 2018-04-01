import React from 'react';

const Bio = props => (
  <div>
    <div className="row">
      <div className="col s12 m6 l6">
        <p className="bold"><i className="material-icons prefix teal-text">account_circle</i><span className="bold blue-text">First Name:</span>
          <span> {props.bio.firstName}</span></p>
      </div>
      <div className="col s12 m6 l6">
        <p><span className="bold blue-text">LastName: </span><span> {props.bio.lastName}</span></p>
      </div>
    </div>
    <div className="row">
      <div className="col s12 m6 l6">
        <p className="bold"><i className="material-icons prefix teal-text">email</i><span className="bold blue-text">Email: </span>
          <span> {props.bio.email}</span></p>
      </div>
      <div className="col s12 m6 l6">
        <p><span className="bold blue-text">Member Since: </span><span> {props.bio.createdAt.split('T')[0]}</span></p>
      </div>
    </div>
  </div>
);

export default Bio;
