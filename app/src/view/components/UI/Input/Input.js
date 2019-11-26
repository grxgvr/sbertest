import React from 'react';
import './Input.css';

let Input = (props) => <input id = {props.ph} className='input' type="text" placeholder={props.ph}></input>

export default Input;