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
    console.log(this.props);
    const { isFetchingProfile, profileError, profile } = this.props;
    if (isFetchingProfile) {
      return <div className="row center book-image"><Preloader /></div>;
    }
    if (profileError) {
      return <div className="row center book-image"> { this.props.profileError }</div>;
    }
    if (profile) {
      const returnRequests = profile.user.userReturnRequests.filter(request => request.status.toLowerCase() !== 'accepted');
      const borrowRequests = profile.user.userBorrowRequests.filter(request => request.status.toLowerCase() !== 'accepted');

      return (
            <div className="row" >
              <div className="row card-panel">
                  <h5 className="row grey flow-text">Bio</h5>
                  <Bio bio= { profile.user } />
              </div>

              <div className="row card-panel">
                  <h5 className="row grey flow-text">Borrowed Books</h5>
                  <BorrowedBooks books= { profile.user.userBooks } />
              </div>

              <div className="row card-panel">
                  <h5 className="row grey flow-text">Borrow Requests</h5>
                  <BorrowRequests books= { borrowRequests } />
              </div>

              <div className="row card-panel">
                  <h5 className="row grey flow-text">Return Requests</h5>
                  <ReturnRequests books= { returnRequests }/>
              </div>
            </div>
      );
    }
  }

  render() {
    return (
        <div className="container">
            <div className="row center"> <h4 className="book-header"> Your Profile </h4></div>
            <div className="row">
                { this.renderProfile() }
            </div>
        </div>
    );
  }
}

export default Profile;
