import { Response, NextFunction } from 'express';
import { IReqUplodFile } from '../interfaces/IUploadFile';
import storage from '../services/cloudStorage';

export const uploadAvatar = (
  req: IReqUplodFile,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
      success: false,
    });
  }

  const bucket = storage.bucket(`gs://${process.env.BUCKET_NAME}`);

  const blob = bucket.file(
    `users/${req.currentUser._id}/avatar/${req.file.originalname}`,
  );

  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (error) => {
    next(error);

    return res.status(400).json({
      message: error.message,
      success: false,
    });
  });

  blobStream.on('finish', () => {
    req.file.url = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${blob.name}`;
    next();
  });
};
