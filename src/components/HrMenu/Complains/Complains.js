import React, { useEffect, useContext, useState } from 'react';
import { ContainerHeader } from "../../SharedComponent/AppComponents/MainHeader";
import HeaderNavLink from "../../SharedComponent/AppComponents/MainHeader/HeaderNavLink";
import { ContBody, HeaderMenuContainer, TabbableContainer } from "../../SharedComponent/AppComponents/MainFlexContainer";
import { dictionaryList } from "../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import SideDrawer from '../../SharedComponent/Drawer/SideDrawer';
import { STRINGS } from '../../../utils/base';
import ComplainsList from './ComplainsList';
// import WarningComposer from './WarningComposer/WarningComposer';
import ComplainFilterForm from './ComplainFilterForm';
import { useLocation } from 'react-router-dom';


const Complains = () => {

    const { userLanguage } = useContext(LanguageChangeContext);
    const {complains, Direction} = dictionaryList[userLanguage];

    const [currentTab, setCurrentTab] = useState("complains");

    const { search } = useLocation();
    let pathName = search.split("=")[1];

    useEffect(() => {
        if (!pathName) {
            setCurrentTab("complains")
        } else {
            setCurrentTab(pathName)
        }
    }, [search])



    const label = dictionaryList[userLanguage];
    console.log(label);

    return (
        <>
            <TabbableContainer>
            <ContainerHeader>
                <HeaderMenuContainer>
                    <HeaderNavLink
                        activeName={"complains"}
                        to={`${STRINGS.ROUTES.HR.COMPLAINS.DEFAULT}?f=complains`}
                        isDefault={false}
                        linkName={label.appHeader.complains.complains}
                        urlParam={currentTab}
                    />
                    <HeaderNavLink
                        activeName={"aprrovals"}
                        to={`${STRINGS.ROUTES.HR.COMPLAINS.DEFAULT}?f=aprrovals`}
                        isDefault={false}
                        linkName={label.appHeader.complains.approvers}
                        urlParam={currentTab}
                    />
                </HeaderMenuContainer>
                <div className="right-menu" style={{ paddingRight: "10px" }}>
                    <div className="btn-hld">
                        <SideDrawer title={complains.createComplain} buttonText={complains.createComplain}>
                            {/* <WarningComposer></WarningComposer> */}
                        </SideDrawer>
                    </div>
                </div>
                <span className="ln" />
            </ContainerHeader>
            <ContBody className='WarningMainDiv'>
                <div className="lf-col">
                    { currentTab === "complains" ? <ComplainsList /> : currentTab === "aprrovals" ? <ComplainsList /> : "" }
                </div>
                <div className="rt-col" style={{ backgroundColor: "white", borderRadius: '8px' }}>
                    <ComplainFilterForm />
                </div>
            </ContBody>
        </TabbableContainer>
        </>
    )
}

export default Complains;
