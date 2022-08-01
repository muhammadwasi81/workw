import styled from "styled-components";

export const SingleItem = styled.div`
  background: white;
  border-radius: 10px;
  padding: 13px 10px;
  margin: 13px 0px;

  &:hover {
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & .ant-btn {
    font-size: 12px;
  }
`;

export const ItemContent = styled.div`
  margin-top: 15px;
`;

export const ItemProfile = styled.div`
  display: flex;

  & h4 {
    font-weight: 700;
  }

  & .details {
    font-size: 11px;
  }
`;

export const ItemInfo = styled.div`
  margin-left: 7px;
  line-height: 7px;
  color: gray;
  padding: 8px 0px 0px 0px;
`;
