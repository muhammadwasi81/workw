import React from 'react';
import WhiteCard from '../../../../UI/WhiteCard';
import expensesIcon from "../../../../../../../content/svg/menu/newNavBarIcon/Expenses.svg";


const ExpenseBoard = ({ item }) => {
    let { totalAmount = 0, totalCount = 0 } = item;
    return (
        <div className="c-dash-item">
            <WhiteCard className='myPaper'>
                <div className='expenseItem' >
                    <div className='totalUsers'>
                        <img src={expensesIcon} className="userIcon" />
                        <div className='dash-text'>{String((totalAmount)).replace(/(.)(?=(\d{3})+$)/g, '$1,')} Expenses Managed</div>
                        <div className='dash-text' style={{ marginTop: "20px", fontSize: "30px" }} >{totalCount} Count</div>
                    </div>
                </div>
            </WhiteCard>
        </div>
    )
}
export default ExpenseBoard;