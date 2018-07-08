import dotenv from 'dotenv';
dotenv.config();
export const uploadPreset = process.env.UPLOAD_PRESET;
export const cloudinaryURL = process.env.CLOUDINARY_URL;
