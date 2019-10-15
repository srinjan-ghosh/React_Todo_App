import React from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import Error from './error.js'

class NewTodo extends React.Component {
    constructor(){
        super();
        this.state = {
            todo: "",
            error: false
        }
    }

    handleOnChange = (e) => {
        this.setState({
            todo: e.target.value
        })
    }

    handleOnClick = async (e) => {
        if (this.state.todo === ""){
            this.setState({
                error : true
            })
        }
        else{
            const todo = { 
                "todo": this.state.todo,
                "done": false
            }
            const response = await fetch("https://flask-todo-react-python.herokuapp.com/add" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
            const data = await response.json()
            console.log(data.id)
            todo['id'] = data.id
    
            if (response.ok){
                this.props.newTodo(todo)
                this.setState({todo: ""})
            }
            this.setState({
                error : false
            })
        }
    }

    render (){
        return (
            <Form style={{marginLeft : "20px"}}>
                <Grid>
                    <Grid.Column width={14}>
                        <Form.Field>
                            <input 
                                placeholder='Enter Todo title' 
                                value={this.state.todo} 
                                onChange={this.handleOnChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                        <Button type="submit" onClick={this.handleOnClick}>Submit</Button>
                    </Grid.Column>
                </Grid>
                <Error error={this.state.error} value="Input can not be Blank"/>
            </Form>
        )
    }
}

export default NewTodo;
