import React, { useEffect, useState } from 'react';
import Header from '../../../layout/header';
import { ContBody, TabbableContainer } from '../../../sharedComponents/AppComponents/MainFlexContainer';
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from './Composer';
import COA_List from './listView';
import "../styles/style.css"
import { useSelector, useDispatch } from 'react-redux';
import { handleEdit } from '../store/slice';
import { Button } from 'antd/lib/radio';
import { ROUTES } from '../../../../utils/routes';

export default function ChartOfAccounts() {
    const dispatch = useDispatch();
    const { success, editData } = useSelector(state => state.chartOfAccountsSlice);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(()=>{
        if(success){
            setOpenDrawer(false)
        }
    }, [success])
    return (
        <TabbableContainer>
            <Header
             items={[
                {
                    name: "Chart of Account",
                    to: ROUTES.FINANCE.CHART_OF_ACCOUNT.ROOT,
                    renderButton: [1],
                }
            ]}
                buttons={[
                    {
                        buttonText: "Create Account",
                        render: (
                        <Button onClick={() => setOpenDrawer(true)} className="headerBtn" >
                            Create
                        </Button>),
                    },
                ]}
            />
            <SideDrawer
                title={!!editData ? "Update" : "Create"}
                isDisable={true}
                // openDrawer={openDrawer || !!editData}
                isOpen={openDrawer || !!editData}
                handleClose={() => {
                    dispatch(handleEdit(null));
                    setOpenDrawer(false)
                }}
                // success={!openDrawer || !(!!editData)}
                setOpenDrawer={() => { }}
                setIsEdited={() => { }}
                isAccessDrawer={true}
                children={
                    <Composer
                        editData={editData}
                    // openDrawer={openDrawer}
                    />
                }
            />
            <ContBody className="chartOfAccountBody">
                <COA_List />
            </ContBody>
        </TabbableContainer>
    )

}