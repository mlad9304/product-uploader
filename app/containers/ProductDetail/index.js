import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import { push } from 'connected-react-router';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import tileData from './tileData';

import { makeSelectSelectedProductId } from '../HomePage/selectors';
import { makeSelectLoading, makeSelectError } from '../App/selectors';

const useStyles = makeStyles(theme => ({
  media: {
    height: 300,
  },
  fab: {
    margin: theme.spacing(1),
  },
  btnIcon: {
    marginRight: theme.spacing(1),
  },
}));

function ProductDetail({ width, onPrev, onNext }) {
  const classes = useStyles();
  // eslint-disable-next-line no-nested-ternary
  const columns = width === 'xs' || width === 'sm' ? 1 : width === 'md' ? 2 : 3;

  return (
    <div>
      <GridList
        cellHeight={360}
        className={classes.gridList}
        cols={columns}
        spacing={10}
      >
        <GridListTile key="Subheader" style={{ height: 'auto' }} cols={columns}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map(tile => (
          <GridListTile>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={tile.img}
                  title={tile.title}
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Upload
                </Button>
                <Button size="small" color="primary">
                  Capture
                </Button>
              </CardActions>
            </Card>
          </GridListTile>
        ))}
      </GridList>
      <div style={{ width: '100%' }}>
        <Box display="flex" xs={12} my={3}>
          <Box flexGrow={1}>
            <Fab
              variant="extended"
              aria-label="Delete"
              className={classes.fab}
              onClick={onPrev}
            >
              Prev
            </Fab>
          </Box>
          <Box>
            <Fab
              variant="extended"
              aria-label="Delete"
              className={classes.fab}
              onClick={onNext}
            >
              Next
            </Fab>
          </Box>
        </Box>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  width: PropTypes.string,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedProductId: makeSelectSelectedProductId(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onPrev: () => dispatch(push('/')),
    onNext: () => dispatch(push('/form')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withWidth(),
)(ProductDetail);
