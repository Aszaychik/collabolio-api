import { ObjectId } from 'mongoose';

export interface IUsers {
  _id: ObjectId;
  username: string;
  googleId?: string;
  email: string;
  emailVerified: boolean;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  profile: {
    displayName: string;
    phoneNumber?: string;
    bio: string;
    photoURL: string;
    location?: string;
    skills?: { name: string }[];
    interests?: { name: string }[];
    experience?: {
      title: string;
      company: string;
      startDate: Date;
      endDate: Date;
      description: string;
    }[];
    education?: {
      degree: string;
      school: string;
      startDate: Date;
      endDate: Date;
      grade?: number;
    }[];
    projects?: {
      title: string;
      description: string;
      link: string;
    }[];
    certifications?: {
      name: string;
      credentialURL: string;
      endDate?: Date;
      skills?: { name: string }[];
    }[];
    languages?: { name: string }[];
    socialLinks?: {
      name: string;
      url: string;
    }[];
  };
}
