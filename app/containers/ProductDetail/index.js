import React, { memo, useEffect } from 'react';
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
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { Player } from 'video-react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectLoading, makeSelectError } from '../App/selectors';
import {
  makeSelectProductDetailInfo,
  makeSelectDropboxImages,
  makeSelectDropboxVideo,
} from './selectors';
import { initFiles, getDropboxFiles, uploadFile, getProduct } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'productDetail';

const useStyles = makeStyles(theme => ({
  media: {
    height: 300,
  },
  fab: {},
  btnIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

function ProductDetail({
  info,
  width,
  match,
  dropboxImages,
  dropboxVideo,
  onGetProduct,
  onUploadFile,
  onInitFiles,
  onGetDropboxFiles,
  onPrev,
  onNext,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { productId } = match.params;

  useEffect(() => {
    onGetProduct(productId);
    onInitFiles();
    onGetDropboxFiles(productId);
  }, []);

  const classes = useStyles();
  // eslint-disable-next-line no-nested-ternary
  const columns = width === 'xs' || width === 'sm' ? 1 : width === 'md' ? 2 : 3;

  const handleCapture = event => {
    const file = event.target.files[0];
    onUploadFile(file, productId);
  };

  const dropboxImagesLength = dropboxImages ? 5 - dropboxImages.length : 5;
  const emptyImages = [];
  for (let i = 0; i < dropboxImagesLength; i += 1) {
    emptyImages.push(
      <GridListTile key={i}>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image="/alt.jpg" />
          <CardActions>
            <input
              accept="image/*"
              type="file"
              onChange={handleCapture}
              className={classes.input}
              id={`button-empty-image-${i}`}
            />
            <label htmlFor={`button-empty-image-${i}`}>
              <Fab
                color="primary"
                aria-label="Add"
                className={classes.fab}
                component="span"
                size="small"
              >
                <AddIcon />
              </Fab>
            </label>
          </CardActions>
        </Card>
      </GridListTile>,
    );
  }

  return (
    <div>
      <GridList
        cellHeight={360}
        className={classes.gridList}
        cols={columns}
        spacing={10}
      >
        <GridListTile key="Subheader" style={{ height: 'auto' }} cols={columns}>
          <ListSubheader component="div">
            {info && info.productName}
          </ListSubheader>
        </GridListTile>
        {dropboxImages &&
          dropboxImages.map(image => (
            <GridListTile key={image.id}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={image.link} />
                <CardActions>
                  <input
                    accept="image/*"
                    className={classes.input}
                    type="file"
                    id={`button-file-${image.id}`}
                    onChange={handleCapture}
                  />
                  <label htmlFor={`button-file-${image.id}`}>
                    <Fab
                      color="primary"
                      aria-label="Add"
                      className={classes.fab}
                      component="span"
                      size="small"
                    >
                      <AddIcon />
                    </Fab>
                  </label>
                  <Fab
                    color="secondary"
                    aria-label="Delete"
                    className={classes.fab}
                    component="span"
                    size="small"
                  >
                    <DeleteIcon />
                  </Fab>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
        {emptyImages}
        {dropboxVideo && (
          <GridListTile>
            <Card className={classes.card}>
              <Player
                playsInline
                poster="/alt-video.jpg"
                src={dropboxVideo.link}
                fluid={false}
                width="100%"
                height={300}
              />
              <CardActions>
                <input
                  accept="video/*"
                  type="file"
                  onChange={handleCapture}
                  className={classes.input}
                  id={`button-file-${dropboxVideo.id}`}
                />
                <label htmlFor={`button-file-${dropboxVideo.id}`}>
                  <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    component="span"
                    size="small"
                  >
                    <AddIcon />
                  </Fab>
                </label>
                <Fab
                  color="secondary"
                  aria-label="Delete"
                  className={classes.fab}
                  component="span"
                  size="small"
                >
                  <DeleteIcon />
                </Fab>
              </CardActions>
            </Card>
          </GridListTile>
        )}
        {!dropboxVideo && (
          <GridListTile>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image="/alt-video.jpg" />
              <CardActions>
                <input
                  accept="video/*"
                  type="file"
                  onChange={handleCapture}
                  id="button-empty-video"
                  className={classes.input}
                />
                <label htmlFor="button-empty-video">
                  <Fab
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    component="span"
                    size="small"
                  >
                    <AddIcon />
                  </Fab>
                </label>
              </CardActions>
            </Card>
          </GridListTile>
        )}
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
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dropboxImages: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  dropboxVideo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  width: PropTypes.string,
  match: PropTypes.object,
  onGetProduct: PropTypes.func,
  onUploadFile: PropTypes.func,
  onInitFiles: PropTypes.func,
  onGetDropboxFiles: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  info: makeSelectProductDetailInfo(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  dropboxImages: makeSelectDropboxImages(),
  dropboxVideo: makeSelectDropboxVideo(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetProduct: productId => dispatch(getProduct(productId)),
    onUploadFile: (file, productId) => dispatch(uploadFile(file, productId)),
    onInitFiles: () => dispatch(initFiles()),
    onGetDropboxFiles: productId => dispatch(getDropboxFiles(productId)),
    onPrev: () => dispatch(push('/')),
    onNext: () => dispatch(push('/userinfo')),
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
