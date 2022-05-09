import React, { useEffect, useContext, useState } from 'react';
import { ContainerHeader } from "../../SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../SharedComponent/AppComponents/MainFlexContainer";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import SideDrawer from '../../SharedComponent/Drawer/SideDrawer';
import { STRINGS } from '../../../utils/base';
import BonusList from './BonusList/Index';
import BonusComposer from './BonusComposer/index';
// import WarningFilterForm from './WarningFilterForm';
import { useLocation } from 'react-router-dom';

const Bonus = () => { 

    const { userLanguage } = useContext(LanguageChangeContext);
    const {bonus: bonusLabel} = dictionaryList[userLanguage];

    const [currentTab, setCurrentTab] = useState("list");

    const { search } = useLocation();
    let pathName = search.split("=")[1];

    useEffect(() => {
        if (!pathName) {
            setCurrentTab("list")
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
                        activeName={"list"}
                        to={`${STRINGS.ROUTES.HR.BONUS.DEFAULT}?f=list`}
                        isDefault={false}
                        linkName={label.appHeader.bonus.bonus}
                        urlParam={currentTab}
                    />
                    <HeaderNavLink
                        activeName={"aprrovals"}
                        to={`${STRINGS.ROUTES.HR.BONUS.DEFAULT}?f=aprrovals`}
                        isDefault={false}
                        linkName={label.appHeader.bonus.approvers}
                        urlParam={currentTab}
                    />
                </HeaderMenuContainer>
                <div className="right-menu" style={{ paddingRight: "10px" }}>
                    <div className="btn-hld">
                        <SideDrawer title="Create Bonus" buttonText={bonusLabel.createBonus}>
                            <BonusComposer />
                        </SideDrawer>
                    </div>
                </div>
                <span className="ln" />
            </ContainerHeader>
            <ContBody className='WarningMainDiv'>
                <div className="lf-col">
                    { currentTab === "list" ? <BonusList /> : currentTab === "aprrovals" ? <BonusList /> : "" }
                </div>
                <div className="rt-col" style={{ backgroundColor: "white", borderRadius: '8px' }}>
                    {/* <WarningFilterForm /> */}
                </div>
            </ContBody>

        </TabbableContainer>
    )

}

export default Bonus;