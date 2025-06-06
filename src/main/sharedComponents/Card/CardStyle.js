import styled from "styled-components";
import "./style.css";

export const SingleItem = styled.div`
  background: white;
  border-radius: 10px;
  padding: 13px 10px;
  margin: 2px 0px 0px 0px;
  position: relative;
  &:hover {
  }
`;

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
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export const CardWrapperAppraisal = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
  &:hover {
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export const CardWrapperCareers = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
  &:hover {
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;

export const CardWrapper2 = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
  &:hover {
  }
`;

export const CardWrapper3 = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(261px, 1fr));
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
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
  max-height: 80px;
  min-height: 80px;
}
`;

export const ItemContentCareers = styled.div`
  margin-top: 15px;
  max-height: 130px;
  min-height: 130px;
}
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
