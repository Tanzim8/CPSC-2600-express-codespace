import { getCourseEnrolmentCounts } from "../models/adminModel";

export const listAdminCourses = (req,res) =>{
    const courses = getCourseEnrolmentCounts();

    res.json({
        courses: courses,
        links : [
            {
                rel : "self",
                href: "api/v1/admin/courses"
            }
        ]
    });
};