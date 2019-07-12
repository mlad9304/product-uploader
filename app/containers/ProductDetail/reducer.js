import produce from 'immer';
import {
  INIT_FILES,
  GET_DROPBOX_FILES_SUCCESS,
  GET_PRODUCT_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  info: false,
  dropboxImages: false,
  dropboxVideo: false,
};

/* eslint-disable default-case, no-param-reassign */
const productDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PRODUCT_SUCCESS:
        draft.info = action.product;
        break;
      case INIT_FILES:
        draft.dropboxImages = initialState.dropboxImages;
        draft.dropboxVideo = initialState.dropboxVideo;
        break;
      case GET_DROPBOX_FILES_SUCCESS:
        // eslint-disable-next-line no-case-declarations
        const images = [];
        // eslint-disable-next-line no-case-declarations
        const video = {};
        action.dropboxFiles.forEach(file => {
          if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(file.metadata.name))
            images.push(
              Object.assign(
                {},
                {
                  id: file.metadata.content_hash,
                  link: file.link,
                  filePath: file.metadata.path_display,
                },
              ),
            );
          else
            Object.assign(video, {
              id: file.metadata.content_hash,
              link: file.link,
              filePath: file.metadata.path_display,
            });
        });
        draft.dropboxImages = images;
        draft.dropboxVideo = Object.keys(video).length > 0 ? video : false;
        break;
    }
  });

export default productDetailReducer;
