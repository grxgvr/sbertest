import React from 'react';
import Button from '../../UI/Button/Button';
import './MenuItem.css';

const MenuItem = (props) => {
    return (
        <div className='menuItem'>
            <label>{props.label}</label>
            <Button click={() => props.toggle(props.label)}>DO IT</Button>
        </div>
    )
}

export default MenuItem;