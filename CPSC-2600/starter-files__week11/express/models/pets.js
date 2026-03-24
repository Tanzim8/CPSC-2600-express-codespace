import db from './db.js';

const getPets = num => {
    // TODO-query to get all th epets num query param
    ///api/v1/perts?num=4
    const pets = db.prepare(
        `
        SELECT * FROM pets LIMIT ?
        `
    ).all(num);

    return pets;
}

const postPet = pet => {
    // TODO - insert 
    try{
        const insertResult = db.prepare(
            `
            INSERT INTO PETS (name, type, age) VALUES
            (?,?,?)`
        ).run(
            //challenge - get the values for th eplaceholders in the query
            pet.name,
            pet.type,
            pet.age
        )
        // return insertResult;
        return{
            status: 'success',
            id: insertResult.lastInsertRowid
        }
    }catch(error){
        //hanfles error that occurs from databse
        return{
            status: 'error',
            message: error.errorstr
        }
    };
    

}

export default {
    getPets,
    postPet
}