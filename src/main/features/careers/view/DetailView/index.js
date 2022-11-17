import React, { useEffect, useContext } from "react";
import {
  ContBody,
  TabbableContainer,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { useSelector, useDispatch } from "react-redux";
// import Header from "../../view/Header/header";
import Header from "../../../../layout/header/index";
import { Drawer, Button } from "antd";
import Card from "./ShortDetailCard";
import styled from "styled-components";
import Composer from "../Composers/index";
import { getAllCareerApplicant, getCareerByIdAction } from "../../store/action";
import { handleOpenComposer } from "../../store/slice";
import "../styles/style.css";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { CareerDictionary } from "../../localization";
import CandidateList from "./CandidateListView";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { CareerDictionaryList } = CareerDictionary[userLanguage];
  const { id } = useParams();
  const dispatch = useDispatch();
  const { careerDetail } = useSelector((state) => {
    return state.careerSlice;
  });
  const { drawerOpen } = useSelector((state) => state.careerSlice);

  const { labels } = CareerDictionaryList;
  console.log(labels);

  useEffect(() => {
    const payload = {
      careerIds: [id],
    };
    dispatch(getAllCareerApplicant(payload));
    dispatch(getCareerByIdAction(id));
  }, []);

  return (
    <TabbableContainer>
      <Header
        buttons={[
          {
            buttonText: CareerDictionaryList.createTextBtn,
            render: (
              <Button
                className="ThemeBtn"
                onClick={() => dispatch(handleOpenComposer(true))}
              >
                {CareerDictionaryList.createTextBtn}
              </Button>
            ),
          },
        ]}
      />
      <ContBody>
        <CardWrapper>
          <Card />
          <CandidateList />
        </CardWrapper>
      </ContBody>
      <Drawer
        title={
          <h1
            style={{
              fontSize: "20px",
              margin: 0,
            }}
          >
            {CareerDictionaryList.createTextBtn}
          </h1>
        }
        width="768"
        onClose={() => {
          dispatch(handleOpenComposer(false));
        }}
        visible={drawerOpen}
        destroyOnClose={true}
        className="detailedViewComposer drawerSecondary"
      >
        <Composer />
      </Drawer>
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
