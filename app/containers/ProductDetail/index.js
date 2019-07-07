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

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectLoading, makeSelectError } from '../App/selectors';
import { makeSelectFiles, makeSelectProductDetailInfo } from './selectors';
import { uploadFile, getProduct } from '../App/actions';
import { changeLocalImage, initFiles } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'productDetail';

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
  input: {
    display: 'none',
  },
}));

function ProductDetail({
  info,
  files,
  width,
  match,
  onGetProduct,
  onUploadFile,
  onChangeLocalImage,
  onInitFiles,
  onPrev,
  onNext,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { productId } = match.params;

  useEffect(() => {
    onGetProduct(productId);
    onInitFiles();
  }, []);

  const classes = useStyles();
  // eslint-disable-next-line no-nested-ternary
  const columns = width === 'xs' || width === 'sm' ? 1 : width === 'md' ? 2 : 3;

  const handleCapture = index => event => {
    const fileReader = new FileReader();

    const file = event.target.files[0];
    onUploadFile(file, productId);

    fileReader.readAsDataURL(file);
    fileReader.onload = e => {
      onChangeLocalImage(e.target.result, index);
    };
  };

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
        {files.map(file => (
          <GridListTile key={file.index}>
            <Card className={classes.card}>
              {file.index < 5 && (
                <CardMedia className={classes.media} image={file.img} />
              )}
              {file.index === 5 && (
                <Player
                  playsInline
                  poster="/alt-video.jpg"
                  src={file.img}
                  fluid={false}
                  width="100%"
                  height={300}
                />
              )}
              <CardActions>
                <input
                  accept={file.index < 5 ? 'image/*' : 'video/*'}
                  id={`icon-button-photo-${file.index}`}
                  onChange={handleCapture(file.index)}
                  type="file"
                />
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
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  files: PropTypes.array,
  width: PropTypes.string,
  match: PropTypes.object,
  onGetProduct: PropTypes.func,
  onUploadFile: PropTypes.func,
  onChangeLocalImage: PropTypes.func,
  onInitFiles: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  info: makeSelectProductDetailInfo(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  files: makeSelectFiles(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetProduct: productId => dispatch(getProduct(productId)),
    onUploadFile: (file, productId) => dispatch(uploadFile(file, productId)),
    onChangeLocalImage: (image, index) =>
      dispatch(changeLocalImage(image, index)),
    onInitFiles: () => dispatch(initFiles()),
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
