import React from 'react';

export const MessagePage = ({message}) => {
    return(
        <div style={{margin:"auto", textAlign:"center"}} >
            <h2 style={{textTransform:"unset"}} >{message}</h2>
        </div>
    )
}