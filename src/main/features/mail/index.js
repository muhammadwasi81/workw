import React from "react";
import "./style/index.css";
import MainLeftBody from "./MainLeftBody";
import MainRightBody from "./MainRightBody";
import { MailContainer, MailMainContainer } from "./style/mail.style";
import { useSelector } from "react-redux";
import MailComposer from "./Composer/";

const Index = () => {
  const { isMobileScreen } = useSelector((state) => state.responsiveSlice);
  const { responsiveSlice, mailSlice } = useSelector((state) => state);
  const { mailFolderItem, responseCode, errorMessage } = mailSlice;

  return (
    <MailContainer isMobileScreen={isMobileScreen}>
      {responseCode === null || responseCode === 1002 ? (
        <MailMainContainer isMobileScreen={isMobileScreen}>
          <MainLeftBody />
          <MainRightBody />
        </MailMainContainer>
      ) : (
        <h1 className="text-3xl mt-20">Your account is not configured.</h1>
      )}

      <MailComposer />
    </MailContainer>
  );
};

export default Index;
