var $ltMAx$reactjsxdevruntime = require("react/jsx-dev-runtime");
var $ltMAx$reactdomclient = require("react-dom/client");
var $ltMAx$react = require("react");


// Make an application that allows users to browsse 
// different kinds of dogs, and see random images
// of those dogs.




const $482173c33f658429$var$TypeChooser = (props)=>{
    // WE're going to load a list of dog types from the Dog API
    // Endpoint: https://dog.ceo/api/breeds/list/all
    // When this component loads in the page for the first time, it should make a 
    // request to the above endpoint to get the list of types. Use useEffect
    const [types, setTypes] = (0, $ltMAx$react.useState)([
        'corgi',
        'chihuahua'
    ]);
    (0, $ltMAx$react.useEffect)(function loadDogBreeds() {
        // Use the fetch function to make an HTTP GET request from a JS program
        // fetch returns a promise object - a promise represents the eventual future completion of an asynchronous task
        fetch(`https://dog.ceo/api/breeds/list/all`).then((response)=>{
            // Do something with the response.
            // response.json() converts the response from a JSON response to a JavaScript object, and returns a promise.
            return response.json();
        }) // this function will be called when the response eventually arrives
        .then((objectResponse)=>{
            // CHALLENGE: Convert the objectResponse to an array of strings representing the types of dogs (but NOT the subtypes)
            // console.log(Object.keys(objectResponse.message));
            setTypes(Object.keys(objectResponse.message));
        });
    }, [] // this array contains dependencies that will cause the above function to be 
    );
    // CHALLENGE: When the list of types is first loaded, we want to set the chosen type to the first element in the list. Hint: useEffect
    function setChosenToFirstType() {}
    return /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)((0, $ltMAx$reactjsxdevruntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)("h2", {
                children: "Choose a Dog Type"
            }, void 0, false, {
                fileName: "src/components/TypeChooser.js",
                lineNumber: 37,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)("ul", {
                children: types.map((type, index)=>// CHALLENGe: figure out how to change the chosen state in the parent when the list item is clicked
                    /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)("li", {
                        onClick: ()=>props.setChosen(type),
                        children: type
                    }, index, false, {
                        fileName: "src/components/TypeChooser.js",
                        lineNumber: 41,
                        columnNumber: 13
                    }, undefined))
            }, void 0, false, {
                fileName: "src/components/TypeChooser.js",
                lineNumber: 38,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
var $482173c33f658429$export$2e2bcd8739ae039 = $482173c33f658429$var$TypeChooser;




const $c5c540b2dd9969ac$var$DogImage = (props)=>{
    const [imageSrc, setImageSrc] = (0, $ltMAx$react.useState)();
    (0, $ltMAx$react.useEffect)(function loadDogImageByType() {
        fetch(`https://dog.ceo/api/breed/${props.chosen}/images/random`).then((response)=>response.json()).then((objectResponse)=>{
            // Do something with the image URL we received from the API.
            // CHALLENGE: display the image.
            setImageSrc(objectResponse.message);
        });
    }, // When props.chosen changes the above function will be called and a new image will be loaded
    [
        props.chosen
    ]);
    return /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)((0, $ltMAx$reactjsxdevruntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)("h2", {
                children: [
                    "The Image: ",
                    props.chosen
                ]
            }, void 0, true, {
                fileName: "src/components/DogImage.js",
                lineNumber: 19,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)("img", {
                src: imageSrc
            }, void 0, false, {
                fileName: "src/components/DogImage.js",
                lineNumber: 20,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
var $c5c540b2dd9969ac$export$2e2bcd8739ae039 = $c5c540b2dd9969ac$var$DogImage;


const $ab610c4af25f372a$var$App = (props)=>{
    const [chosen, setChosen] = (0, $ltMAx$react.useState)();
    // Somehow have to set the value of chosen in <App /> from inside <TypeChooser />
    return /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)((0, $ltMAx$reactjsxdevruntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)("h1", {
                children: [
                    "Dog Image Viewer: ",
                    chosen
                ]
            }, void 0, true, {
                fileName: "src/components/App.js",
                lineNumber: 11,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)((0, $482173c33f658429$export$2e2bcd8739ae039), {
                setChosen: setChosen
            }, void 0, false, {
                fileName: "src/components/App.js",
                lineNumber: 12,
                columnNumber: 9
            }, undefined),
            /*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)((0, $c5c540b2dd9969ac$export$2e2bcd8739ae039), {
                chosen: chosen
            }, void 0, false, {
                fileName: "src/components/App.js",
                lineNumber: 13,
                columnNumber: 9
            }, undefined)
        ]
    }, void 0, true);
};
var $ab610c4af25f372a$export$2e2bcd8739ae039 = $ab610c4af25f372a$var$App;



const $4fa36e821943b400$var$root = (0, $ltMAx$reactdomclient.createRoot)(document.getElementById('react-container'));
$4fa36e821943b400$var$root.render(/*#__PURE__*/ (0, $ltMAx$reactjsxdevruntime.jsxDEV)((0, $ab610c4af25f372a$export$2e2bcd8739ae039), {}, void 0, false, {
    fileName: "src/index.js",
    lineNumber: 5,
    columnNumber: 13
}, undefined));


//# sourceMappingURL=index.js.map
