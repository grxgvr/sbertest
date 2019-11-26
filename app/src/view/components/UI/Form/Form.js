import React from 'react';
import ResultList from '../../ResultList/ResultList';
import Spinner from '../Spinner/Spinner';
import Input from '../Input/Input';
import Button from '../Button/Button'
import './Form.css'

const Form = (props) => {
        let inputs = null;
        let msg = <div className='msg'>{props.message}</div>;
        switch (props.type){
            case 'GET /api/user/:id':
                inputs = (
                    <div className='inputs'>
                        <Input ph='id'/>
                        <Button click={() => props.click(document.getElementById('id').value)}>Найти</Button>
                    </div>
                )
                break;
            case 'POST /api/user':
                inputs = (
                    <div className='inputs'>
                        <Input ph='name'/>
                        <Input ph='login'/>
                        <Button click={() => props.click({
                            name: document.getElementById('name').value,
                            login: document.getElementById('login').value,
                        })}>Добавить</Button>
                    </div>
                )
                break;
            case 'PUT /api/user/:id':
                inputs = (
                    <div className='inputs'>
                        <Input ph='id'/>
                        <Input ph='name'/>
                        <Input ph='login'/>
                        <div>
                            <Button click={() => props.click({
                            id: document.getElementById('id').value,
                            name: document.getElementById('name').value,
                            login: document.getElementById('login').value,
                        })}>Редактировать</Button>
                        </div>
                    </div>
                )
                break;
            default:
                inputs = null;
                break;
        }
        let spin = props.loading ? <Spinner /> : null;
        let results = props.results ? <ResultList data={props.results}/> : null;
        return (
            <div className='form'>
                {inputs}
                {msg}
                {spin}
                {results}
            </div>
        )
}


export default Form;