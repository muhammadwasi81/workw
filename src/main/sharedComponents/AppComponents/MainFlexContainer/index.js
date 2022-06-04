import styled from "styled-components";

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

export const TabbableContainer = styled.div.attrs(({theme}) => ({
    className:  `tabbable-container ${theme.Direction === 'rtl' ? "tabbable-container-rtl" : ""}`,
}))`;
  `

export const ContBody = styled.div.attrs(() => ({
	className: "cont-body",
}))``;
