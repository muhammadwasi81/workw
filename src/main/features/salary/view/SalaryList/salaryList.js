import React from 'react';
import { CardWrapper } from '../../../../sharedComponents/Card/CardStyle';
import SalaryListItem from './SalaryListItem';

const SalaryList = ({data}) => {
    return (
        <CardWrapper >
            {
                data.map((item) =>
                    <SalaryListItem item={item} />)
            }
        </CardWrapper>
    )
}
export default SalaryList;