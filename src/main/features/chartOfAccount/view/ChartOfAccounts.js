import React from 'react';
import Header from '../../../layout/header';
import { ContBody, TabbableContainer } from '../../../sharedComponents/AppComponents/MainFlexContainer';
import SideDrawer from '../../../sharedComponents/Drawer/SideDrawer';
import COA_List from './listView';

export default function ChartOfAccounts() {

    return (
        <TabbableContainer>
            <Header
                buttons={[
                    {
                        buttonText: "Create Account",
                        render: (
                            <SideDrawer
                                children={
                                    <div>dfdf</div>
                                    // <AddComposer
                                    // isEdit={isComposerEdit}
                                    // composerData={composerData}
                                    // loading={loading}
                                    // />
                                }
                                title={"Create Account"}
                                buttonText="Create Account"
                                isAccessDrawer={true}
                            // setOpenDrawer={handleOpenDrawer}
                            // setIsEdited={() => {}}
                            // openDrawer={visible}
                            // success={success}
                            />
                        ),
                    },
                ]}
            />
            <ContBody>
                <COA_List />
            </ContBody>
        </TabbableContainer>
    )

}