import { getAllCourses } from "../models/coursesModel.js";

export const listCourses =(req, res) =>{
    let limit = Number(req.query.limit) || 10;
    let offset = Number(req.query.offset) || 0;

    const courses = getAllCourses(limit, offset);

    res.json(
        {
           courses: courses,
           links: [
            { rel: "self", href: `/api/v1/courses?limit=${limit}&offset=${offset}`}
           ] 
        }
    )
}