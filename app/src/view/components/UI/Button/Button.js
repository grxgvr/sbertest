import React from 'react';
import './Button.css';

const Button = (props) => (
    <button className='btn' onClick={props.click}>{props.children}</button>
)

export default Button;