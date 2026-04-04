import React from "react";

const CourseCard = ({course}) =>{
    return(
        <div className="course-card">
            <h3>{course.course_code}</h3>
            <p><strong>Course:</strong> {course.course_name}</p>
            <p><strong>Credit:</strong> {course.credits}</p>
            <p><strong>Department:</strong> {course.department}</p>
            <p><strong>Capacity:</strong> {course.capacity}</p>
        </div>
    )
}

export default CourseCard;