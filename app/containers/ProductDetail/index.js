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
import TextField from '@material-ui/core/TextField';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectProducts,
} from '../App/selectors';
import {
  makeSelectProductDetailInfo,
  makeSelectDropboxImages,
  makeSelectDropboxVideo,
} from './selectors';
import {
  initFiles,
  getDropboxFiles,
  uploadFile,
  getProduct,
  deleteFile,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'productDetail';

const useStyles = makeStyles(theme => ({
  media: {
    height: 300,
  },
  header: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  fab: {
    marginRight: theme.spacing(1),
  },
  btnIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

function ProductDetail({
  info,
  width,
  match,
  dropboxImages,
  dropboxVideo,
  products,
  onGetProduct,
  onUploadFile,
  onInitFiles,
  onGetDropboxFiles,
  onDeleteFile,
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
        cellHeight={460}
        className={classes.gridList}
        cols={columns}
        spacing={10}
      >
        <GridListTile key="Subheader" style={{ height: 'auto' }} cols={columns}>
          <ListSubheader component="div" className={classes.header}>
            {info && info.productName}
          </ListSubheader>
          <Box display="flex" xs={12}>
            <Box flexGrow={1}>
              <TextField
                label="Product Description"
                margin="dense"
                variant="outlined"
                multiline
                rowsMax="4"
                fullWidth
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Save
              </Button>
            </Box>
          </Box>
        </GridListTile>
        {dropboxImages &&
          dropboxImages.map(image => (
            <GridListTile key={image.id}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={image.link} />
                <CardActions>
                  <Grid item xs={12}>
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
                      onClick={() => onDeleteFile(image.filePath, productId)}
                    >
                      <DeleteIcon />
                    </Fab>
                  </Grid>
                </CardActions>
                <Box display="flex" xs={12}>
                  <Box flexGrow={1}>
                    <TextField
                      label="Image Description"
                      margin="dense"
                      variant="outlined"
                      multiline
                      rowsMax="2"
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
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
                  onClick={() => onDeleteFile(dropboxVideo.filePath, productId)}
                >
                  <DeleteIcon />
                </Fab>
              </CardActions>
              <Box display="flex" xs={12}>
                <Box flexGrow={1}>
                  <TextField
                    label="Video Description"
                    margin="dense"
                    variant="outlined"
                    multiline
                    rowsMax="2"
                    fullWidth
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
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
              color="primary"
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
              color="primary"
              variant="extended"
              aria-label="Delete"
              className={classes.fab}
              onClick={() => onNext(products, productId)}
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
  products: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  onGetProduct: PropTypes.func,
  onUploadFile: PropTypes.func,
  onInitFiles: PropTypes.func,
  onGetDropboxFiles: PropTypes.func,
  onDeleteFile: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  info: makeSelectProductDetailInfo(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  dropboxImages: makeSelectDropboxImages(),
  dropboxVideo: makeSelectDropboxVideo(),
  products: makeSelectProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetProduct: productId => dispatch(getProduct(productId)),
    onUploadFile: (file, productId) => dispatch(uploadFile(file, productId)),
    onInitFiles: () => dispatch(initFiles()),
    onGetDropboxFiles: productId => dispatch(getDropboxFiles(productId)),
    onDeleteFile: (filePath, productId) =>
      dispatch(deleteFile(filePath, productId)),
    onPrev: () => dispatch(push('/')),
    onNext: (products, productId) => {
      if (products && products.length > 1) {
        const currentIndex = products
          // eslint-disable-next-line no-underscore-dangle
          .map(product => product._id)
          .indexOf(productId);
        if (currentIndex === products.length - 1) {
          dispatch(push('/userinfo'));
        } else {
          const nextProduct = products[currentIndex + 1];
          const { _id: nextProductId } = nextProduct;
          dispatch(push(`/products/${nextProductId}`));
          dispatch(initFiles());
          dispatch(getProduct(nextProductId));
          dispatch(getDropboxFiles(nextProductId));
        }
      } else {
        dispatch(push('/userinfo'));
      }
    },
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
