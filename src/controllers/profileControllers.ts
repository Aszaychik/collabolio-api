import { Response } from 'express';
import { IReqUplodFile } from '../interfaces/IUploadFile';
import storage from '../services/cloudStorage';
import Users from '../models/Users';

export const updateProfilePhoto = (req: IReqUplodFile, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
      success: false,
    });
  }

  const bucket = storage.bucket(`gs://${process.env.BUCKET_NAME}`);

  const blob = bucket.file(
    `users/${req.currentUser._id}/photo/${req.file.originalname}-${Date.now()}`,
  );

  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (error) => {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  });

  blobStream.on('finish', async () => {
    req.file.url = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${blob.name}`;

    const { _id } = req.currentUser;
    try {
      const user = await Users.findByIdAndUpdate(
        _id,
        {
          'profile.photoURL': req.file.url,
          updatedAt: new Date(),
        },
        { new: true },
      );
      return res.status(200).json({
        message: 'Photo uploaded successfully',
        success: true,
        data: req.file.url,
        user: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  });
};
