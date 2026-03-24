import { useState, useEffect } from 'react';

const App = props => {

    const [petFormData, setPetFormData] = useState({
        name: "",
        type: "",
        age: 1
    }); 

    const [pets, setPets] = useState([]);

    useEffect(function loadInitialPets() {
       // TODO: load from API and set state
       //chsllenge - make an HTTP request to the API and set the pets state with an array  of pets that comes in resoponse
       fetch(`/api/v1/pets`)
       .then(res => res.json())
       .then(allPets=>setPets(allPets))
    }, [])

    const submitPet = event => {
        event.preventDefault();
        // TODO: submit to API, update state
        fetch(`api/v1/pets`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(petFormData)
        })
        .then(response => response.json())
        .then(response=>console.log(response))
    }

    return <>
        <h1>Hello React!</h1>
        <dl>
            {pets.map(pet=><div key={pet.id}>
                <dt>{pet.name}</dt>
                <dd>{pet.type}, age: {pet.age}</dd>
            </div>)}
        </dl>
        <form onSubmit={event=>submitPet(event)}>
            <label>
                Pet name:
                <input 
                    type="text" 
                    value={petFormData.name} 
                    onChange={event=>setPetFormData({...petFormData, name: event.target.value })} 
                />
            </label>
            <label>
                Pet type:
                <input 
                    type="text" 
                    value={petFormData.type} 
                    onChange={event=>setPetFormData({...petFormData, type: event.target.value })} 
                />
            </label>
            <label>
                Pet age:
                <input 
                    type="number"
                    value={petFormData.age} 
                    onChange={event=>setPetFormData({...petFormData, age: event.target.value })} 
                />
            </label>
            <button>Submit</button>
        </form>
    </>;
}

export default App;