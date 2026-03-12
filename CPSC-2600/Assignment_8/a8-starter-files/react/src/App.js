import TypeChooser from "./TypeChooser";
import Joke from "./Joke";
import { useState } from "react";

function App(){
    const[selectedType,setSelectedType] = useState("");
    return(
        <div>
            {/* <TypeChooser/> */}
            <h1>Jokes React App!</h1>
            <TypeChooser setSelectedType={selectedType}/>
            <Joke selectedType={selectedType}/>
        </div>
    )
}

export default App;