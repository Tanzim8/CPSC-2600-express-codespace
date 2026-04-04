import React, {use, useEffect, useState} from 'react';
import CourseCard from "./components/CourseCard.js";

const App = () =>{
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [studentId, setStudentId] = useState("");
    const [enrolments, setEnrolments] = useState([]);
    const [enrolmentError, setEnrolmentError] = useState("");
    const [enrolmentLoading, setEnrolmentLoading] = useState(false);
    

    useEffect(()=>{
        const fetchCourses = async () => {
            try{
                const response = await fetch("http://localhost:3000/api/v1/courses");
                if(!response.ok){
                    throw new Error("Could not fetch courses");
                }

                const data = await response.json();
                setCourses(data.courses);
            } catch(err){
                setError(err.message);
            } finally{
                setLoading(false);
            }
        }

        fetchCourses();
    }, []);

        const fetchStudentEnrolments = async () => {
            if(!studentId){
                setEnrolmentError("Please enter a student ID");
                setEnrolments([]);
                return;
            }

            try{
                setEnrolmentLoading(true);
                setEnrolmentError("");

                const response = await fetch(`http://localhost:3000/api/v1/students/${studentId}/enrolments`);
                const data = await response.json();

                if(!response.ok){
                    throw new Error(data.error || "Could not fetch enrolments");
                }
                setEnrolments(data.enrolments);
            }catch(err){
                setEnrolmentError(err.message);
                setEnrolments([]);
            }finally{
                setEnrolmentLoading(false);
            }
        }



    return(
        <div>
            <h1>Langara Engineering Enrollment System</h1>

            <div className = "student-panel">
                <h2>Student Panel</h2>
                <input
                    type="number"
                    placeholder="Enter student ID"
                    value={studentId}
                    onChange={(e)=>setStudentId(e.target.value)}
                />
                <button onClick={fetchStudentEnrolments}>
                    Load My Enrolments
                </button>

                {enrolmentLoading && <p>Loading enrolments...</p>}
                {enrolmentError && <p>Error: {enrolmentError}</p>}
            </div>

            <div className="enrolments-section">
                <h2>My Enrolments</h2>

                {enrolments.length > 0 ? (
                    <ul>
                        {enrolments.map((item)=>(
                            <li key={item.course_id}>
                                {item.course_code} - {item.course_name}
                            </li>
                        ))}
                    </ul>
                ):(
                    !enrolmentLoading && <p>No enrolments found for this student.</p>
                )

                }
            </div>


            {loading && <p>Loading courses...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <div>
                    <h2>Available Courses</h2>
                    <div className="courses-container">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                    ))}
                    </div>
                </div>
            )}
            </div>
    );
};

export default App;