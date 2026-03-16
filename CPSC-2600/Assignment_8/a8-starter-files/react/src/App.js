import TypeChooser from "./TypeChooser";
import Joke from "./Joke";
import { useState } from "react";

const App =()=>{
    const[selectedType,setSelectedType] = useState("");
    return(
        <div>
            {/* <TypeChooser/> */}
            <h1>Jokes React App!</h1>
            <TypeChooser 
            selectedType={selectedType}
            setSelectedType={setSelectedType}/>
            
            <Joke selectedType={selectedType}/>
        </div>
    )
}

export default App;