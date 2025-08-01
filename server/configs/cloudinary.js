import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.end.CLOUDINARY_CLOUD_NAME,
    api_key: process.end.CLOUDINARY_API_KEY,
    
    api_secret: process.end.CLOUDINARY_API_SECRET,
  })
}
  
export default connectCloudinary