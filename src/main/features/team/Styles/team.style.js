import styled from "styled-components";
import Button from "../../../sharedComponents/button/index";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};
export const TeamPanelContainer = styled.div`
  display: flex;
  width: 100%;
  background: #f9f9f9;
  min-height: 80vh;
  flex-direction: ${(props) =>
    props.theme.Direction === "ltr" ? "row" : "row-reverse"};
`;
export const AdminList = styled.div`
  height: min-content;
  overflow-y: scroll;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  white-space: nowrap;
  margin-right: 10px;
  background: white;
  border-radius: 4px;
  margin-bottom: 10px;
  @media ${device.tablet} {
    & {
      height: min-content;
    }
  }
`;

export const Item = styled.div`
  background: ${({ active }) => (active ? "var(--currentThemeColor)" : "")};
  color: ${({ active }) => (active ? "#fff" : "")};
  width: 100%;
  height: 40px;
  list-style-type: none;
  border-bottom: 1px solid rgba(29, 45, 58, 0.1);
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const Link = styled.div`
  flex-direction: ${(props) =>
    props.theme.Direction === "ltr" ? "row" : "row-reverse"};
  text-decoration: none !important ;
  padding-right: 40px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${"" /* color: var(--currentThemeColor); */}
  font-family: inherit;
  font-weight: ${(props) => (props.theme.Direction === "ltr" ? 700 : 500)};

  font-size: 15px;
  position: relative;
  &::before {
    content: "";
    height: 100%;
    background: var(--currentThemeColor);
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover {
    color: var(--currentThemeColor);
    ::before {
      width: 2px;
    }
  }
  &.active,
  &:active {
    background: var(--currentThemeColor);
    border-radius: 0 4px 4px 0;
    color: white;

    & > svg {
      fill: white;
    }

    &:hover {
      color: var(--currentThemeColor);
      color: white;
      & > svg {
        fill: white;
      }
    }
  }

  & > svg {
    margin-right: 0.7rem;
    margin-left: 1rem;
  }
`;
