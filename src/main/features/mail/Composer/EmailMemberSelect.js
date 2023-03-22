import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmployees } from '../../../../utils/Shared/store/actions';
import MemberSelect from '../../../sharedComponents/AntdCustomSelects/SharedSelects/MemberSelect';
import Avatar from '../../../sharedComponents/Avatar/avatarOLD';


const EmailMemberSelect = () => {
    const employees = useSelector(state => state.sharedSlice.employees);
    const [firstTimeEmpData, setFirstTimeEmpData] = useState([]);
    const [isFirstTimeDataLoaded, setIsFirstTimeDataLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchEmployees("", 0);
    }, []);

    useEffect(() => {
        if (employees.length > 0 && !isFirstTimeDataLoaded) {
            setIsFirstTimeDataLoaded(true);
            setFirstTimeEmpData(employees);
        }
    }, [employees]);

    const fetchEmployees = (text, pgNo) => {
        dispatch(getAllEmployees({ text, pgNo, pgSize: 20 }));
    };

    return (
        <div>
            <MemberSelect
                style={{ marginBottom: "0px" }}
                data={firstTimeEmpData}
                selectedData={(e, r) => console.log(e, " - ", r)}
                canFetchNow={isFirstTimeDataLoaded}
                fetchData={fetchEmployees}
                placeholder={"collaborators"}
                mode={"multiple"}
                isObject={true}
                loadDefaultData={false}
                optionComponent={opt => {
                    return (
                        <>
                            <Avatar
                                name={opt.name}
                                src={opt.image}
                                round={true}
                                width={"30px"}
                                height={"30px"}
                            />
                            {opt.name}
                        </>
                    );
                }}
                // dataVal={value}
                name="collaborators"
                showSearch={true}
            />
        </div>
    )
};

export default EmailMemberSelect;