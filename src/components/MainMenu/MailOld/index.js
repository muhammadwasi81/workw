import React from 'react';
import './style/index.css'
import MainLeftBody from "./MainLeftBody";
import MainRightBody from "./MainRightBody";
import {MailContainer, MailMainContainer} from "./style/mail.style";
import {useSelector} from "react-redux";
import MailComposer from "./Composer/"


const Index = () => {
    const {isMobileScreen} = useSelector(state => state.responsiveSlice);
    return (
        <MailContainer isMobileScreen={isMobileScreen}>
            <MailMainContainer isMobileScreen={isMobileScreen}>
                <MainLeftBody/>
                <MainRightBody/>
            </MailMainContainer>
            <MailComposer/>
        </MailContainer>
    );
}

export default Index;