//Task-2(craeting the TypeChooser() componenet using useState()s)
import { useState } from "react";

function TypeChooser({setSelectedType}){
    const[types, setTypes] = useState(
        [
            "general",
            "knock-knock",
            "programming",
            "dad"
        ]
    )
    return (
        <div>
            <h1>Choose a joke type</h1>
            <ul>
                {types.map((type)=>(
                    <li key={type}>
                        <a href="#" onClick={
                            (event) =>{
                                event.preventDefault();
                                setSelectedType(type);
                            }
                        }
                        >{type}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TypeChooser;