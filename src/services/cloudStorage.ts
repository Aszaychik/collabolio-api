import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_CLOUD_STORAGE_KEYFILE,
});

export default storage;
