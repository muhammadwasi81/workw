import { Breadcrumb } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { handleBreadCumb } from '../../../store/slice';
import "./style.css";

function BreadCumbs({ data }) {
    const dispatch = useDispatch();
    const onClick = (item, index) => {
        dispatch(handleBreadCumb({
            ...item,
            index
        }))
    }
    return (
        <div className='MybreadCumbs'>
            <Breadcrumb>
                {
                    data.map((item, index) => <Breadcrumb.Item onClick={() => onClick(item, index)} >{item.label}</Breadcrumb.Item>
                    )
                }
            </Breadcrumb>
        </div>
    )
}

export default BreadCumbs