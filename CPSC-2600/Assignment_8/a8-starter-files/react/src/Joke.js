import { useState,useEffect } from "react";
function Joke({selectedType}){
    const [jokeState, setJokeState] = useState(null);
    const [reloadCount, setReloadCount] = useState(0);

    //for task - 5
    const [loading, setLoadingState] = useState(false); 


    const handleAnotherJoke =()=>{
        setReloadCount(reloadCount+1);
    }
    //Task 3
    useEffect(() =>{
        let ignore = false;

        const fetchJoke = async() => {
            if(!selectedType){
                setJokeState(null);
                setLoadingState(false);
                return;
            }
            //checking and updating the setjokeState value
            setLoadingState(true);
            setJokeState(null);
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

    //for Task 5 another useState methods
    useEffect(()=>{
        if (selectedType && jokeState != null && jokeState.type === selectedType) {
            setLoadingState(false);
    }
    },[selectedType, jokeState])

    return (
        <div>
            <h2>Selected Type: </h2>
            <p>{selectedType}</p>

            <h2>Joke: </h2>
            { !selectedType ?(
                    <p>No Joke loaded yet.</p>
                ) :
                loading ? (
                    <p>loading...</p>
                ): jokeState ? (
                    <div>
                        <p>{jokeState.setup}</p>
                        <p>{jokeState.punchline}</p>
                    </div>
                ) : ( null)
            }
            {selectedType && ( <button onClick={
                (event) =>{
                    handleAnotherJoke()
                }
            }>Get Another Joke!</button>
        )}
        </div>
    )
}


export default Joke;