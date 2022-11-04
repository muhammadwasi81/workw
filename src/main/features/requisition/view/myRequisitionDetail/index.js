import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShortCard from "./shortCard.js";
import styled from "styled-components";
import "./style.css";
import { useParams } from "react-router-dom";
import { ContBody } from "../../../../layout/GridStyle";
import { GetAllRequisitionOffer, GetRequisitionById } from "../../store/actions";
import { TabbableContainer } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import Header from "../../../../layout/header/index.js";
import { handleOpenOfferComposer } from "../../store/slice";
import { Button, Drawer } from "antd";
import OfferList from "./offerList.js";
import CreateOffer from "./createOffer.js";
import { requisitionDictionaryList } from "../../localization/index";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

function RequisitionDetails() {
    const { userLanguage } = useContext(LanguageChangeContext);
	const { requisitionDictionary } = requisitionDictionaryList[userLanguage];
    const { id } = useParams();
    const dispatch = useDispatch();
    const { drawerOpenOffer } = useSelector(
		state => state.requisitionSlice
	);

    useEffect(() => {
        const payload = {
            Detail: [id],
        };
        dispatch(GetAllRequisitionOffer({requisitionIds: [id], pageNo: 0}));
        dispatch(GetRequisitionById(id));
    }, []);

    // console.log(careerDetail);
    //call get career by id
    //call get all career applicant

    return (
        <>
            <TabbableContainer>
                <Header
                    buttons={[
                        {
                            buttonText: "Create Offer",
                            render: (
                                <Button
                                    className="ThemeBtn"
                                    onClick={() =>
                                        dispatch(handleOpenOfferComposer(true))
                                    }
                                >
                                    {requisitionDictionary.CreateOffer}
                                </Button>
                            ),
                        },
                    ]}
                />
                <ContBody>
                    <CardWrapper>
                        <ShortCard />
                        <OfferList />
                    </CardWrapper>
                </ContBody>
            </TabbableContainer>
            <Drawer
                title={
                    <h1
                        style={{
                            fontSize: "20px",
                            margin: 0,
                        }}
                    >
                        {requisitionDictionary.CreateOffer}
                    </h1>
                }
                width="768"
                onClose={() => {
                    dispatch(handleOpenOfferComposer(false));
                }}
                visible={drawerOpenOffer}
                destroyOnClose={true}
                className="detailedViewComposer drawerSecondary"
            >
                <CreateOffer /> 
            </Drawer>
        </>
    );
}

export default RequisitionDetails;

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
