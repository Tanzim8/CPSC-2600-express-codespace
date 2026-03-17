// This is where we'll define the <App /> component. Components are defined like functions.
import Tagline from './Tagline.js';
const App = props => {
    const myStyles = {
        textDecoration: 'underline'
    }; // JavaScript style object. kebab-case CSS property names use camelCase in JS
    return <>
        <h1 style={myStyles}>Our First Component!</h1>
        <Tagline text='This text is coming from the parent.' />
    </>;
}
// The <App /> Component is the parent, the <Tagline /> component is the child
// In react, data is passed from parent to child. data is NOT passed between siblings
export default App;