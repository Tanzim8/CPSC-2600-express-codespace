import { useState,useEffect } from "react";
function Joke({selectedType}){
    const [jokeState, setJokeState] = useState(null);
    const [reloadCount, setReloadCount] = useState(0);


    function handleAnotherJoke(){
        setReloadCount(reloadCount+1);
    }
    //Task 3
    useEffect(() =>{
        let ignore = false;

        async function fetchJoke() {
            if(!selectedType){
                setJokeState(null);
                return;
            }
            const res = await fetch(
                `https://official-joke-api.appspot.com/jokes/${selectedType}/random`
            );
            const data = await res.json();

            if(!ignore){
                setJokeState(data[0]);
            }
        }
        
        fetchJoke();

        return () =>{
            ignore = true;
        }
    },[selectedType, reloadCount]);

    return (
         jokeState ?(
        <div>
            <h2>Selected Type: </h2>
            <p>{selectedType}</p>

            <h2>Joke: </h2>
            <p>{jokeState.setup}</p>
            <p>{jokeState.punchline}</p>
            <button onClick={
                (event) =>{
                    handleAnotherJoke()
                }
            }>Get Another Joke!</button>
        </div>
    ): (
        <p>No Joke loaded yet.</p>
    )
    )

}


export default Joke;