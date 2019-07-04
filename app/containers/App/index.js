/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
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

      <Container>
        <Box mt={5}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Box>
      </Container>


    </React.Fragment>
  );
}
