// Make an application that allows users to browsse 
// different kinds of dogs, and see random images
// of those dogs.
import { useState } from 'react';
import TypeChooser from './TypeChooser.js';
import DogImage from './DogImage.js';
const App = props => {
    const [chosen, setChosen] = useState();
    const [inputNumber, setInputNumber] = useState(1);
    const [dogType, setDogType] = useState("");
    // Somehow have to set the value of chosen in <App /> from inside <TypeChooser />
    const getImages = event =>{
        event.preventDefault();
        setChosen(dogType);

        //make an HTTP request to th edog api
        fetch(`https://dog.ceo/api/breeds/${dogType}/images/random/${inputNumber}`)
        .then((response) =>{
            return response.json();
        }).then((data)=>{
            console.log(data);
        })
    }
    return(
    <>
        <h1>Dog Image Viewer: {chosen}</h1>
        <h1>Hello React</h1>

        <p>Choosen Dog type : {dogType}, number of Images: {inputNumber}</p>
        <form onSubmit = {getImages}>
            <label htmlFor="dogType">Dog Type: </label>
            <input type='text' 
                    id ="dogType"   
                    name='dogType' 
                    value={dogType} 
                    onChange={(event)=> setDogType(event.target.value)}></input>
            <label htmlFor="numberChoosen">Select number of images: </label>
            <input type='number' 
                    id="numberChoosen" 
                    name='numberChoosen' 
                    value={inputNumber} 
                    onChange={(event)=>setInputNumber(event.target.value)}></input>
            <button type='submit'>Get Images</button>
        </form>

        <TypeChooser setChosen={setChosen} />
        <DogImage chosen={chosen} inputNumber={inputNumber}/>
    </>
    );
}

export default App;