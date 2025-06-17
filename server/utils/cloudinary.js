import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUD_NAME,
});

export const uploadMedia = async(file)=>{
    try{
        const uploadResponse = await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        });
        return uploadResponse;
    }catch(error){
        console.log(error);
    }
}

export const deleteMediaFromCloudinary = async(publicId) => {
    if (!publicId) {
        console.warn("No public ID provided for deletion");
        return;
    }

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== 'ok') {
            console.error("Cloudinary deletion failed:", result);
            return null;
        }
        return result;
    } catch (error) {
        console.error("Cloudinary delete error:", error);
        return null;
    }
}

export const deleteVideo = async(publicId)=>{
    try{
          await cloudinary.uploader.destroy(publicId,{resource_type:"video"})
    }catch(error){
           console.log(error);
    }
}