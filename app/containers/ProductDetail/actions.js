import { CHANGE_LOCAL_IMAGE, INIT_FILES } from './constants';

export function changeLocalImage(image, index) {
  return {
    type: CHANGE_LOCAL_IMAGE,
    image,
    index,
  };
}

export function initFiles() {
  return {
    type: INIT_FILES,
  };
}
