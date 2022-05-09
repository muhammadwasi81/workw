import styled from 'styled-components';

export const ContainerHeader = styled.div.attrs(({theme}) => ({
    className: theme.Direction === 'rtl' ? "cont-header-rtl" : "cont-header",
}))``

export const ImportantNoticeBoard = styled.div.attrs(() => ({}))`
padding: 10px;
display: flex;
flex-direction: column;
margin-top: 51px;
background: #b9b9b9;
height: 84px;
border-radius: 0 3px 11px 10px;
`