import React, { Component } from 'react';
import Preloader from './Preloader';
import BorrowedBooks from './BorrowedBooks';
import BorrowRequests from './BorrowRequests';
import ReturnRequests from './ReturnRequests';
import Bio from './Bio';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    const { getUserProfile, user } = this.props;
    getUserProfile(user.id);
  }

  renderProfile() {
    const { isFetchingProfile, profileError, profile } = this.props;
    if (isFetchingProfile) {
      return <div className="row center wrapper"><Preloader /></div>;
    }
    if (profileError) {
      return <div className="row center wrapper">{ this.props.profileError }</div>;
    }
    if (profile) {
      const returnRequests = profile.userReturnRequests.filter(request => request.status.toLowerCase() !== 'accepted');
      const borrowRequests = profile.userBorrowRequests.filter(request => request.status.toLowerCase() !== 'accepted');

      return (
            <div className="row" >
              <div className="row card-panel">
                  <Bio bio= { profile } />
              </div>

              <div className="row card-panel profile-div">
                  <h6 className="white-text">Borrowed Books</h6>
                  <BorrowedBooks books= { profile.userBooks }
                  returnRequests = { returnRequests } {...this.props }/>
              </div>

              <div className="row card-panel profile-div">
                  <h6 className="white-text">Borrow Requests</h6>
                  <BorrowRequests books= { borrowRequests } />
              </div>

              <div className="row card-panel profile-div">
                  <h6 className="white-text">Return Requests</h6>
                  <ReturnRequests books= { returnRequests } { ...this.props }/>
              </div>
            </div>
      );
    }
  }

  render() {
    return (
        <div className="container">
            <div className="row center"> <h4 className="book-header">Your Profile</h4></div>
            <div className="row">
                { this.renderProfile() }
            </div>
        </div>
    );
  }
}

export default Profile;
