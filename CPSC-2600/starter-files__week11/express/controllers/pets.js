import petsModel from '../models/pets.js';

const getPets = (req, res) => {
    // TODO - get the data from the database, send it to the client
    //want to get the url query param called num and pass it to the function
    //with SQLlight LIMIT -1 means get all rows
    const pets = petsModel.getPets(req.query.num || -1);

    res.json(pets); //send the response
}

const postPet = (req, res) =>{
    // TODO
        // message: "Is this working????"
        //step 1: insert the pet data from the req body into the database
        const result =  petsModel.postPet(req.body);
        console.log(result);

}

export { getPets, postPet };