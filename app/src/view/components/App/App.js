import React, { Component } from 'react';
import Menu from '../Menu/Menu';
import controller from '../../../controller/controller';
import Form from '../UI/Form/Form';
import './App.css';


class App extends Component {
  state = {
    formOpen: false,
    loading: false,
    formType: null,
    message: null
  }

  toggleForm = (type) => {
    this.setState({loading: true, formOpen: true, results: null, message: null})
    if(type === 'GET /api/user'){
      this.getUsers(type);
    }
    else {
      this.setState({results: null, loading: false, formType: type})
    }
  }

  handleClick = (data) => {
    this.setState({loading: true, results: false, message: null})
    switch(this.state.formType){
      case 'GET /api/user/:id':
        this.getUser(data);
          break;
      case 'POST /api/user':
        this.addUser(data);
          break;
      case 'PUT /api/user/:id':
        this.updUser(data);
          break;
      default:
          break;
    }
  }
 
  getUsers(type) {
    controller.getUsers()
      .then(res => {
        if (res.data.data)
          this.setState({ results: res.data.data, loading: false, formType: type });
        else
          this.setState({ loading: false, message: 'Ничего не найдено:(' });
      });
  }

  getUser(data) {
    if (data)
      controller.getUser(data)
        .then(res => {
          if (res.data.data)
            this.setState({ loading: false, results: [res.data.data], message: null });
          else
            this.setState({ loading: false, message: 'Ничего не найдено:(' });
        });
    else
      this.setState({ loading: false, message: 'Пустое поле поиска' });
  }

  addUser(data) {
    if (data.login && data.name) {
      controller.getUsers()
        .then(res => res.data.data.filter(usr => usr.login === data.login).length)
        .then(len => {
          if (len === 0) {
            controller.addUser(data.name, data.login)
              .then(res => this.setState({ loading: false, message: `Пользователь добавлен! id: ${res.data.id}` }));
          }
          else {
            this.setState({ loading: false, message: 'Пользователь с таким логином уже существует' });
          }
        });
    }
    else if(data.name === '' || data.login === '')
      this.setState({ loading: false, message: 'Все поля должны быть заполнены' });
  }

  updUser(data) {
    if (data.id && (data.login || data.name)) {
      controller.getUsers()
        .then(res => {
          return {
            len: res.data.data.filter(usr => usr.login === data.login).length,
            exist: res.data.data.filter(usr => usr._id === data.id).length
          };
        })
        .then(res => {
          if (!res.exist)
            this.setState({ loading: false, message: 'Пользователя с таким id не существует' });
          else if (res.len !== 0)
            this.setState({ loading: false, message: 'Пользователь с таким логином уже существует' });
          else
            controller.updUser(data.id, data.name, data.login)
              .then(res => this.setState({ loading: false, message: 'Пользователь изменен!' }));
        });
    }
    else
      this.setState({ loading: false, message: 'Необходим id и значение меняемого поля' });
  }

  render() {
    let form = this.state.formOpen ? 
    <Form type = {this.state.formType} 
          results = {this.state.results}
          loading = {this.state.loading}
          click = {this.handleClick}
          message = {this.state.message}
    /> : null
    return (
      <div className="App">
          <Menu toggle={this.toggleForm}/>
          {form}
      </div>
    );
  }
}
export default App;
