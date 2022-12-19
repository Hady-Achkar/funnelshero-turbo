import express from 'express'
import {EditUser} from '../controllers'
import {authenticateUser} from '../middlewares'
import multer from 'multer';
import { resizePicture } from '../middlewares/resizePicture';
import * as validate from '../middlewares/validate';
import { userEditSchema } from '../validators/editUser';

const allowedFileFormats = ['image/png', 'image/jpg', 'image/jpeg'];

const uploadPicture = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (allowedFileFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);

      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

const router = express()

router.route('/me').put(authenticateUser, uploadPicture.single('picture'), resizePicture, validate.schema(userEditSchema),  EditUser)
export default router