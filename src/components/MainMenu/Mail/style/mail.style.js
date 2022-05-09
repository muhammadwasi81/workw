import styled from 'styled-components'


export const MailContainer = styled.div.attrs(({theme, isMobileScreen}) => ({
    className: theme.Direction === 'rtl' ? "mailContainerRtl" : "mailContainer",
    style: {marginTop: isMobileScreen && "36px", width: isMobileScreen && "100%", padding: "0px 5px"}
}))``;


export const MailComposerBody = styled.div.attrs(({theme, isTablet, isMobileScreen}) => ({
    className: isTablet ? "containerHideClass" : "mailComposerBody",
    style: {width: isMobileScreen && "200px", borderLeft: theme.Direction === "rtl" && "1px solid #F4F4F4"},

}))``;

export const MailMainContainer = styled.div.attrs(({theme, isMobileScreen}) => ({
    className: theme.Direction === 'ltr' ? "mailMainContainer" : "mailMainContainerRTL",

    style: {width: isMobileScreen && "inherit"}
}))``;


export const MailContentBody = styled.div.attrs(() => ({
    className: "mailContentBody"
}))``

export const ComposerBtnSection = styled.div.attrs(({theme, isMobileScreen}) => ({
    className: "composerBtnSection",
    style: {margin: isMobileScreen && "unset", flexDirection: theme.Direction === 'rtl' && "row-reverse"}
}))``