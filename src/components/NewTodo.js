import React from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'

class NewTodo extends React.Component {
    constructor(){
        super();
        this.state = {
            todo: ""
        }
    }

    handleOnChange = (e) => {
        this.setState({
            todo: e.target.value
        })
    }

    handleOnClick = async (e) => {
        const todo = { 
            "id": this.props.id,
            "todo": this.state.todo,
            "done": false
        }
        const response = await fetch("/add" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })

        if (response.ok){
            this.props.newTodo(todo)
            this.setState({todo: ""})
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
            </Form>
        )
    }
}

export default NewTodo;