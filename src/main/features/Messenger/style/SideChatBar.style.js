import styled from "styled-components";

export const MessengerContainer = styled.div.attrs(({ theme, isMobileScreen, isOpenMessenger }) => ({
       className: `MessengerCont ${isMobileScreen && isOpenMessenger === true
                     ? "openMobileMessenger"
                     : isMobileScreen && isOpenMessenger === false
                            ? "closeMobileMessenger"
                            : ""}`
}))``;