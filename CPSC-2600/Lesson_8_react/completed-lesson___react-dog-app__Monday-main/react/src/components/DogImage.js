import { useEffect, useState } from 'react';

const DogImage = props => {

    const [imageSrc, setImageSrc] = useState();

    useEffect(function loadDogImageByType(){
        fetch(`https://dog.ceo/api/breed/${props.chosen}/images/random/${props.inputNumber}`)
        .then(response=>response.json())
        .then(objectResponse=>{
            // Do something with the image URL we received from the API.
            // CHALLENGE: display the image.
            setImageSrc(objectResponse.message)
        })
    }, 
    // When props.chosen changes the above function will be called and a new image will be loaded
    [props.chosen, props.inputNumber]);
    return <>
        <h2>The Image: {props.chosen}</h2>
        {/* <img src={imageSrc} /> */}
        {ImageList.map((image, index) =>(
            <img
                key={index}
                src={image}
                alt={props.chosen}
                width="200"
                />
        ))}
    </>
}

export default DogImage;