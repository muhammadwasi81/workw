import React, { useEffect, useContext, useState } from 'react';
import { ContainerHeader } from "../../SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../SharedComponent/AppComponents/MainFlexContainer";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import SideDrawer from '../../SharedComponent/Drawer/SideDrawer';
import { STRINGS } from '../../../utils/base';
import WarningsList from './WarningList';
import WarningComposer from './WarningComposer/WarningComposer';
import WarningFilterForm from './WarningFilterForm';
import { useLocation } from 'react-router-dom';

const Warnings = () => { 

    const { userLanguage } = useContext(LanguageChangeContext);
    const {warnings, Direction} = dictionaryList[userLanguage];

    const [currentTab, setCurrentTab] = useState("warnings");

    const { search } = useLocation();
    let pathName = search.split("=")[1];

    useEffect(() => {
        if (!pathName) {
            setCurrentTab("warnings")
        } else {
            setCurrentTab(pathName)
        }
    }, [search])



    const label = dictionaryList[userLanguage];
    return (
        <TabbableContainer>
            <ContainerHeader>
                <HeaderMenuContainer>
                    <HeaderNavLink
                        activeName={"warnings"}
                        to={`${STRINGS.ROUTES.HR.WARNINGS.DEFAULT}?f=warnings`}
                        isDefault={false}
                        linkName={label.appHeader.warnings.warnings}
                        urlParam={currentTab}
                    />
                    <HeaderNavLink
                        activeName={"aprrovals"}
                        to={`${STRINGS.ROUTES.HR.WARNINGS.DEFAULT}?f=aprrovals`}
                        isDefault={false}
                        linkName={label.appHeader.warnings.approvers}
                        urlParam={currentTab}
                    />
                </HeaderMenuContainer>
                <div className="right-menu" style={{ paddingRight: "10px" }}>
                    <div className="btn-hld">
                        <SideDrawer title="Create Warning" buttonText={warnings.createwarnings}>
                            <WarningComposer></WarningComposer>
                        </SideDrawer>
                    </div>
                </div>
                <span className="ln" />
            </ContainerHeader>
            <ContBody>
                <div className="lf-col">
                    { currentTab === "warnings" ? <WarningsList /> : currentTab === "aprrovals" ? <WarningsList /> : "" }
                </div>
                <div className="rt-col" style={{ backgroundColor: "white", borderRadius: '8px' }}>
                    <WarningFilterForm />
                </div>
            </ContBody>

        </TabbableContainer>
    )

}

export default Warnings;