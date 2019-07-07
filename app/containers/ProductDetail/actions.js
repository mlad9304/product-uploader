import { CHANGE_LOCAL_IMAGE } from './constants';

export function changeLocalImage(image, index) {
  return {
    type: CHANGE_LOCAL_IMAGE,
    image,
    index,
  };
}
