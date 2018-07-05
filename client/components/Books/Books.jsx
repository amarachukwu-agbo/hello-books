import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import PageFooter from '../PageFooter';
import BooksPage from './BooksPage.jsx';
import BooksDetailsPage from './BookDetailsPage.jsx';
import NotFound from '../Common/NotFound.jsx';

/**
 * @description stateless component for books route
 *
 * @param {object} match - prop to match routes to current location
 *
 * @returns {Node}
 */
const Books = ({ match }) => (
      <div>
        <Navbar />
        <Switch>
          <Route exact path={`${match.url}/:bookId`}
            component={BooksDetailsPage} />
          <Route exact path={`${match.url}`}
            component={BooksPage} />
          <Route component={NotFound} />
        </Switch>
        <PageFooter />
      </div>
);

export default Books;

