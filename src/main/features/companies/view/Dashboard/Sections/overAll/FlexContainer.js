import React from 'react';

const FlexContainer = ({children, flex}) => {
    return (
        <div className="flexContainer" style={{flex:flex}}>
            {children}
        </div>
    )
}
export default FlexContainer;