import * as admin from 'firebase-admin';
import * as serviceAccountKey from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: 'https://collabolio-dev.firebaseio.com',
});

export default admin;
