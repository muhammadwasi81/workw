import React from 'react';
import Nodata from "../../../content/NewContent/eLearning/no_data.svg";

export const NoDataFound = () => {
    return (
        
        <div className="flex items-center justify-center h-full w-full">
            <img src={Nodata} />
        </div>
    )
}