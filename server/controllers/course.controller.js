import { Course } from "../models/course.model";

export const createCourse = async(req,res)=>{
    try{
        const {courseTitle, category} = req.body;
        if(!courseTitle || ! category){
            return res.status(400).json({
                success : false,
                message:"title and category is required"
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "failed to create course"
        })
    }
}