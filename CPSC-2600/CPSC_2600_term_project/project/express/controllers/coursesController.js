import { getAllCourses, getCourseByID } from "../models/coursesModel.js";

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

export const showCourse = (req, res) =>{
    const id = Number(req.params.id);
    const course = getCourseByID(id);

    if(!course){
        return res.status(404).json({
            error: "Course not found"
        })
    }

    res.json({
        course: course,
        links: [
            {
                rel: "self",
                href: `/api/v1/courses/${id}`
            },
            {
                rel: "all-courses",
                href: "/api/v1/courses"
            }
        ]
    })
}