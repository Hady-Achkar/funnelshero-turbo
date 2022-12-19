import path from 'path';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express'

async function resizePicture(req: Request, res: Response, next: NextFunction) {
  try {

    if (!req.file) {
      return next();
    }

    const splittedFilename = req.file.originalname.split('.');
    const ext = splittedFilename[splittedFilename.length - 1];
    //@ts-ignore
    const fileName = `${req.user._id}.${ext}`;
    const filePath = `profile-pictures/${fileName}`

    await sharp(req.file.buffer)
      .resize(128)
      .toFile(path.join(__dirname, '..', 'public', 'profile-pictures', fileName));

    req.body.picture = filePath;

    next();
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: 'Sorry Internal Server Error!',
    })
  }
}

export {
  resizePicture,
}