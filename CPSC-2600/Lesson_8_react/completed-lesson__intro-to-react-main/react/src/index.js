// PArcel is an application that will run in our server-side Node.js environment that will bundle all the code in /react/src into a SINGLE JavaScript file, and place that file in /express/public. Our React source code (including many JS files) will live in /react/src, but the compiled, compressed JavaScript code for the whole application will live in /express/public where the client can access it.
console.log("Hello Parcel!!!");

// Create a root for the React application - this is the root element for our component hierarchy 
import { createRoot } from 'react-dom/client';
import react from 'react';

import App from './components/App.js';

import './style.css';

const root = createRoot(document.getElementById('react-container'));
root.render(<App />);
// The above code that looks like HTML is actually JSX syntax. This is React's HTML-like template language. Used to template the HTML output of a React component that gets rendered into the page

// START AT 5:55pm