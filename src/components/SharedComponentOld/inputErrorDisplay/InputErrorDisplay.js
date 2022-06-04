import React from 'react'

function InputErrorDisplay({errorMessage}) {
    return (
        <span style={{color:"red",fontSize:"10px",fontWeight:"bold"}}>{errorMessage}</span>
    )
}

export default InputErrorDisplay
