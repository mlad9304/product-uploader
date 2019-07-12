import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectProducts } from '../App/selectors';
import { postUserInfo } from './actions';
import saga from './saga';

const key = 'userInfo';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
  },
}));

function UserInfo({ products, onPostUserInfo, onPrev }) {
  useInjectSaga({ key, saga });
  const classes = useStyles();
  const [state, setState] = useState({
    name: '',
    address: '',
    email: '',
    other1: '',
    other2: '',
    other3: '',
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();

    // eslint-disable-next-line no-empty
    if (products) {
      // eslint-disable-next-line no-empty
    } else {
    }

    onPostUserInfo(state);
  };

  return (
    <div>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Your name"
          style={{ margin: 8 }}
          className={classes.textField}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('name')}
        />
        <TextField
          label="Your Address"
          style={{ margin: 8 }}
          className={classes.textField}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('address')}
        />
        <TextField
          label="Your Email"
          style={{ margin: 8 }}
          className={classes.textField}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('email')}
        />
        <TextField
          label="Other 1"
          style={{ margin: 8 }}
          className={classes.textField}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('other1')}
        />
        <TextField
          label="Other 2"
          style={{ margin: 8 }}
          className={classes.textField}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('other2')}
        />
        <TextField
          label="Other 3"
          style={{ margin: 8 }}
          className={classes.textField}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('other3')}
        />
        <Grid container justify="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Send
          </Button>
        </Grid>
      </form>
      <div style={{ width: '100%' }}>
        <Box display="flex" xs={12} my={3}>
          <Box flexGrow={1}>
            <Fab
              variant="extended"
              aria-label="Delete"
              className={classes.fab}
              onClick={onPrev}
            >
              Go to products
            </Fab>
          </Box>
        </Box>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  products: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onPostUserInfo: PropTypes.func,
  onPrev: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPostUserInfo: userInfo => dispatch(postUserInfo(userInfo)),
    onPrev: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserInfo);
