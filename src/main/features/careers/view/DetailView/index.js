import React, { useEffect } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../view/Header/header";
import Card from "./ShortDetailCard";
import styled from "styled-components";
import { getAllCareerApplicant, getCareerByIdAction } from "../../store/action";
import "../styles/style.css";
import CandidateList from "./CandidateListView";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { careerDetail } = useSelector((state) => {
    return state.careerSlice;
  });

  useEffect(() => {
    console.log("useEffect works in detail");
    const payload = {
      careerIds: [id],
    };
    dispatch(getAllCareerApplicant(payload));
    dispatch(getCareerByIdAction(id));
  }, []);

  // console.log(careerDetail);
  //call get career by id
  //call get all career applicant

  return (
    <TabbableContainer>
      <Header />
      <ContBody>
        <CardWrapper>
          <Card />
          <CandidateList />
        </CardWrapper>
      </ContBody>
    </TabbableContainer>
  );
}

export default JobDetails;

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top: 5px;
  gap: 0.5rem;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  direction: ltr;
  margin: 0 auto;
  display: block;
  &:hover {
  }
`;
