import React from 'react'

function Error (props) {
    const display = props.error ? props.value : ''
    return (
        <div style={{color: 'red'}}>
            {display}
        </div>
    )
}

export default Error