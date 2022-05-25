import * as yup from 'yup';
import { includes } from 'lodash';
const SUPPORTED_FORMATS_IMAGE = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
];
const SUPPORTED_FORMATS_VIDEO = [
  'video/mp4',
  'video/move',
  'video/avi',
  'video/flv',
  'video/aaf',
  'video/mkv',
  'video/wmv',
  'video/mpeg',
];

export const imageValidation = () => {
  return yup
    .mixed()
    .test(
      'fileSize',
      '10 mo maximum. Le fichier est trop volumineux.',
      value => {
        if (!value.length) return true; // attachment is optional
        return value[0].size <= 10000000;
      },
    )
    .test(
      'fileType',
      'Le fichier doit être au format jpg, jpeg ou png.',
      value => {
        if (!value.length) return true; // attachment is optional
        return includes(SUPPORTED_FORMATS_IMAGE, value[0]?.type);
      },
    );
};

export const videoValidation = () => {
  return yup
    .mixed()
    .test(
      'fileSize',
      '800 mo maximum. Le fichier est trop volumineux.',
      value => {
        if (!value.length) return true; // attachment is optional
        return value[0].size <= 800000000;
      },
    )
    .test(
      'fileType',
      'Le fichier doit être au format mp4, move, avi, flv, aaf, mkv, wmv ou mpeg',
      value => {
        if (!value.length) return true; // attachment is optional
        return includes(SUPPORTED_FORMATS_VIDEO, value[0]?.type);
      },
    );
};
