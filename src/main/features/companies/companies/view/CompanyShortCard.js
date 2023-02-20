import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { companyDictionaryList } from "../../companies/localization/index";

const CompanyShortCard = ({ company }) => {
  const navigate = useNavigate();
  const { userLanguage } = useContext(LanguageChangeContext);
  const { companyDictionary } = companyDictionaryList[userLanguage];
  const labels = companyDictionary.CompanyList;

  return (
    <Parent>
      <ImageBox
        BackgroundImage={
          company.logo
            ? company.logo
            : "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
      />
      <ContentBox>
        <Heading>{company.name}</Heading>
        <Text>
          <b>{labels.email}: </b>&nbsp; {company.email}{" "}
        </Text>
        <Text>
          <b> {labels.website}: </b>&nbsp; {company.website}{" "}
        </Text>
        <ButtonsBox>
          <ActionButton BackgroundColor="#db5252">
            {labels.disable}
          </ActionButton>
          <ActionButton
            onClick={() => {
              navigate(`info/basicInfo/${company.id}`);
            }}
            BackgroundColor="var(--currentThemeColor) !important"
          >
            {labels.update}
          </ActionButton>
        </ButtonsBox>
      </ContentBox>
    </Parent>
  );
};

export default CompanyShortCard;

const Parent = styled.div`
  display: flex;
  flex-direction: row;
  height: 150px;
  border-radius: 6px;
  box-shadow: 0 3px 0 0 rgb(211 216 224 / 40%);
  border: 1px solid #ebebeb;
  background-color: #fff;
  cursor: pointer;
  text-decoration: none;
  -webkit-animation: bottomToTop 0.7s ease;
  animation: bottomToTop 0.7s ease;
`;

const ImageBox = styled.div`
  background-image: url(${(props) =>
    props.BackgroundImage || "palevioletred"};);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  background-color: rgb(248, 248, 248);
  width: 150px;
  min-width: 150px;
  height: 100%;
  border-radius: 6px 0 0 6px;
`;

const ContentBox = styled.div`
  flex: 1 1;
  border-radius: 0 6px 6px 0;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
  width: 100%;
`;

const Heading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #454545;
  margin-bottom: 6px;
`;

const Text = styled.p`
  color: #222222;
  display: -webkit-box;
  max-width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: baseline;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
  height: 41px;
  font-size: 12px;
  line-height: 1;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0px;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 450px) {
    justify-content: flex-start;
  }
`;

const ActionButton = styled.button`
  background-color: ${(props) => props.BackgroundColor || "palevioletred"};
  color: #fff;
  font-size: 14px;
  padding: 17px;
  border-radius: 6px;
  height: 34px;
  line-height: 0;
  margin-left: 3px;
  @media (max-width: 768px) {
    border-radius: 6px;
    height: 30px;
    font-size: 12px;
    padding: 12px;
  }
`;

export const CardGrid = styled.div`
  width: 100%;
  height: -webkit-min-content;
  height: min-content;
  display: grid;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-top: 8px;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 0.5rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
`;
