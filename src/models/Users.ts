import mongoose, { Schema } from 'mongoose';
import { IUsers } from '../interfaces/IUsers';

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    required: false,
  },
  profile: {
    type: {
      displayName: String,
      phoneNumber: String,
      age: Number,
      birthDate: Date,
      isMale: Boolean,
      bio: String,
      avatarURL: String,
      location: {
        country: String,
        city: String,
        lat: Number,
        lng: Number,
      },
      skills: [
        {
          name: String,
        },
      ],
      interests: [
        {
          name: String,
        },
      ],
      experience: [
        {
          title: String,
          company: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],
      education: [
        {
          degree: String,
          school: String,
          startDate: Date,
          endDate: Date,
          grade: Number,
        },
      ],
      projects: [
        {
          title: String,
          description: String,
          link: String,
        },
      ],
      certifications: [
        {
          name: String,
          credentialURL: String,
          endDate: Date,
          skills: [
            {
              name: String,
            },
          ],
        },
      ],
      languages: [
        {
          name: String,
        },
      ],
      socialLinks: [
        {
          name: String,
          url: String,
        },
      ],
    },
    default: {
      avatarURL:
        'https://storage.googleapis.com/collabolio-dev.appspot.com/assets/images/avatars/default-avatar.png',
    },
    required: false,
  },
});

export default mongoose.model<IUsers>('Users', userSchema);
