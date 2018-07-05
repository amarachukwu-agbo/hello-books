import React from 'react';

/**
 * @description stateless component for loader
 * that is displayed while data is loading
 *
 * @returns {Node} - react node containing the Preloader component
 */
const Preloader = () => (
    <div className="preloader-wrapper medium active">
    <div className="spinner-layer spinner-blue-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>
);

export default Preloader;
