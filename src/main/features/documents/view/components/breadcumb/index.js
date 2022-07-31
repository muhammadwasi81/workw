import { Breadcrumb } from 'antd';
import React from 'react';
import "./style.css";

function BreadCumbs({ data }) {
    const onClick = (item) => {

    }
    return (
        <div className='MybreadCumbs'>
            <Breadcrumb>
                {
                    data.map((item) => <Breadcrumb.Item onClick={() => onClick(item)} >{item.label}</Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
        </div>
    )
}

export default BreadCumbs