import React from 'react';
import './ResultItem.css';

const resultElement = (props) => (
    <div className='ResultItem'>
        <div>id: {props.element._id}</div>
        <div>name: {props.element.name}</div>
        <div>login: {props.element.login}</div>
 
    </div>
)

export default resultElement;