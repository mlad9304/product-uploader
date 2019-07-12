/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

import HomePage from 'containers/HomePage/Loadable';
import ProductDetail from 'containers/ProductDetail/Loadable';
import UserInfo from 'containers/UserInfo/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { makeSelectLoading } from './selectors';

function App({ loading }) {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s - Product Uploader"
        defaultTitle="Product Uploader"
      >
        <meta
          name="description"
          content="A product uploader application with desktop and mobile"
        />
      </Helmet>
      <CssBaseline />
      {loading && <LinearProgress />}
      <Container>
        <Box mt={5}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/products/:productId" component={ProductDetail} />
            <Route path="/userinfo" component={UserInfo} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Box>
      </Container>
    </React.Fragment>
  );
}

App.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  memo,
)(App);
