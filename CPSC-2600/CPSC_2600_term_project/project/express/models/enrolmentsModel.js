import db from "./db.js";

export const createEnrolment = (student_id, course_id) => {
    const statement = db.prepare(
        `
        INSERT INTO enrolments (student_id, course_id, status)
        VALUES (?,?,?)`
    ).run(student_id,course_id,"enrolled");

    return statement;
}

export const dropEnrolment = (student_id, course_id) => {
    const statement = db.prepare(
        `
        UPDATE enrolments
        SET status = 'dropped'
        WHERE student_id = ? AND course_id = ? AND status = 'enrolled'
        `
    ).run(student_id,course_id);

    return statement;
}