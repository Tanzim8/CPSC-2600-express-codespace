import { useState,useEffect } from "react";
function Joke({selectedType}){
    const [jokeState, setJokeSate] = useState();


    useEffect(() =>{
        let ignore = false;

        async function fetchJoke(selectedType) {
            const res = await fetch(
                `https://official-joke-api.appspot.com/jokes/${selectedType}/random`
            );
            const data = res.json();
        }
        if(!ignore){
            setJokeSate(data[0]);
        }
        fetchJoke();
    },[selectedType])

    return (
        <div>
            <h2>Selected Type: </h2>
            <p>{selectedType}</p>

            <h2>Joke: </h2>
            <p>{jokeState.setup}</p>
            <p>{jokeState.punchline}</p>
        </div>
    )
}


export default Joke;