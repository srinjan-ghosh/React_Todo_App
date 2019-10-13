import React from 'react'
import { Checkbox, Grid, Button, ButtonContent, Icon } from 'semantic-ui-react'

function TodoItem(props) {
    const style = props.todo.done ? {textDecoration: "line-through"} : {textDecoration: "none"}
    return (
        <Grid style={{marginLeft : "15px"}}>
            <Grid.Column key="1">
                <Checkbox checked={props.todo.done} onChange={() => props.handleChange(props.todo.id)}/>
            </Grid.Column>
            <Grid.Column key="2" width={13}>
                <h3 style={style}>{props.todo.todo}</h3>
            </Grid.Column>
            <Grid.Column key="3">
                <Button animated="vertical" color='red' onClick= { () => props.delete(props.todo.id)}>
                    <Button.Content hidden>Delete</Button.Content>
                    <ButtonContent visible>
                        <Icon name="trash alternate outline"></Icon>
                    </ButtonContent>
                </Button>
            </Grid.Column>
        </Grid>
    )
}

export default TodoItem