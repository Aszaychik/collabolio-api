import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import admin from '../services/firebase';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const uid = req.params.uid;
  try {
    const userRecord = await getAuth().getUser(uid);
    res.json(userRecord);
  } catch (error) {
    console.error('Error fetching user data:', error);
    const statusCode = error.code || 500;
    const errorMessage = error.message || 'Could not fetch user';
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userRecord = await getAuth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      displayName: req.body.displayName,
      disabled: false,
      photoURL:
        req.body.photoURL || 'https://api.dicebear.com/6.x/pixel-art/svg',
    });
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      emailVerified: userRecord.emailVerified,
      displayName: userRecord.displayName,
      disabled: userRecord.disabled,
      photoURL: userRecord.photoURL,
      isAdmin: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      deletedAt: null,
    });
    res.json(userRecord);
  } catch (error) {
    console.error(error);
    const statusCode = error.code || 500;
    const errorMessage = error.message || 'An unexpected error occurred.';
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const deleteUserAt = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const uid = req.params.uid;
  try {
    await getAuth().deleteUser(uid);
    const userRef = await admin.firestore().collection('users').doc(uid);
    await userRef.update({
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json('Delete Success');
  } catch (error) {
    const statusCode = error.code || 500;
    const errorMessage = error.message || 'Could not delete user';
    console.error('Error deleting user:', error);
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userRecord = await getAuth().listUsers();
    res.json(userRecord);
  } catch (error) {
    const statusCode = error.code || 500;
    const errorMessage = error.message || 'Could not fetch users';
    console.error('Error fetching users:', error);
    res.status(statusCode).json({ error: errorMessage });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const uid = req.params.uid;
  try {
    const userRecord = await getAuth().updateUser(uid, {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      photoURL: req.body.photoURL,
    });
    const userRef = await admin.firestore().collection('users').doc(uid);
    await userRef.update({
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json(userRecord);
  } catch (error) {
    const statusCode = error.code || 500;
    const errorMessage = error.message || 'Could not update user';
    console.error('Error updating user:', error);
    res.status(statusCode).json({ error: errorMessage });
  }
};
