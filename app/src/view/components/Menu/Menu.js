import React from 'react';
import MenuItem from './MenuItem/MenuItem'
import './Menu.css';

const Menu = (props) => (
    <div className='menu'>
        <MenuItem label='GET /api/user' toggle={props.toggle}/>
        <MenuItem label='GET /api/user/:id' toggle={props.toggle}/>
        <MenuItem label='POST /api/user' toggle={props.toggle}/>
        <MenuItem label='PUT /api/user/:id' toggle={props.toggle}/>
    </div>
)

export default Menu;