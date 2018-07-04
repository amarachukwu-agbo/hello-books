import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Navbar';
import PageFooter from '../PageFooter';
import AddBookPage from './AddBookPage.jsx';
import AdminBooksPage from './AdminBooksPage.jsx';
import AdminBorrowRequestsPage from './AdminBorrowRequestsPage.jsx';
import AdminReturnRequestsPage from './AdminReturnRequestsPage.jsx';

/**
 * @description stateless component for handling all admin routes
 *
 * @param {object} match - prop to match routes to current location
 *
 * @returns {Node} - react node containing the Admin component
 */
const Admin = ({ match }) => (
  <div>
    <Navbar />
    <div className="parallax-container z-depth-1 dashboard">
      <div className="center-align">
        <br />
        <h4 className="black-text text-darken-4 bold">Admin Dashboard</h4>
        <ToastContainer />
      </div>
    </div>
    <br />
    <Switch>
      <Route exact path={`${match.url}`} component={ AdminBooksPage } />
      <Route exact path={`${match.url}/addBook`} component={ AddBookPage } />
      <Route exact path={`${match.url}/borrowRequests`}
        component={ AdminBorrowRequestsPage }/>
      <Route exact path={`${match.url}/returnRequests`}
        component={ AdminReturnRequestsPage}/>
    </Switch>
    <br />
    <PageFooter />
  </div>
);

export default Admin;

