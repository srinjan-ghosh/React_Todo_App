import React from 'react';
import './App.css';
import { Header, Divider, Segment, Container } from 'semantic-ui-react'
import TodoItem from './components/TodoItem';
import NewTodo from './components/NewTodo';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      loading : false,
      todos: []
    }
  }

  componentDidMount() {
    this.setState( {loading: true} )
    fetch("/todos")
      .then( response => response.json())
      .then( data => {
        this.setState({
          loading: false,
          todos: data.todos
        })
      })

  }

  newTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos]
    })
    // console.log(this.state.todos)
  }

  getId = () => {
    let length = this.state.todos.length
    let id
    this.state.todos.forEach(todo => {
      if(todo.id === length)
        id = todo.id
    });

    return id + 1
  }

  handleChange = (id) => {
    // make changes in state 
    this.setState( prevState => {
      const updateTodos = prevState.todos.map( todo => {
        if(todo.id === id){
          todo.done = !todo.done
        }
        return todo
      })
      return {
        todos: updateTodos
      }
    })
    // reflect the changes in the database
    this.updateTodoDone(id)
  }

  updateTodoDone = async (id) => {
    await fetch(`/update_checked/${id}`, {
      method: 'PUT'
    })

  }

  handleDelete = (id) => {
    // delete the todo where todo.id == id
    this.setState( prevState => {
      const updatedTodos = prevState.todos.filter( todo =>  todo.id !== id )
      return {
        todos: updatedTodos
      }
    })
    //update the database
    this.deleteTodo(id)
  }

  deleteTodo = async(id) => {
    await fetch(`/delete/${id}`, {
      method: 'DELETE'
    })

  }


  render() {
    console.log(this.state.todos)

    const todos = this.state.todos.map( todo => {
      return <TodoItem key={todo.id} todo={todo} handleChange={this.handleChange} delete={this.handleDelete}/>
    })

    return (
      <Container style= {{paddingTop: "25px"}}>
        <Header as='h1' textAlign='center'>TODO APP</Header>
        <Header as='h3' textAlign='left'>ADD A NEW TODO</Header>
        <NewTodo newTodo={this.newTodo} id={this.getId()}/>
        <Header as='h3' textAlign='left'>YOUR TODOS</Header>
        <Segment>
          {todos}
        </Segment>
      </Container>
    );
  }
}

export default App;
