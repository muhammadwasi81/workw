import React, { useState} from 'react';
import Header from '../../../layout/header';
import { ContBody, TabbableContainer } from '../../../sharedComponents/AppComponents/MainFlexContainer';
import SideDrawer from "../../../sharedComponents/Drawer/SideDrawer";
import Composer from './Composer';
import COA_List from './listView';
import "../styles/style.css"
import { useSelector, useDispatch } from 'react-redux';
import { handleEdit } from '../store/slice';

export default function ChartOfAccounts() {
    const dispatch = useDispatch();
    const {success, editData} = useSelector(state => state.chartOfAccountsSlice);
    const [openDrawer, setOpenDrawer] = useState(false);

    console.log(editData)

    return (
        <TabbableContainer>
            <Header
                buttons={[
                    {
                        buttonText: "Create Account",
                        render: (
                            <SideDrawer
                                title={!!editData ? "Update" : "Create"}
                                buttonText={"Create"}
                                openDrawer={openDrawer || !!editData}
                                handleClose={() => dispatch(handleEdit(null))}
                                setOpenDrawer={()=>{}}
                                setIsEdited={()=>{}}
                                isAccessDrawer={true}
                                children={
                                    <Composer
                                        editData={editData}
                                        // openDrawer={openDrawer}
                                    />
                                }
                            />

                        ),
                    },
                ]}
            />
            <ContBody className="chartOfAccountBody">
                <COA_List />
            </ContBody>
        </TabbableContainer>
    )

}