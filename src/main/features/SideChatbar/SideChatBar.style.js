import styled from "styled-components";

export const SideChatBar = styled.div.attrs(({sideBarStatus, isDefault,theme, isMobileView}) => ({
    className: `appSideBar ${isDefault && isMobileView ? "appSideBarDefault-Mob" : isDefault ? "appSideBarDefault" :  sideBarStatus ? "appSideBarOpen" : !sideBarStatus && isMobileView ? "appSideBarClose-Mob" : !sideBarStatus ? "appSideBarClose" : ""}
           ${ theme.Direction === "rtl" ? "appSideBar-rtl": "" }`

    }))``

