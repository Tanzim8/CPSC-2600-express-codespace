// CHALLENGE: write a CSS style to change the color of the tagline text using its class name. Using style.css
const Tagline = props => {
    return <>
        <p className='tagline'>{props.text}</p>
    </>;
}

export default Tagline;