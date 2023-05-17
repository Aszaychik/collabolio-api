import * as admin from 'firebase-admin';
import * as firebaseServiceAccountKey from './firebaseServiceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(
    firebaseServiceAccountKey as admin.ServiceAccount,
  ),
  databaseURL: 'https://collabolio-dev.firebaseio.com',
});

export default admin;
