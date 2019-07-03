/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';

function HomePage() {

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    </article>
  );
}

export default HomePage;
