import styled from "styled-components";

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
  &:hover {
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 13px 12px;
  position: relative;
`;

export const MainFlexContainer = styled.div.attrs(({ theme }) => ({
  className: `${
    theme.Direction === "ltr"
      ? "main-flex-container-ltr"
      : "main-flex-container-rtl"
  }`,
}))``;

export const HeaderMenuContainer = styled.div.attrs(({ theme }) => ({
  className: theme.Direction === "rtl" ? "menu-rtl" : "menu",
}))``;

export const TabContainer = styled.div.attrs(({ theme }) => ({
  className: `tabbable-container ${
    theme.Direction === "rtl" ? "tabbable-container-rtl" : ""
  }`,
}))`
   ;
`;

export const TabbableContainer = styled.div.attrs(({ theme }) => ({
  className: `tabbable-container ${
    theme.Direction === "rtl" ? "tabbable-container-rtl" : ""
  }`,
}))`
   ;
`;

export const ContBody = styled.div.attrs(() => ({
  className: "cont-body",
}))``;
