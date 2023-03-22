import { useSelector } from "react-redux";
import React, { useContext } from "react";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { profileDictionaryList } from "../localization/index";

const MartialStatus = () => {
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const { employees } = useSelector((state) => state.employeeProfileSlice);
  if (employees.maritalStatusId === 1) {
    return <div>{profileDictionary.single}</div>;
  }
  if (employees.maritalStatusId === 2) {
    return <div>{profileDictionary.engaged}</div>;
  }
  if (employees.maritalStatusId === 3) {
    return <div>{profileDictionary.married} </div>;
  }
  if (employees.maritalStatusId === 4) {
    return <div>{profileDictionary.divorced} </div>;
  }
  if (employees.maritalStatusId === 5) {
    return <div>{profileDictionary.widow}</div>;
  }
  if (employees.maritalStatusId === 6) {
    return <div>{profileDictionary.widower}</div>;
  }
  if (employees.maritalStatusId === 7) {
    return <div>{profileDictionary.preferNotTosay} </div>;
  }
};

export default MartialStatus;
