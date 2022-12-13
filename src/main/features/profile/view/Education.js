import React, { useContext } from "react";
import { useState } from "react";
import EducationForm from "../forms/EducationForm";
import AddButton from "../UI/AddButton";
import EducationList from "../UI/EducationList";
import { LanguageChangeContext } from "../../../../utils/localization/localContext/LocalContext";
import { profileDictionaryList } from "../localization/index";

function Education() {
  const [showEducation, setShowEducation] = useState(false);
  const { userLanguage } = useContext(LanguageChangeContext);
  const { profileDictionary } = profileDictionaryList[userLanguage];
  const handleEducation = () => {
    setShowEducation(!showEducation);
  };
  return (
    <div className="">
      <div className="p-3 ">
        <p className="text-lg text-black font-semibold">
          {profileDictionary.education}
        </p>
        {showEducation ? (
          <EducationForm handleEducation={handleEducation} />
        ) : (
          <AddButton
            text={profileDictionary.addAEducation}
            onClick={handleEducation}
          />
        )}
        <EducationList />
      </div>
    </div>
  );
}

export default Education;
