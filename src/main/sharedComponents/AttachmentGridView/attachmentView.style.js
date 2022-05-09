import styled from 'styled-components';

export const AttachmentGrid = styled.div.attrs(({length, className}) => ({
    style:{width:length===1 ? "94px" : "188px"},
    className: className,
}))``
