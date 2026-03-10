// import logo from './logo.svg';
import Tagline from './Tagline.js'
const App = props =>{
  const myStyles = {
    textDecoration: 'underline'
  };
  return <>
    <h1 style={myStyles}>Our First Component!</h1>
    <Tagline text = 'This is coming from the parent' />
    </>
}







// import './App.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
