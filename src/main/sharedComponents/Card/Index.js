import "./style.css";
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
  background: white;
  border-radius: 4px;
  padding: 13px 12px;
  position: relative;
`;
