import { useState, useEffect } from 'react';

const TypeChooser = props => {
    // WE're going to load a list of dog types from the Dog API
    // Endpoint: https://dog.ceo/api/breeds/list/all
    // When this component loads in the page for the first time, it should make a 
    // request to the above endpoint to get the list of types. Use useEffect
    const [types, setTypes] = useState(['corgi', 'chihuahua']);

    useEffect(function loadDogBreeds(){
        // Use the fetch function to make an HTTP GET request from a JS program
        // fetch returns a promise object - a promise represents the eventual future completion of an asynchronous task
        fetch(`https://dog.ceo/api/breeds/list/all`)
        .then((response)=>{
            // Do something with the response.

            // response.json() converts the response from a JSON response to a JavaScript object, and returns a promise.
            return response.json()
        }) // this function will be called when the response eventually arrives
        .then(objectResponse =>{
            // CHALLENGE: Convert the objectResponse to an array of strings representing the types of dogs (but NOT the subtypes)
            // console.log(Object.keys(objectResponse.message));
            setTypes(Object.keys(objectResponse.message));
        })
    }, 
    [] // this array contains dependencies that will cause the above function to be 
        // called. If we put state variables or props in the array, the function
        // will be called whenever ANY of them change. Any empty array will cause the 
        // function to be called when the component is first loaded.
    );

    // CHALLENGE: When the list of types is first loaded, we want to set the chosen type to the first element in the list. Hint: useEffect
    function setChosenToFirstType() {

    }
    return <>
        <h2>Choose a Dog Type</h2>
        <ul>
            {types.map((type,index)=>
            // CHALLENGe: figure out how to change the chosen state in the parent when the list item is clicked
            <li 
             key={index}
             onClick={()=>props.setChosen(type)}
            >
                {type}
            </li>)}
        </ul>
    </>
}

export default TypeChooser;