import React from 'react';
import ResultItem from './ResultItem/ResultItem';
import './ResultList.css';

const list = (props) => 
<div className='list'>
    {props.data.map(element => (
                <ResultItem element={element} key={element._id}/>
        )
    )}
</div>

export default list;