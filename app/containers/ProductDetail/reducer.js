import produce from 'immer';
import { CHANGE_LOCAL_IMAGE } from './constants';

// The initial state of the App
export const initialState = {
  files: [
    {
      img: '/alt.jpg',
      index: 0,
    },
    {
      img: '/alt.jpg',
      index: 1,
    },
    {
      img: '/alt.jpg',
      index: 2,
    },
    {
      img: '/alt.jpg',
      index: 3,
    },
    {
      img: '/alt.jpg',
      index: 4,
    },
    {
      img: '/alt-video.jpg',
      index: 5,
    },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const productDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCAL_IMAGE:
        // eslint-disable-next-line no-case-declarations
        // draft.files = draft.files.map(file =>
        //   file.index === action.index
        //     ? { img: action.image, index: action.index }
        //     : file,
        // );
        draft.files[action.index].img = action.image;
        break;
    }
  });

export default productDetailReducer;
