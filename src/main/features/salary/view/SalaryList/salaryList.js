import React from 'react';
import { useSelector } from 'react-redux';
import { CardWrapper } from '../../../../sharedComponents/Card/CardStyle';
import SalaryListItem from './SalaryListItem';

const SalaryList = () => {
    const listData = useSelector((state) => state.salarySlice.salaryList);
    console.log(listData);
    return (
        <CardWrapper >
            {
                listData.map((item) =>
                    <SalaryListItem item={item} />)
            }
        </CardWrapper>
    )
}
export default SalaryList;